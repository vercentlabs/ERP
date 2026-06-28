import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import { createOpportunitiesService } from "../../../modules/crm/opportunities/service";
import type {
  ForecastSummary,
  OpportunityAssignmentInput,
  OpportunityCreateInput,
  OpportunityListRequest,
  OpportunityRecord,
  OpportunityRepository,
  OpportunityStage,
  OpportunityStageChangeInput,
  OpportunityStats,
  OpportunityUpdateInput,
  PipelineSummary,
} from "../../../modules/crm/opportunities/types";
import type { LeadRecord, LeadRepository } from "../../../modules/crm/leads/types";
import type { Customer, MasterDataRepository } from "../../../modules/master-data/foundation/types";
import { createApiService } from "./index";

const context = {
  tenantId: "tenant-a",
  actorId: "user-a",
  roles: ["admin"],
  permissions: ["*"],
};

const stages: OpportunityStage[] = ["PROSPECTING", "QUALIFICATION", "PROPOSAL", "NEGOTIATION", "WON", "LOST"];
const openStages: OpportunityStage[] = ["PROSPECTING", "QUALIFICATION", "PROPOSAL", "NEGOTIATION"];

function createCustomer(id = "customer-1"): Customer {
  const timestamp = new Date().toISOString();
  return {
    id,
    tenantId: context.tenantId,
    partyId: `party-${id}`,
    customerNumber: `CUST-${id}`,
    creditLimit: 0,
    currency: "INR",
    status: "ACTIVE",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function createFakeMasterData(customers = [createCustomer()]): MasterDataRepository {
  return {
    async getCustomerById(tenantId: string, id: string) {
      return customers.find((customer) => customer.tenantId === tenantId && customer.id === id);
    },
  } as unknown as MasterDataRepository;
}

function createFakeLeads(leads: LeadRecord[] = []): LeadRepository {
  return {
    async getLeadById(tenantId: string, id: string) {
      return leads.find((lead) => lead.tenantId === tenantId && lead.id === id);
    },
  } as unknown as LeadRepository;
}

function defaultProbability(stage: OpportunityStage) {
  return { PROSPECTING: 10, QUALIFICATION: 25, PROPOSAL: 50, NEGOTIATION: 75, WON: 100, LOST: 0 }[stage];
}

function createFakeOpportunityRepository(): OpportunityRepository {
  const records = new Map<string, OpportunityRecord>();
  const now = () => new Date().toISOString();
  const active = (tenantId: string) => [...records.values()].filter((record) => record.tenantId === tenantId && !record.deletedAt);
  const page = (rows: OpportunityRecord[], request: OpportunityListRequest) => ({
    rows: rows.slice(((request.page ?? 1) - 1) * (request.pageSize ?? 25), (request.page ?? 1) * (request.pageSize ?? 25)),
    total: rows.length,
    page: request.page ?? 1,
    pageSize: request.pageSize ?? 25,
  });

  return {
    async createOpportunity(input: OpportunityCreateInput) {
      const timestamp = now();
      const stage = input.stage ?? "PROSPECTING";
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
        stage,
        probability: input.probability ?? defaultProbability(stage),
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
        closedAt: stage === "WON" || stage === "LOST" ? timestamp : undefined,
      };
      records.set(record.id, record);
      return record;
    },
    async listOpportunities(request) {
      let rows = active(request.tenantId);
      if (request.stage) rows = rows.filter((row) => row.stage === request.stage);
      if (request.customerId) rows = rows.filter((row) => row.customerId === request.customerId);
      if (request.ownerUserId) rows = rows.filter((row) => row.ownerUserId === request.ownerUserId);
      if (request.source) rows = rows.filter((row) => row.source === request.source);
      if (request.search) rows = rows.filter((row) => [row.opportunityNumber, row.name, row.source].some((value) => value?.toLowerCase().includes(request.search!.toLowerCase())));
      return page(rows, request);
    },
    async getOpportunityById(tenantId, id) {
      return active(tenantId).find((row) => row.id === id);
    },
    async getOpportunityByNumber(tenantId, opportunityNumber) {
      return active(tenantId).find((row) => row.opportunityNumber === opportunityNumber);
    },
    async updateOpportunity(tenantId, id, input: OpportunityUpdateInput) {
      const current = await this.getOpportunityById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, ...input, updatedAt: now() };
      records.set(id, updated);
      return updated;
    },
    async softDeleteOpportunity(tenantId, id) {
      const current = await this.getOpportunityById(tenantId, id);
      if (!current) return undefined;
      const deleted = { ...current, deletedAt: now(), updatedAt: now() };
      records.set(id, deleted);
      return deleted;
    },
    async changeOpportunityStage(tenantId, id, input: OpportunityStageChangeInput) {
      const current = await this.getOpportunityById(tenantId, id);
      if (!current) return undefined;
      const terminal = input.stage === "WON" || input.stage === "LOST";
      const updated = {
        ...current,
        stage: input.stage,
        probability: input.probability ?? defaultProbability(input.stage),
        lossReason: input.stage === "LOST" ? input.lossReason : undefined,
        closedAt: terminal ? now() : undefined,
        updatedAt: now(),
      };
      records.set(id, updated);
      return updated;
    },
    async assignOpportunity(tenantId, id, input: OpportunityAssignmentInput) {
      return this.updateOpportunity(tenantId, id, input);
    },
    async searchOpportunities(request) {
      return this.listOpportunities(request);
    },
    async getOpportunityStats(tenantId): Promise<OpportunityStats> {
      const rows = active(tenantId);
      const byStage = Object.fromEntries(stages.map((stage) => [stage, rows.filter((row) => row.stage === stage).length])) as OpportunityStats["byStage"];
      return {
        total: rows.length,
        byStage,
        openValue: rows.filter((row) => openStages.includes(row.stage)).reduce((sum, row) => sum + row.expectedValue, 0),
        wonValue: rows.filter((row) => row.stage === "WON").reduce((sum, row) => sum + row.expectedValue, 0),
        lostValue: rows.filter((row) => row.stage === "LOST").reduce((sum, row) => sum + row.expectedValue, 0),
      };
    },
    async getPipelineSummary(tenantId): Promise<PipelineSummary> {
      const rows = active(tenantId);
      const byStage = Object.fromEntries(
        stages.map((stage) => {
          const stageRows = rows.filter((row) => row.stage === stage);
          return [stage, { count: stageRows.length, value: stageRows.reduce((sum, row) => sum + row.expectedValue, 0), weightedValue: stageRows.reduce((sum, row) => sum + row.expectedValue * (row.probability / 100), 0) }];
        }),
      ) as PipelineSummary["byStage"];
      return {
        openCount: rows.filter((row) => openStages.includes(row.stage)).length,
        openValue: openStages.reduce((sum, stage) => sum + byStage[stage].value, 0),
        weightedValue: openStages.reduce((sum, stage) => sum + byStage[stage].weightedValue, 0),
        wonValue: byStage.WON.value,
        lostValue: byStage.LOST.value,
        byStage,
      };
    },
    async getForecastSummary(tenantId): Promise<ForecastSummary> {
      const rows = active(tenantId).filter((row) => openStages.includes(row.stage));
      return {
        currency: "INR",
        opportunityCount: rows.length,
        pipelineValue: rows.reduce((sum, row) => sum + row.expectedValue, 0),
        weightedValue: rows.reduce((sum, row) => sum + row.expectedValue * (row.probability / 100), 0),
      };
    },
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

describe("CRM opportunities service", () => {
  it("creates, lists, filters, summarizes, assigns, and soft deletes opportunities", async () => {
    const service = createOpportunitiesService(createFakeOpportunityRepository(), createFakeMasterData(), createFakeLeads());
    const created = await service.create(
      { tenantId: context.tenantId, name: "Expansion deal", customerId: "customer-1", expectedValue: 100000, source: "lead" },
      context,
    );
    expect(created.partyId).toBe("party-customer-1");
    expect(created.stage).toBe("PROSPECTING");
    expect(created.probability).toBe(10);
    expect((await service.list({ tenantId: context.tenantId, search: "Expansion" }, context)).total).toBe(1);
    expect((await service.pipelineSummary({ tenantId: context.tenantId }, context)).weightedValue).toBe(10000);
    expect((await service.forecastSummary({ tenantId: context.tenantId }, context)).pipelineValue).toBe(100000);
    expect((await service.assign(context.tenantId, created.id, { ownerUserId: "sales-1" }, context)).ownerUserId).toBe("sales-1");
    await service.softDelete(context.tenantId, created.id, context);
    expect((await service.list({ tenantId: context.tenantId }, context)).total).toBe(0);
  });

  it("rejects missing customers and invalid stage transitions", async () => {
    const service = createOpportunitiesService(createFakeOpportunityRepository(), createFakeMasterData([]), createFakeLeads());
    await expect(service.create({ tenantId: context.tenantId, name: "Bad deal", customerId: "missing" }, context)).rejects.toThrow("Customer");
  });

  it("enforces stage rules, loss reason, terminal stages, and close metadata", async () => {
    const service = createOpportunitiesService(createFakeOpportunityRepository(), createFakeMasterData(), createFakeLeads());
    const created = await service.create({ tenantId: context.tenantId, name: "Pipeline deal", customerId: "customer-1", expectedValue: 200000 }, context);
    await expect(service.changeStage(context.tenantId, created.id, { stage: "PROPOSAL" }, context)).rejects.toThrow("PROSPECTING -> PROPOSAL");
    const qualified = await service.changeStage(context.tenantId, created.id, { stage: "QUALIFICATION" }, context);
    expect(qualified.probability).toBe(25);
    await expect(service.changeStage(context.tenantId, created.id, { stage: "LOST" }, context)).rejects.toThrow("lossReason");
    const proposal = await service.changeStage(context.tenantId, created.id, { stage: "PROPOSAL" }, context);
    const negotiation = await service.changeStage(context.tenantId, proposal.id, { stage: "NEGOTIATION" }, context);
    const won = await service.changeStage(context.tenantId, negotiation.id, { stage: "WON" }, context);
    expect(won.probability).toBe(100);
    expect(won.closedAt).toBeDefined();
    await expect(service.changeStage(context.tenantId, won.id, { stage: "LOST", lossReason: "Changed mind" }, context)).rejects.toThrow("Terminal");
  });

  it("sets LOST probability and close metadata", async () => {
    const service = createOpportunitiesService(createFakeOpportunityRepository(), createFakeMasterData(), createFakeLeads());
    const created = await service.create({ tenantId: context.tenantId, name: "Lost deal", customerId: "customer-1", expectedValue: 50000 }, context);
    await service.changeStage(context.tenantId, created.id, { stage: "QUALIFICATION" }, context);
    const lost = await service.changeStage(context.tenantId, created.id, { stage: "LOST", lossReason: "No budget" }, context);
    expect(lost.probability).toBe(0);
    expect(lost.lossReason).toBe("No budget");
    expect(lost.closedAt).toBeDefined();
  });
});

describe("CRM opportunities API routes", () => {
  it("serves all opportunity endpoints and sales deals alias", async () => {
    const service = createOpportunitiesService(createFakeOpportunityRepository(), createFakeMasterData(), createFakeLeads());
    server = createApiService({ opportunities: service });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    const baseUrl = `http://127.0.0.1:${port}`;
    const headers = { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*" };

    const created = await fetch(`${baseUrl}/api/crm/opportunities`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name: "API deal", customerId: "customer-1", expectedValue: 75000 }),
    }).then((response) => response.json() as Promise<OpportunityRecord>);

    expect(created.opportunityNumber).toContain("OPP");
    expect(await fetch(`${baseUrl}/api/crm/opportunities`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/deals`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/crm/opportunities/${created.id}`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/crm/opportunities/stats`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/crm/opportunities/pipeline-summary`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/crm/opportunities/forecast-summary`, { headers }).then((response) => response.status)).toBe(200);
    expect(
      await fetch(`${baseUrl}/api/crm/opportunities/${created.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ notes: "Updated" }),
      }).then((response) => response.status),
    ).toBe(200);
    expect(
      await fetch(`${baseUrl}/api/crm/opportunities/${created.id}/stage`, {
        method: "POST",
        headers,
        body: JSON.stringify({ stage: "QUALIFICATION" }),
      }).then((response) => response.status),
    ).toBe(200);
    expect(
      await fetch(`${baseUrl}/api/crm/opportunities/${created.id}/assign`, {
        method: "POST",
        headers,
        body: JSON.stringify({ ownerUserId: "sales-1" }),
      }).then((response) => response.status),
    ).toBe(200);
    expect(await fetch(`${baseUrl}/api/crm/opportunities/${created.id}`, { method: "DELETE", headers }).then((response) => response.status)).toBe(200);
  });
});
