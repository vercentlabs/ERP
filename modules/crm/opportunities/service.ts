import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { leadsRepository } from "../leads/repository";
import type { LeadRepository } from "../leads/types";
import { masterDataRepository } from "../../master-data/foundation/repository";
import type { MasterDataRepository } from "../../master-data/foundation/types";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { defaultProbability, opportunitiesRepository } from "./repository";
import {
  opportunityAssignmentSchema,
  opportunityCreateSchema,
  opportunityListSchema,
  opportunityStageChangeSchema,
  opportunityUpdateSchema,
} from "./schemas";
import type {
  OpportunityActionContext,
  OpportunityAssignmentInput,
  OpportunityCreateInput,
  OpportunityListRequest,
  OpportunityRecord,
  OpportunityRepository,
  OpportunityStage,
  OpportunityStageChangeInput,
  OpportunityUpdateInput,
} from "./types";

const allowedTransitions: Record<OpportunityStage, OpportunityStage[]> = {
  PROSPECTING: ["QUALIFICATION"],
  QUALIFICATION: ["PROPOSAL", "LOST"],
  PROPOSAL: ["NEGOTIATION", "LOST"],
  NEGOTIATION: ["WON", "LOST"],
  WON: [],
  LOST: [],
};

const terminalStages: OpportunityStage[] = ["WON", "LOST"];

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

const assertPermission = (context: OpportunityActionContext, permission: string, record?: OpportunityRecord) => {
  assertAllowed(evaluatePolicy({ actor: context, permission, record }));
};

const assertFound = <T>(record: T | undefined, label: string) => {
  if (!record) throw new Error(`${label} was not found`);
  return record;
};

const assertTransition = (from: OpportunityStage, to: OpportunityStage) => {
  if (!allowedTransitions[from].includes(to)) {
    throw new Error(`Opportunity stage transition ${from} -> ${to} is not allowed`);
  }
};

const assertNotTerminal = (opportunity: OpportunityRecord) => {
  if (terminalStages.includes(opportunity.stage)) {
    throw new Error("Terminal opportunities cannot change stage");
  }
};

export function createOpportunitiesService(
  repository: OpportunityRepository = opportunitiesRepository,
  masterData: MasterDataRepository = masterDataRepository,
  leads: LeadRepository = leadsRepository,
) {
  async function normalizeCreate(input: OpportunityCreateInput) {
    const customer = assertFound(await masterData.getCustomerById(input.tenantId, input.customerId), "Customer");
    let leadId = input.leadId;
    if (leadId) {
      const lead = assertFound(await leads.getLeadById(input.tenantId, leadId), "Lead");
      if (!["QUALIFIED", "CONVERTED"].includes(lead.status)) {
        throw new Error("Opportunity lead must be QUALIFIED or CONVERTED");
      }
    }
    return {
      ...input,
      partyId: input.partyId ?? customer.partyId,
      stage: input.stage ?? "PROSPECTING",
      probability: input.probability ?? defaultProbability(input.stage ?? "PROSPECTING"),
      currency: input.currency ?? customer.currency ?? "INR",
      leadId,
    };
  }

  async function normalizeUpdate(tenantId: string, input: OpportunityUpdateInput) {
    if (!input.customerId) return input;
    const customer = assertFound(await masterData.getCustomerById(tenantId, input.customerId), "Customer");
    return { ...input, partyId: input.partyId ?? customer.partyId };
  }

  return {
    async list(input: unknown, context?: OpportunityActionContext) {
      const parsed = opportunityListSchema.parse(input) as OpportunityListRequest;
      if (context) assertPermission(context, permissions.view);
      return repository.listOpportunities(parsed);
    },

    async stats(input: unknown, context: OpportunityActionContext) {
      const parsed = opportunityListSchema.pick({
        tenantId: true,
        companyId: true,
        branchId: true,
        ownerUserId: true,
        source: true,
      }).parse(input);
      assertPermission(context, permissions.view);
      return repository.getOpportunityStats(parsed.tenantId, parsed);
    },

    async pipelineSummary(input: unknown, context: OpportunityActionContext) {
      const parsed = opportunityListSchema.pick({
        tenantId: true,
        companyId: true,
        branchId: true,
        ownerUserId: true,
        source: true,
      }).parse(input);
      assertPermission(context, permissions.view);
      return repository.getPipelineSummary(parsed.tenantId, parsed);
    },

    async forecastSummary(input: unknown, context: OpportunityActionContext) {
      const parsed = opportunityListSchema.pick({
        tenantId: true,
        companyId: true,
        branchId: true,
        ownerUserId: true,
        source: true,
        expectedCloseFrom: true,
        expectedCloseTo: true,
      }).parse(input);
      assertPermission(context, permissions.viewForecast);
      return repository.getForecastSummary(parsed.tenantId, parsed);
    },

    async getById(tenantId: string, id: string, context: OpportunityActionContext) {
      const record = assertFound(await repository.getOpportunityById(tenantId, id), "Opportunity");
      assertPermission(context, permissions.view, record);
      return record;
    },

    async getByNumber(tenantId: string, number: string, context: OpportunityActionContext, companyId?: string) {
      const record = assertFound(await repository.getOpportunityByNumber(tenantId, number, companyId), "Opportunity");
      assertPermission(context, permissions.view, record);
      return record;
    },

    async create(input: unknown, context: OpportunityActionContext) {
      const parsed = opportunityCreateSchema.parse(input) as OpportunityCreateInput;
      assertPermission(context, permissions.create);
      if (parsed.stage === "LOST" && !parsed.lossReason) throw new Error("lossReason is required when stage is LOST");
      const normalized = await normalizeCreate(parsed);
      const created = await repository.createOpportunity(normalized, context.actorId);
      createAuditEvent("created", created.tenantId, created.id, context.actorId, { event: events.created });
      return created;
    },

    async update(tenantId: string, id: string, input: unknown, context: OpportunityActionContext) {
      const current = assertFound(await repository.getOpportunityById(tenantId, id), "Opportunity");
      assertPermission(context, permissions.update, current);
      const parsed = opportunityUpdateSchema.parse(input) as OpportunityUpdateInput;
      if (parsed.stage && parsed.stage !== current.stage) throw new Error("Use the stage endpoint to change opportunity stage");
      const updated = assertFound(await repository.updateOpportunity(tenantId, id, await normalizeUpdate(tenantId, parsed), context.actorId), "Opportunity");
      createAuditEvent("updated", tenantId, id, context.actorId, { event: events.updated });
      return updated;
    },

    async softDelete(tenantId: string, id: string, context: OpportunityActionContext) {
      const current = assertFound(await repository.getOpportunityById(tenantId, id), "Opportunity");
      assertPermission(context, permissions.delete, current);
      const deleted = assertFound(await repository.softDeleteOpportunity(tenantId, id, context.actorId), "Opportunity");
      createAuditEvent("deleted", tenantId, id, context.actorId, { event: events.deleted });
      return deleted;
    },

    async changeStage(tenantId: string, id: string, input: unknown, context: OpportunityActionContext) {
      const current = assertFound(await repository.getOpportunityById(tenantId, id), "Opportunity");
      assertPermission(context, permissions.changeStage, current);
      assertNotTerminal(current);
      const parsed = opportunityStageChangeSchema.parse(input) as OpportunityStageChangeInput;
      assertTransition(current.stage, parsed.stage);
      if (parsed.stage === "LOST" && !parsed.lossReason) throw new Error("lossReason is required when stage is LOST");
      const updated = assertFound(await repository.changeOpportunityStage(tenantId, id, parsed, context.actorId), "Opportunity");
      createAuditEvent("stageChanged", tenantId, id, context.actorId, {
        event: events.stageChanged,
        from: current.stage,
        to: updated.stage,
      });
      if (updated.stage === "WON") createAuditEvent("won", tenantId, id, context.actorId, { event: events.won });
      if (updated.stage === "LOST") createAuditEvent("lost", tenantId, id, context.actorId, { event: events.lost, lossReason: updated.lossReason });
      return updated;
    },

    async assign(tenantId: string, id: string, input: unknown, context: OpportunityActionContext) {
      const current = assertFound(await repository.getOpportunityById(tenantId, id), "Opportunity");
      assertPermission(context, permissions.assign, current);
      const parsed = opportunityAssignmentSchema.parse(input) as OpportunityAssignmentInput;
      const updated = assertFound(await repository.assignOpportunity(tenantId, id, parsed, context.actorId), "Opportunity");
      createAuditEvent("assigned", tenantId, id, context.actorId, { event: events.assigned });
      return updated;
    },

    async search(input: unknown, context: OpportunityActionContext) {
      const parsed = opportunityListSchema.parse(input) as OpportunityListRequest;
      assertPermission(context, permissions.view);
      return repository.searchOpportunities(parsed);
    },
  };
}

export const opportunitiesService = createOpportunitiesService();
