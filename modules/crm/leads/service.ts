import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { leadsRepository } from "./repository";
import {
  leadAssignmentSchema,
  leadCreateSchema,
  leadConversionSchema,
  leadListSchema,
  leadStatusChangeSchema,
  leadUpdateSchema,
} from "./schemas";
import type {
  LeadActionContext,
  LeadAssignmentInput,
  LeadConversionInput,
  LeadCreateInput,
  LeadListRequest,
  LeadRecord,
  LeadRepository,
  LeadStatus,
  LeadStatusChangeInput,
  LeadUpdateInput,
} from "./types";

const allowedTransitions: Record<LeadStatus, LeadStatus[]> = {
  NEW: ["CONTACTED"],
  CONTACTED: ["QUALIFIED", "DISQUALIFIED"],
  QUALIFIED: ["CONVERTED", "DISQUALIFIED"],
  DISQUALIFIED: [],
  CONVERTED: [],
};

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

const assertPermission = (context: LeadActionContext, permission: string, record?: LeadRecord) => {
  assertAllowed(evaluatePolicy({ actor: context, permission, record }));
};

const assertFound = (record: LeadRecord | undefined) => {
  if (!record) throw new Error("Lead was not found");
  return record;
};

const assertTransition = (from: LeadStatus, to: LeadStatus) => {
  if (!allowedTransitions[from].includes(to)) {
    throw new Error(`Lead status transition ${from} -> ${to} is not allowed`);
  }
};

const fullName = (lead: LeadRecord) => `${lead.firstName} ${lead.lastName}`.trim();

const conversionDefaults = (lead: LeadRecord, input: Record<string, unknown>) => ({
  partyType: lead.companyName ? "COMPANY" : "INDIVIDUAL",
  displayName: lead.companyName ?? fullName(lead),
  legalName: lead.companyName,
  email: lead.email,
  phone: lead.phone,
  currency: lead.currency,
  expectedValue: lead.expectedValue,
  ...input,
});

const assertConvertible = (lead: LeadRecord) => {
  if (lead.deletedAt) throw new Error("Deleted leads cannot be converted");
  if (lead.status === "CONVERTED" || lead.convertedCustomerId || lead.convertedPartyId) {
    throw new Error("Lead has already been converted");
  }
  if (lead.status !== "QUALIFIED") {
    throw new Error(`Only QUALIFIED leads can be converted. Current status is ${lead.status}`);
  }
};

export function createLeadsService(repository: LeadRepository = leadsRepository) {
  return {
    async list(input: unknown, context?: LeadActionContext) {
      const parsed = leadListSchema.parse(input) as LeadListRequest;
      if (context) assertPermission(context, permissions.view);
      return repository.listLeads(parsed);
    },

    async stats(input: unknown, context: LeadActionContext) {
      const parsed = leadListSchema.pick({
        tenantId: true,
        companyId: true,
        branchId: true,
        ownerUserId: true,
        source: true,
      }).parse(input);
      assertPermission(context, permissions.view);
      return repository.getLeadStats(parsed.tenantId, parsed);
    },

    async getById(tenantId: string, id: string, context: LeadActionContext) {
      const record = assertFound(await repository.getLeadById(tenantId, id));
      assertPermission(context, permissions.view, record);
      return record;
    },

    async getByNumber(tenantId: string, leadNumber: string, context: LeadActionContext, companyId?: string) {
      const record = assertFound(await repository.getLeadByNumber(tenantId, leadNumber, companyId));
      assertPermission(context, permissions.view, record);
      return record;
    },

    async create(input: unknown, context: LeadActionContext) {
      const parsed = leadCreateSchema.parse(input) as LeadCreateInput;
      assertPermission(context, permissions.create);
      const created = await repository.createLead(parsed, context.actorId);
      createAuditEvent("created", created.tenantId, created.id, context.actorId, { event: events.created });
      return created;
    },

    async update(tenantId: string, id: string, input: unknown, context: LeadActionContext) {
      const current = assertFound(await repository.getLeadById(tenantId, id));
      assertPermission(context, permissions.update, current);
      const parsed = leadUpdateSchema.parse(input) as LeadUpdateInput;
      const updated = assertFound(await repository.updateLead(tenantId, id, parsed, context.actorId));
      createAuditEvent("updated", tenantId, id, context.actorId, { event: events.updated });
      return updated;
    },

    async softDelete(tenantId: string, id: string, context: LeadActionContext) {
      const current = assertFound(await repository.getLeadById(tenantId, id));
      assertPermission(context, permissions.delete, current);
      const deleted = assertFound(await repository.softDeleteLead(tenantId, id, context.actorId));
      createAuditEvent("deleted", tenantId, id, context.actorId, { event: events.deleted });
      return deleted;
    },

    async changeStatus(tenantId: string, id: string, input: unknown, context: LeadActionContext) {
      const current = assertFound(await repository.getLeadById(tenantId, id));
      const parsed = leadStatusChangeSchema.parse(input) as LeadStatusChangeInput;
      assertPermission(context, parsed.status === "CONVERTED" ? permissions.convert : permissions.update, current);
      assertTransition(current.status, parsed.status);
      const updated = assertFound(await repository.changeLeadStatus(tenantId, id, parsed, context.actorId));
      createAuditEvent("statusChanged", tenantId, id, context.actorId, {
        event: events.statusChanged,
        from: current.status,
        to: parsed.status,
      });
      return updated;
    },

    async assign(tenantId: string, id: string, input: unknown, context: LeadActionContext) {
      const current = assertFound(await repository.getLeadById(tenantId, id));
      assertPermission(context, permissions.assign, current);
      const parsed = leadAssignmentSchema.parse(input) as LeadAssignmentInput;
      const updated = assertFound(await repository.assignLead(tenantId, id, parsed, context.actorId));
      createAuditEvent("assigned", tenantId, id, context.actorId, { event: events.assigned });
      return updated;
    },

    async convertLeadToCustomer(tenantId: string, id: string, input: unknown, context: LeadActionContext) {
      const current = assertFound(await repository.getLeadById(tenantId, id));
      assertPermission(context, permissions.convert, current);
      assertPermission(context, "master_data.parties.create");
      assertPermission(context, "master_data.customers.create");
      assertConvertible(current);

      const parsed = leadConversionSchema.parse(conversionDefaults(current, input as Record<string, unknown>)) as LeadConversionInput;
      if (parsed.createOpportunity) assertPermission(context, "crm.opportunities.create");

      createAuditEvent("conversionStarted", tenantId, id, context.actorId, { event: events.conversionStarted });

      return repository.withTransaction(async ({ leads, masterData, opportunities }) => {
        const locked = assertFound(await leads.getLeadForConversion(tenantId, id));
        assertConvertible(locked);

        const party = await masterData.createParty({
          tenantId,
          companyId: locked.companyId,
          branchId: locked.branchId,
          partyType: parsed.partyType,
          displayName: parsed.displayName,
          legalName: parsed.legalName,
          gstin: parsed.gstin,
          pan: parsed.pan,
          email: parsed.email,
          phone: parsed.phone,
          tags: ["created-from-lead"],
          customFields: {
            sourceLeadId: locked.id,
            sourceLeadNumber: locked.leadNumber,
          },
        });

        const addresses = [];
        if (parsed.billingAddress) {
          addresses.push(
            await masterData.createAddress({
              tenantId,
              companyId: locked.companyId,
              branchId: locked.branchId,
              partyId: party.id,
              addressType: "BILLING",
              isDefaultBilling: true,
              ...parsed.billingAddress,
            }),
          );
        }
        if (parsed.shippingAddress) {
          addresses.push(
            await masterData.createAddress({
              tenantId,
              companyId: locked.companyId,
              branchId: locked.branchId,
              partyId: party.id,
              addressType: "SHIPPING",
              isDefaultShipping: true,
              ...parsed.shippingAddress,
            }),
          );
        }

        const customer = await masterData.createCustomer({
          tenantId,
          companyId: locked.companyId,
          branchId: locked.branchId,
          partyId: party.id,
          customerGroup: parsed.customerGroup,
          paymentTerms: parsed.paymentTerms,
          currency: parsed.currency ?? locked.currency,
          gstTreatment: parsed.gstTreatment,
        });

        const opportunity = parsed.createOpportunity
          ? await opportunities.createOpportunity(
              {
                tenantId,
                companyId: locked.companyId,
                branchId: locked.branchId,
                name: parsed.opportunityName ?? `${parsed.displayName} opportunity`,
                customerId: customer.id,
                partyId: party.id,
                leadId: locked.id,
                ownerUserId: locked.ownerUserId,
                assignedTeamId: locked.assignedTeamId,
                stage: "QUALIFICATION",
                probability: 25,
                expectedValue: parsed.expectedValue ?? locked.expectedValue ?? 0,
                currency: parsed.currency ?? locked.currency,
                expectedCloseDate: parsed.expectedCloseDate,
                source: parsed.opportunitySource ?? locked.source,
                notes: parsed.notes,
                tags: ["created-from-lead"],
                customFields: {
                  sourceLeadId: locked.id,
                  sourceLeadNumber: locked.leadNumber,
                },
              },
              context.actorId,
            )
          : null;

        const lead = assertFound(
          await leads.markLeadConverted(
            tenantId,
            id,
            {
              convertedPartyId: party.id,
              convertedCustomerId: customer.id,
              convertedOpportunityId: opportunity?.id ?? null,
              conversionNotes: parsed.notes,
            },
            context.actorId,
          ),
        );

        createAuditEvent("partyCreatedFromLead", tenantId, party.id, context.actorId, { event: events.partyCreatedFromLead, leadId: id });
        createAuditEvent("customerCreatedFromLead", tenantId, customer.id, context.actorId, {
          event: events.customerCreatedFromLead,
          leadId: id,
          partyId: party.id,
        });
        createAuditEvent("converted", tenantId, id, context.actorId, {
          event: events.converted,
          partyId: party.id,
          customerId: customer.id,
          opportunityId: opportunity?.id,
        });

        return {
          lead,
          party,
          customer,
          addresses,
          opportunity,
          summary: {
            leadId: lead.id,
            partyId: party.id,
            customerId: customer.id,
            opportunityId: opportunity?.id,
            convertedAt: lead.convertedAt,
          },
        };
      });
    },

    async search(input: unknown, context: LeadActionContext) {
      const parsed = leadListSchema.parse(input) as LeadListRequest;
      assertPermission(context, permissions.view);
      return repository.searchLeads(parsed);
    },

    async recommendNextAction(tenantId: string, id: string) {
      const record = assertFound(await repository.getLeadById(tenantId, id));
      if (record.status === "NEW") return "Contact this lead and capture qualification notes";
      if (record.status === "CONTACTED") return "Qualify or disqualify based on fit and expected value";
      if (record.status === "QUALIFIED") return "Convert when the customer/opportunity flow is available";
      if (record.status === "DISQUALIFIED") return "Keep for reporting and avoid active follow-up";
      return "Monitor converted lead from the linked customer or opportunity";
    },
  };
}

export const leadsService = createLeadsService();
