import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
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
} from "./types";

const tableName = "crm_opportunities";

type OpportunityRow = {
  id: string;
  tenant_id: string;
  company_id: string | null;
  branch_id: string | null;
  opportunity_number: string;
  name: string;
  customer_id: string;
  party_id: string | null;
  lead_id: string | null;
  owner_user_id: string | null;
  assigned_team_id: string | null;
  stage: OpportunityStage;
  probability: number;
  expected_value: string | number;
  currency: string;
  expected_close_date: Date | string | null;
  source: string | null;
  loss_reason: string | null;
  notes: string | null;
  tags: string[] | null;
  custom_fields: Record<string, unknown> | null;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string | null;
  closed_at: Date | string | null;
};

const stages: OpportunityStage[] = ["PROSPECTING", "QUALIFICATION", "PROPOSAL", "NEGOTIATION", "WON", "LOST"];
const openStages: OpportunityStage[] = ["PROSPECTING", "QUALIFICATION", "PROPOSAL", "NEGOTIATION"];

const toIso = (value: Date | string | null | undefined) => {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : value;
};

const toDateOnly = (value: Date | string | null | undefined) => {
  const iso = toIso(value);
  return iso?.slice(0, 10);
};

const toNullable = <T>(value: T | undefined | null) => value ?? null;

const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));

function opportunityNumber(input: OpportunityCreateInput) {
  return input.opportunityNumber ?? `OPP-${randomUUID().slice(0, 8).toUpperCase()}`;
}

export function defaultProbability(stage: OpportunityStage) {
  return {
    PROSPECTING: 10,
    QUALIFICATION: 25,
    PROPOSAL: 50,
    NEGOTIATION: 75,
    WON: 100,
    LOST: 0,
  }[stage];
}

export function mapOpportunityRow(row: OpportunityRow): OpportunityRecord {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    companyId: row.company_id ?? undefined,
    branchId: row.branch_id ?? undefined,
    opportunityNumber: row.opportunity_number,
    name: row.name,
    customerId: row.customer_id,
    partyId: row.party_id ?? undefined,
    leadId: row.lead_id ?? undefined,
    ownerUserId: row.owner_user_id ?? undefined,
    assignedTeamId: row.assigned_team_id ?? undefined,
    stage: row.stage,
    probability: Number(row.probability),
    expectedValue: Number(row.expected_value ?? 0),
    currency: row.currency,
    expectedCloseDate: toDateOnly(row.expected_close_date),
    source: row.source ?? undefined,
    lossReason: row.loss_reason ?? undefined,
    notes: row.notes ?? undefined,
    tags: row.tags ?? [],
    customFields: row.custom_fields ?? {},
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
    deletedAt: toIso(row.deleted_at),
    closedAt: toIso(row.closed_at),
  };
}

function applyScope(query: Knex.QueryBuilder, request: Pick<OpportunityListRequest, "tenantId" | "companyId" | "branchId">) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}

function applyFilters(query: Knex.QueryBuilder, request: OpportunityListRequest) {
  applyScope(query, request).whereNull("deleted_at");
  if (request.stage) query.where("stage", request.stage);
  if (request.customerId) query.where("customer_id", request.customerId);
  if (request.ownerUserId) query.where("owner_user_id", request.ownerUserId);
  if (request.assignedTeamId) query.where("assigned_team_id", request.assignedTeamId);
  if (request.source) query.where("source", request.source);
  if (request.createdFrom) query.where("created_at", ">=", request.createdFrom);
  if (request.createdTo) query.where("created_at", "<=", request.createdTo);
  if (request.expectedCloseFrom) query.where("expected_close_date", ">=", request.expectedCloseFrom);
  if (request.expectedCloseTo) query.where("expected_close_date", "<=", request.expectedCloseTo);
  if (request.search) {
    const search = `%${request.search}%`;
    query.andWhere((builder) => {
      builder
        .whereILike("opportunity_number", search)
        .orWhereILike("name", search)
        .orWhereILike("source", search)
        .orWhereILike("notes", search);
    });
  }
  return query;
}

function summarySeed(): PipelineSummary["byStage"] {
  return Object.fromEntries(stages.map((stage) => [stage, { count: 0, value: 0, weightedValue: 0 }])) as PipelineSummary["byStage"];
}

async function listSummaryRows(
  connection: Knex,
  tenantId: string,
  filters: Omit<OpportunityListRequest, "tenantId"> = {},
): Promise<OpportunityRecord[]> {
  const rows = await applyFilters(connection<OpportunityRow>(tableName).select("*"), {
    ...filters,
    tenantId,
  }).orderBy("created_at", "desc");
  return (rows as OpportunityRow[]).map(mapOpportunityRow);
}

export function createOpportunitiesRepository(database?: Knex): OpportunityRepository {
  const db = () => database ?? getTenantKnex();

  return {
    async createOpportunity(input, _actorId = "system") {
      const stage = input.stage ?? "PROSPECTING";
      const [row] = await db()<OpportunityRow>(tableName)
        .insert({
          id: randomUUID(),
          tenant_id: input.tenantId,
          company_id: toNullable(input.companyId),
          branch_id: toNullable(input.branchId),
          opportunity_number: opportunityNumber(input),
          name: input.name,
          customer_id: input.customerId,
          party_id: toNullable(input.partyId),
          lead_id: toNullable(input.leadId),
          owner_user_id: toNullable(input.ownerUserId),
          assigned_team_id: toNullable(input.assignedTeamId),
          stage,
          probability: input.probability ?? defaultProbability(stage),
          expected_value: input.expectedValue ?? 0,
          currency: input.currency ?? "INR",
          expected_close_date: toNullable(input.expectedCloseDate),
          source: toNullable(input.source),
          loss_reason: toNullable(input.lossReason),
          notes: toNullable(input.notes),
          tags: input.tags ?? [],
          custom_fields: input.customFields ?? {},
          closed_at: stage === "WON" || stage === "LOST" ? db().fn.now() : null,
        })
        .returning("*");
      return mapOpportunityRow(row);
    },

    async listOpportunities(request) {
      const page = request.page ?? 1;
      const pageSize = request.pageSize ?? 25;
      const offset = (page - 1) * pageSize;
      const sortBy = request.sortBy ?? "created_at";
      const sortDirection = request.sortDirection ?? "desc";
      const connection = db();
      const rowsQuery = applyFilters(connection<OpportunityRow>(tableName).select("*"), request)
        .orderBy(sortBy, sortDirection)
        .limit(pageSize)
        .offset(offset);
      const countQuery = applyFilters(connection<OpportunityRow>(tableName).count<{ count: string }[]>({ count: "*" }), request);
      const [rows, countRows] = await Promise.all([rowsQuery, countQuery]);
      return { rows: rows.map(mapOpportunityRow), total: Number(countRows[0]?.count ?? 0), page, pageSize };
    },

    async getOpportunityById(tenantId, id) {
      const row = await db()<OpportunityRow>(tableName).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? mapOpportunityRow(row) : undefined;
    },

    async getOpportunityByNumber(tenantId, number, companyId) {
      const query = db()<OpportunityRow>(tableName)
        .where({ tenant_id: tenantId, opportunity_number: number })
        .whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? mapOpportunityRow(row) : undefined;
    },

    async updateOpportunity(tenantId, id, input, _actorId = "system") {
      const connection = db();
      const patch = compact({
        company_id: input.companyId,
        branch_id: input.branchId,
        name: input.name,
        customer_id: input.customerId,
        party_id: input.partyId,
        lead_id: input.leadId,
        owner_user_id: input.ownerUserId,
        assigned_team_id: input.assignedTeamId,
        stage: input.stage,
        probability: input.probability,
        expected_value: input.expectedValue,
        currency: input.currency,
        expected_close_date: input.expectedCloseDate,
        source: input.source,
        loss_reason: input.lossReason,
        notes: input.notes,
        tags: input.tags,
        custom_fields: input.customFields,
        updated_at: connection.fn.now(),
      });
      const [row] = await connection<OpportunityRow>(tableName)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update(patch)
        .returning("*");
      return row ? mapOpportunityRow(row) : undefined;
    },

    async softDeleteOpportunity(tenantId, id, _actorId = "system") {
      const connection = db();
      const [row] = await connection<OpportunityRow>(tableName)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() })
        .returning("*");
      return row ? mapOpportunityRow(row) : undefined;
    },

    async changeOpportunityStage(tenantId, id, input: OpportunityStageChangeInput, _actorId = "system") {
      const connection = db();
      const terminal = input.stage === "WON" || input.stage === "LOST";
      const [row] = await connection<OpportunityRow>(tableName)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({
          stage: input.stage,
          probability: input.probability ?? defaultProbability(input.stage),
          loss_reason: input.stage === "LOST" ? input.lossReason : null,
          closed_at: terminal ? connection.fn.now() : null,
          updated_at: connection.fn.now(),
        })
        .returning("*");
      return row ? mapOpportunityRow(row) : undefined;
    },

    async assignOpportunity(tenantId, id, input: OpportunityAssignmentInput, _actorId = "system") {
      const connection = db();
      const [row] = await connection<OpportunityRow>(tableName)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({
          owner_user_id: input.ownerUserId ?? null,
          assigned_team_id: input.assignedTeamId ?? null,
          updated_at: connection.fn.now(),
        })
        .returning("*");
      return row ? mapOpportunityRow(row) : undefined;
    },

    async searchOpportunities(request) {
      return this.listOpportunities(request);
    },

    async getOpportunityStats(tenantId, filters = {}): Promise<OpportunityStats> {
      const rows = await listSummaryRows(db(), tenantId, filters);
      const byStage = Object.fromEntries(stages.map((stage) => [stage, 0])) as OpportunityStats["byStage"];
      let openValue = 0;
      let wonValue = 0;
      let lostValue = 0;
      for (const row of rows) {
        byStage[row.stage] += 1;
        if (openStages.includes(row.stage)) openValue += row.expectedValue;
        if (row.stage === "WON") wonValue += row.expectedValue;
        if (row.stage === "LOST") lostValue += row.expectedValue;
      }
      return { total: rows.length, byStage, openValue, wonValue, lostValue };
    },

    async getPipelineSummary(tenantId, filters = {}): Promise<PipelineSummary> {
      const rows = await listSummaryRows(db(), tenantId, filters);
      const byStage = summarySeed();
      for (const row of rows) {
        byStage[row.stage].count += 1;
        byStage[row.stage].value += row.expectedValue;
        byStage[row.stage].weightedValue += row.expectedValue * (row.probability / 100);
      }
      return {
        openCount: rows.filter((row) => openStages.includes(row.stage)).length,
        openValue: openStages.reduce((sum, stage) => sum + byStage[stage].value, 0),
        weightedValue: openStages.reduce((sum, stage) => sum + byStage[stage].weightedValue, 0),
        wonValue: byStage.WON.value,
        lostValue: byStage.LOST.value,
        byStage,
      };
    },

    async getForecastSummary(tenantId, filters = {}): Promise<ForecastSummary> {
      const rows = await listSummaryRows(db(), tenantId, filters);
      const forecastRows = rows.filter((row) => openStages.includes(row.stage));
      return {
        currency: forecastRows[0]?.currency ?? "INR",
        opportunityCount: forecastRows.length,
        pipelineValue: forecastRows.reduce((sum, row) => sum + row.expectedValue, 0),
        weightedValue: forecastRows.reduce((sum, row) => sum + row.expectedValue * (row.probability / 100), 0),
        expectedCloseFrom: filters.expectedCloseFrom,
        expectedCloseTo: filters.expectedCloseTo,
      };
    },
  };
}

export const opportunitiesRepository = createOpportunitiesRepository();
