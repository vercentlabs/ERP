import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import { createLeadsService } from "../../../modules/crm/leads/service";
import type {
  LeadAssignmentInput,
  LeadConvertedInput,
  LeadCreateInput,
  LeadListRequest,
  LeadRecord,
  LeadRepository,
  LeadStats,
  LeadStatusChangeInput,
  LeadUpdateInput,
} from "../../../modules/crm/leads/types";
import type {
  Address,
  AddressCreate,
  AddressUpdate,
  Customer,
  CustomerCreate,
  CustomerUpdate,
  Item,
  ItemCreate,
  ItemStats,
  ItemUpdate,
  ListRequest,
  MasterDataRepository,
  Party,
  PartyCreate,
  PartyUpdate,
  Supplier,
  SupplierCreate,
  SupplierUpdate,
  Uom,
  UomCreate,
  UomUpdate,
} from "../../../modules/master-data/foundation/types";
import type {
  ForecastSummary,
  OpportunityAssignmentInput,
  OpportunityCreateInput,
  OpportunityListRequest,
  OpportunityRecord,
  OpportunityRepository,
  OpportunityStageChangeInput,
  OpportunityStats,
  OpportunityUpdateInput,
  PipelineSummary,
} from "../../../modules/crm/opportunities/types";
import { createApiService } from "./index";

const context = {
  tenantId: "tenant-a",
  actorId: "user-a",
  roles: ["admin"],
  permissions: ["*"],
};

function createFakeMasterDataRepository(options: { failCustomerCreate?: boolean } = {}): MasterDataRepository {
  const parties = new Map<string, Party>();
  const customers = new Map<string, Customer>();
  const addresses = new Map<string, Address>();
  const now = () => new Date().toISOString();
  const stamp = () => ({ createdAt: now(), updatedAt: now() });
  const page = <T>(rows: T[], request: ListRequest) => ({ rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 });
  const unsupported = async () => {
    throw new Error("Unsupported fake master data method");
  };

  return {
    async createParty(input: PartyCreate) {
      const record: Party = {
        ...input,
        id: `party-${parties.size + 1}`,
        partyNumber: input.partyNumber ?? `PARTY-${parties.size + 1}`,
        status: input.status ?? "ACTIVE",
        tags: input.tags ?? [],
        customFields: input.customFields ?? {},
        ...stamp(),
      };
      parties.set(record.id, record);
      return record;
    },
    async listParties(request) {
      return page([...parties.values()].filter((row) => row.tenantId === request.tenantId && !row.deletedAt), request);
    },
    async getPartyById(tenantId, id) {
      return [...parties.values()].find((row) => row.tenantId === tenantId && row.id === id && !row.deletedAt);
    },
    async getPartyByNumber(tenantId, partyNumber) {
      return [...parties.values()].find((row) => row.tenantId === tenantId && row.partyNumber === partyNumber && !row.deletedAt);
    },
    async updateParty(tenantId, id, input: PartyUpdate) {
      const current = await this.getPartyById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, ...input, updatedAt: now() };
      parties.set(id, updated);
      return updated;
    },
    async softDeleteParty(tenantId, id) {
      const current = await this.getPartyById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, deletedAt: now(), updatedAt: now() };
      parties.set(id, updated);
      return updated;
    },
    async searchParties(request) {
      return this.listParties(request);
    },
    async createAddress(input: AddressCreate) {
      const record: Address = {
        ...input,
        id: `address-${addresses.size + 1}`,
        country: input.country ?? "IN",
        isDefaultBilling: input.isDefaultBilling ?? false,
        isDefaultShipping: input.isDefaultShipping ?? false,
        ...stamp(),
      };
      addresses.set(record.id, record);
      return record;
    },
    async listAddressesByParty(tenantId, partyId) {
      return [...addresses.values()].filter((row) => row.tenantId === tenantId && row.partyId === partyId && !row.deletedAt);
    },
    async updateAddress(tenantId, id, input: AddressUpdate) {
      const current = [...addresses.values()].find((row) => row.tenantId === tenantId && row.id === id && !row.deletedAt);
      if (!current) return undefined;
      const updated = { ...current, ...input, updatedAt: now() };
      addresses.set(id, updated);
      return updated;
    },
    async softDeleteAddress(tenantId, id) {
      const current = [...addresses.values()].find((row) => row.tenantId === tenantId && row.id === id && !row.deletedAt);
      if (!current) return undefined;
      const updated = { ...current, deletedAt: now(), updatedAt: now() };
      addresses.set(id, updated);
      return updated;
    },
    async setDefaultBillingAddress(tenantId, id) {
      return this.updateAddress(tenantId, id, { isDefaultBilling: true });
    },
    async setDefaultShippingAddress(tenantId, id) {
      return this.updateAddress(tenantId, id, { isDefaultShipping: true });
    },
    async createCustomer(input: CustomerCreate) {
      if (options.failCustomerCreate) throw new Error("Customer creation failed");
      const record: Customer = {
        ...input,
        id: `customer-${customers.size + 1}`,
        customerNumber: input.customerNumber ?? `CUST-${customers.size + 1}`,
        creditLimit: input.creditLimit ?? 0,
        currency: input.currency ?? "INR",
        status: input.status ?? "ACTIVE",
        ...stamp(),
      };
      customers.set(record.id, record);
      return record;
    },
    async listCustomers(request) {
      return page([...customers.values()].filter((row) => row.tenantId === request.tenantId && !row.deletedAt), request);
    },
    async getCustomerById(tenantId, id) {
      return [...customers.values()].find((row) => row.tenantId === tenantId && row.id === id && !row.deletedAt);
    },
    async getCustomerByNumber(tenantId, customerNumber) {
      return [...customers.values()].find((row) => row.tenantId === tenantId && row.customerNumber === customerNumber && !row.deletedAt);
    },
    async updateCustomer(tenantId, id, input: CustomerUpdate) {
      const current = await this.getCustomerById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, ...input, updatedAt: now() };
      customers.set(id, updated);
      return updated;
    },
    async softDeleteCustomer(tenantId, id) {
      const current = await this.getCustomerById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, deletedAt: now(), updatedAt: now() };
      customers.set(id, updated);
      return updated;
    },
    async searchCustomers(request) {
      return this.listCustomers(request);
    },
    createSupplier: unsupported as (input: SupplierCreate) => Promise<Supplier>,
    listSuppliers: unsupported as (input: ListRequest) => Promise<{ rows: Supplier[]; total: number; page: number; pageSize: number }>,
    getSupplierById: unsupported as (tenantId: string, id: string) => Promise<Supplier | undefined>,
    getSupplierByNumber: unsupported as (tenantId: string, supplierNumber: string, companyId?: string) => Promise<Supplier | undefined>,
    updateSupplier: unsupported as (tenantId: string, id: string, input: SupplierUpdate) => Promise<Supplier | undefined>,
    softDeleteSupplier: unsupported as (tenantId: string, id: string) => Promise<Supplier | undefined>,
    searchSuppliers: unsupported as (input: ListRequest) => Promise<{ rows: Supplier[]; total: number; page: number; pageSize: number }>,
    createUom: unsupported as (input: UomCreate) => Promise<Uom>,
    listUoms: unsupported as (input: ListRequest) => Promise<{ rows: Uom[]; total: number; page: number; pageSize: number }>,
    getUomById: unsupported as (tenantId: string, id: string) => Promise<Uom | undefined>,
    getUomByCode: unsupported as (tenantId: string, code: string, companyId?: string) => Promise<Uom | undefined>,
    updateUom: unsupported as (tenantId: string, id: string, input: UomUpdate) => Promise<Uom | undefined>,
    softDeleteUom: unsupported as (tenantId: string, id: string) => Promise<Uom | undefined>,
    createItem: unsupported as (input: ItemCreate) => Promise<Item>,
    listItems: unsupported as (input: ListRequest) => Promise<{ rows: Item[]; total: number; page: number; pageSize: number }>,
    getItemById: unsupported as (tenantId: string, id: string) => Promise<Item | undefined>,
    getItemByNumber: unsupported as (tenantId: string, itemNumber: string, companyId?: string) => Promise<Item | undefined>,
    getItemBySku: unsupported as (tenantId: string, sku: string, companyId?: string) => Promise<Item | undefined>,
    updateItem: unsupported as (tenantId: string, id: string, input: ItemUpdate) => Promise<Item | undefined>,
    softDeleteItem: unsupported as (tenantId: string, id: string) => Promise<Item | undefined>,
    searchItems: unsupported as (input: ListRequest) => Promise<{ rows: Item[]; total: number; page: number; pageSize: number }>,
    getItemStats: unsupported as (tenantId: string) => Promise<ItemStats>,
  };
}

function createFakeRepository(options: { failCustomerCreate?: boolean } = {}): LeadRepository {
  const records = new Map<string, LeadRecord>();
  const masterData = createFakeMasterDataRepository(options);
  const opportunities = createFakeOpportunityRepository();
  const now = () => new Date().toISOString();
  const byTenant = (tenantId: string) => [...records.values()].filter((record) => record.tenantId === tenantId && !record.deletedAt);

  const repository: LeadRepository = {
    async createLead(input: LeadCreateInput, actorId = "system") {
      const timestamp = now();
      const record: LeadRecord = {
        id: `lead-${records.size + 1}`,
        tenantId: input.tenantId,
        companyId: input.companyId,
        branchId: input.branchId,
        leadNumber: input.leadNumber ?? `LEAD-${records.size + 1}`,
        firstName: input.firstName,
        lastName: input.lastName,
        companyName: input.companyName,
        email: input.email,
        phone: input.phone,
        source: input.source,
        status: "NEW",
        score: input.score ?? 0,
        ownerUserId: input.ownerUserId,
        assignedTeamId: input.assignedTeamId,
        expectedValue: input.expectedValue,
        currency: input.currency ?? "INR",
        notes: input.notes,
        tags: input.tags ?? [],
        customFields: input.customFields ?? {},
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      records.set(record.id, { ...record, customFields: { ...record.customFields, createdBy: actorId } });
      return records.get(record.id)!;
    },
    async listLeads(request: LeadListRequest) {
      const rows = byTenant(request.tenantId).filter((record) => {
        if (request.status && record.status !== request.status) return false;
        if (request.ownerUserId && record.ownerUserId !== request.ownerUserId) return false;
        if (request.source && record.source !== request.source) return false;
        if (!request.search) return true;
        return [record.leadNumber, record.firstName, record.lastName, record.companyName, record.email, record.phone]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(request.search!.toLowerCase()));
      });
      return { rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 };
    },
    async getLeadById(tenantId: string, id: string) {
      return byTenant(tenantId).find((record) => record.id === id);
    },
    async getLeadByNumber(tenantId: string, leadNumber: string) {
      return byTenant(tenantId).find((record) => record.leadNumber === leadNumber);
    },
    async updateLead(tenantId: string, id: string, input: LeadUpdateInput, actorId = "system") {
      const current = await this.getLeadById(tenantId, id);
      if (!current) return undefined;
      const { convertedPartyId, convertedCustomerId, convertedOpportunityId, convertedAt, convertedByUserId, conversionNotes, ...rest } = input;
      const updated: LeadRecord = {
        ...current,
        ...rest,
        convertedPartyId: convertedPartyId === null ? undefined : (convertedPartyId ?? current.convertedPartyId),
        convertedCustomerId: convertedCustomerId === null ? undefined : (convertedCustomerId ?? current.convertedCustomerId),
        convertedOpportunityId: convertedOpportunityId === null ? undefined : (convertedOpportunityId ?? current.convertedOpportunityId),
        convertedAt: convertedAt === null ? undefined : (convertedAt ?? current.convertedAt),
        convertedByUserId: convertedByUserId === null ? undefined : (convertedByUserId ?? current.convertedByUserId),
        conversionNotes: conversionNotes === null ? undefined : (conversionNotes ?? current.conversionNotes),
        updatedAt: now(),
        customFields: { ...current.customFields, updatedBy: actorId },
      };
      records.set(id, updated);
      return updated;
    },
    async softDeleteLead(tenantId: string, id: string) {
      const current = await this.getLeadById(tenantId, id);
      if (!current) return undefined;
      const deleted = { ...current, deletedAt: now(), updatedAt: now() };
      records.set(id, deleted);
      return deleted;
    },
    async changeLeadStatus(tenantId: string, id: string, input: LeadStatusChangeInput) {
      return this.updateLead(tenantId, id, {
        status: input.status,
        convertedCustomerId: input.convertedCustomerId,
        convertedOpportunityId: input.convertedOpportunityId,
      } as LeadUpdateInput);
    },
    async assignLead(tenantId: string, id: string, input: LeadAssignmentInput) {
      return this.updateLead(tenantId, id, input);
    },
    async getLeadForConversion(tenantId: string, id: string) {
      return this.getLeadById(tenantId, id);
    },
    async markLeadConverted(tenantId: string, id: string, input: LeadConvertedInput, actorId = "system") {
      return this.updateLead(tenantId, id, {
        status: "CONVERTED",
        convertedPartyId: input.convertedPartyId,
        convertedCustomerId: input.convertedCustomerId,
        convertedOpportunityId: input.convertedOpportunityId,
        convertedAt: now(),
        convertedByUserId: actorId,
        conversionNotes: input.conversionNotes,
      } as LeadUpdateInput);
    },
    async withTransaction(handler) {
      return handler({ leads: repository, masterData, opportunities });
    },
    async searchLeads(request: LeadListRequest) {
      return this.listLeads(request);
    },
    async getLeadStats(tenantId: string): Promise<LeadStats> {
      const rows = byTenant(tenantId);
      return {
        total: rows.length,
        byStatus: {
          NEW: rows.filter((row) => row.status === "NEW").length,
          CONTACTED: rows.filter((row) => row.status === "CONTACTED").length,
          QUALIFIED: rows.filter((row) => row.status === "QUALIFIED").length,
          DISQUALIFIED: rows.filter((row) => row.status === "DISQUALIFIED").length,
          CONVERTED: rows.filter((row) => row.status === "CONVERTED").length,
        },
        totalExpectedValue: rows.reduce((sum, row) => sum + (row.expectedValue ?? 0), 0),
        averageScore: rows.length ? rows.reduce((sum, row) => sum + row.score, 0) / rows.length : 0,
      };
    },
  };
  return repository;
}

function createFakeOpportunityRepository(): OpportunityRepository {
  const records = new Map<string, OpportunityRecord>();
  const now = () => new Date().toISOString();
  const unsupported = async () => {
    throw new Error("Unsupported fake opportunity method");
  };

  return {
    async createOpportunity(input: OpportunityCreateInput) {
      const timestamp = now();
      const record: OpportunityRecord = {
        id: `opportunity-${records.size + 1}`,
        tenantId: input.tenantId,
        companyId: input.companyId,
        branchId: input.branchId,
        opportunityNumber: input.opportunityNumber ?? `OPP-${records.size + 1}`,
        name: input.name,
        customerId: input.customerId,
        partyId: input.partyId,
        leadId: input.leadId,
        ownerUserId: input.ownerUserId,
        assignedTeamId: input.assignedTeamId,
        stage: input.stage ?? "PROSPECTING",
        probability: input.probability ?? 10,
        expectedValue: input.expectedValue ?? 0,
        currency: input.currency ?? "INR",
        expectedCloseDate: input.expectedCloseDate,
        source: input.source,
        lossReason: input.lossReason,
        notes: input.notes,
        tags: input.tags ?? [],
        customFields: input.customFields ?? {},
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      records.set(record.id, record);
      return record;
    },
    listOpportunities: unsupported as (request: OpportunityListRequest) => Promise<{ rows: OpportunityRecord[]; total: number; page: number; pageSize: number }>,
    getOpportunityById: unsupported as (tenantId: string, id: string) => Promise<OpportunityRecord | undefined>,
    getOpportunityByNumber: unsupported as (tenantId: string, number: string, companyId?: string) => Promise<OpportunityRecord | undefined>,
    updateOpportunity: unsupported as (tenantId: string, id: string, input: OpportunityUpdateInput, actorId?: string) => Promise<OpportunityRecord | undefined>,
    softDeleteOpportunity: unsupported as (tenantId: string, id: string, actorId?: string) => Promise<OpportunityRecord | undefined>,
    changeOpportunityStage: unsupported as (tenantId: string, id: string, input: OpportunityStageChangeInput, actorId?: string) => Promise<OpportunityRecord | undefined>,
    assignOpportunity: unsupported as (tenantId: string, id: string, input: OpportunityAssignmentInput, actorId?: string) => Promise<OpportunityRecord | undefined>,
    searchOpportunities: unsupported as (request: OpportunityListRequest) => Promise<{ rows: OpportunityRecord[]; total: number; page: number; pageSize: number }>,
    getOpportunityStats: unsupported as (tenantId: string) => Promise<OpportunityStats>,
    getPipelineSummary: unsupported as (tenantId: string) => Promise<PipelineSummary>,
    getForecastSummary: unsupported as (tenantId: string) => Promise<ForecastSummary>,
  };
}

let server: Server | undefined;

afterEach(async () => {
  await new Promise<void>((resolve, reject) => {
    if (!server) {
      resolve();
      return;
    }
    server.close((error) => (error ? reject(error) : resolve()));
    server = undefined;
  });
});

describe("CRM leads service", () => {
  it("creates, lists, updates, assigns, soft deletes, and protects status transitions", async () => {
    const service = createLeadsService(createFakeRepository());
    const lead = await service.create(
      { tenantId: context.tenantId, firstName: "Asha", lastName: "Patel", email: "asha@example.com", expectedValue: 250000 },
      context,
    );

    expect(lead.status).toBe("NEW");
    expect((await service.list({ tenantId: context.tenantId }, context)).total).toBe(1);
    expect((await service.update(context.tenantId, lead.id, { phone: "+919999999999" }, context)).phone).toBe("+919999999999");
    expect((await service.assign(context.tenantId, lead.id, { ownerUserId: "sales-1" }, context)).ownerUserId).toBe("sales-1");
    await expect(service.changeStatus(context.tenantId, lead.id, { status: "QUALIFIED" }, context)).rejects.toThrow(
      "NEW -> QUALIFIED",
    );
    expect((await service.changeStatus(context.tenantId, lead.id, { status: "CONTACTED" }, context)).status).toBe("CONTACTED");
    expect((await service.softDelete(context.tenantId, lead.id, context)).deletedAt).toBeDefined();
  });

  it("converts a qualified lead into a party and customer", async () => {
    const service = createLeadsService(createFakeRepository());
    const lead = await service.create(
      {
        tenantId: context.tenantId,
        firstName: "Asha",
        lastName: "Patel",
        companyName: "Asha Foods",
        email: "asha@example.com",
        expectedValue: 250000,
      },
      context,
    );
    await service.changeStatus(context.tenantId, lead.id, { status: "CONTACTED" }, context);
    await service.changeStatus(context.tenantId, lead.id, { status: "QUALIFIED" }, context);

    const result = await service.convertLeadToCustomer(
      context.tenantId,
      lead.id,
      {
        displayName: "Asha Foods",
        partyType: "COMPANY",
        customerGroup: "Enterprise",
        billingAddress: { line1: "MG Road", city: "Bengaluru", state: "KA", postalCode: "560001" },
        notes: "Converted from qualified lead",
      },
      context,
    );

    expect(result.lead.status).toBe("CONVERTED");
    expect(result.party.displayName).toBe("Asha Foods");
    expect(result.customer.partyId).toBe(result.party.id);
    expect(result.lead.convertedPartyId).toBe(result.party.id);
    expect(result.lead.convertedCustomerId).toBe(result.customer.id);
    expect(result.lead.convertedAt).toBeDefined();
    expect(result.lead.conversionNotes).toBe("Converted from qualified lead");
    expect(result.addresses).toHaveLength(1);
    expect(result.opportunity).toBeNull();
  });

  it("converts a qualified lead into a customer and opportunity when requested", async () => {
    const service = createLeadsService(createFakeRepository());
    const lead = await service.create(
      {
        tenantId: context.tenantId,
        firstName: "Dev",
        lastName: "Kapoor",
        companyName: "Kapoor Textiles",
        expectedValue: 125000,
        currency: "INR",
      },
      context,
    );
    await service.changeStatus(context.tenantId, lead.id, { status: "CONTACTED" }, context);
    await service.changeStatus(context.tenantId, lead.id, { status: "QUALIFIED" }, context);

    const result = await service.convertLeadToCustomer(
      context.tenantId,
      lead.id,
      {
        displayName: "Kapoor Textiles",
        partyType: "COMPANY",
        createOpportunity: true,
        opportunityName: "Kapoor expansion deal",
        expectedValue: 125000,
      },
      context,
    );

    expect(result.opportunity?.name).toBe("Kapoor expansion deal");
    expect(result.opportunity?.customerId).toBe(result.customer.id);
    expect(result.opportunity?.partyId).toBe(result.party.id);
    expect(result.opportunity?.leadId).toBe(lead.id);
    expect(result.lead.convertedOpportunityId).toBe(result.opportunity?.id);
  });

  it.each(["NEW", "CONTACTED", "DISQUALIFIED"] as const)("rejects %s lead conversion", async (status) => {
    const service = createLeadsService(createFakeRepository());
    const lead = await service.create({ tenantId: context.tenantId, firstName: "Nikhil", lastName: "Rao" }, context);
    if (status === "CONTACTED") {
      await service.changeStatus(context.tenantId, lead.id, { status: "CONTACTED" }, context);
    }
    if (status === "DISQUALIFIED") {
      await service.changeStatus(context.tenantId, lead.id, { status: "CONTACTED" }, context);
      await service.changeStatus(context.tenantId, lead.id, { status: "DISQUALIFIED" }, context);
    }

    await expect(
      service.convertLeadToCustomer(context.tenantId, lead.id, { displayName: "Blocked Lead", partyType: "INDIVIDUAL" }, context),
    ).rejects.toThrow("Only QUALIFIED leads can be converted");
  });

  it("rejects converting an already converted lead", async () => {
    const service = createLeadsService(createFakeRepository());
    const lead = await service.create({ tenantId: context.tenantId, firstName: "Mira", lastName: "Shah" }, context);
    await service.changeStatus(context.tenantId, lead.id, { status: "CONTACTED" }, context);
    await service.changeStatus(context.tenantId, lead.id, { status: "QUALIFIED" }, context);
    await service.convertLeadToCustomer(context.tenantId, lead.id, { displayName: "Mira Shah", partyType: "INDIVIDUAL" }, context);

    await expect(
      service.convertLeadToCustomer(context.tenantId, lead.id, { displayName: "Mira Shah", partyType: "INDIVIDUAL" }, context),
    ).rejects.toThrow("already been converted");
  });

  it("does not mark the lead converted when customer creation fails", async () => {
    const service = createLeadsService(createFakeRepository({ failCustomerCreate: true }));
    const lead = await service.create({ tenantId: context.tenantId, firstName: "Kiran", lastName: "Iyer" }, context);
    await service.changeStatus(context.tenantId, lead.id, { status: "CONTACTED" }, context);
    await service.changeStatus(context.tenantId, lead.id, { status: "QUALIFIED" }, context);

    await expect(
      service.convertLeadToCustomer(context.tenantId, lead.id, { displayName: "Kiran Iyer", partyType: "INDIVIDUAL" }, context),
    ).rejects.toThrow("Customer creation failed");

    const current = await service.getById(context.tenantId, lead.id, context);
    expect(current.status).toBe("QUALIFIED");
    expect(current.convertedCustomerId).toBeUndefined();
  });
});

describe("CRM leads API routes", () => {
  it("serves create, list, get, status, assign, update, stats, and delete endpoints", async () => {
    const service = createLeadsService(createFakeRepository());
    server = createApiService({ leads: service });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    const baseUrl = `http://127.0.0.1:${port}`;
    const headers = { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*" };

    const created = await fetch(`${baseUrl}/api/crm/leads`, {
      method: "POST",
      headers,
      body: JSON.stringify({ firstName: "Rohan", lastName: "Mehta", source: "website" }),
    }).then((response) => response.json() as Promise<LeadRecord>);

    expect(created.status).toBe("NEW");
    expect(await fetch(`${baseUrl}/api/crm/leads`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/crm/leads/${created.id}`, { headers }).then((response) => response.status)).toBe(200);
    expect(
      await fetch(`${baseUrl}/api/crm/leads/${created.id}/status`, {
        method: "POST",
        headers,
        body: JSON.stringify({ status: "CONTACTED" }),
      }).then((response) => response.status),
    ).toBe(200);
    expect(
      await fetch(`${baseUrl}/api/crm/leads/${created.id}/assign`, {
        method: "POST",
        headers,
        body: JSON.stringify({ ownerUserId: "sales-2" }),
      }).then((response) => response.status),
    ).toBe(200);
    expect(
      await fetch(`${baseUrl}/api/crm/leads/${created.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ companyName: "Mehta Traders" }),
      }).then((response) => response.status),
    ).toBe(200);
    expect(await fetch(`${baseUrl}/api/crm/leads/stats`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/crm/leads/${created.id}`, { method: "DELETE", headers }).then((response) => response.status)).toBe(200);
  });

  it("serves the lead conversion endpoint", async () => {
    const service = createLeadsService(createFakeRepository());
    server = createApiService({ leads: service });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    const baseUrl = `http://127.0.0.1:${port}`;
    const headers = { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*" };

    const created = await fetch(`${baseUrl}/api/crm/leads`, {
      method: "POST",
      headers,
      body: JSON.stringify({ firstName: "Rohan", lastName: "Mehta", companyName: "Mehta Traders" }),
    }).then((response) => response.json() as Promise<LeadRecord>);

    await fetch(`${baseUrl}/api/crm/leads/${created.id}/status`, {
      method: "POST",
      headers,
      body: JSON.stringify({ status: "CONTACTED" }),
    });
    await fetch(`${baseUrl}/api/crm/leads/${created.id}/status`, {
      method: "POST",
      headers,
      body: JSON.stringify({ status: "QUALIFIED" }),
    });

    const response = await fetch(`${baseUrl}/api/crm/leads/${created.id}/convert`, {
      method: "POST",
      headers,
      body: JSON.stringify({ displayName: "Mehta Traders", partyType: "COMPANY" }),
    });
    expect(response.status).toBe(200);
    const converted = (await response.json()) as { lead: LeadRecord; party: Party; customer: Customer };
    expect(converted.lead.status).toBe("CONVERTED");
    expect(converted.customer.partyId).toBe(converted.party.id);
  });
});
