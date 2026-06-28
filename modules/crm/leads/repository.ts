import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
import { createMasterDataRepository } from "../../master-data/foundation/repository";
import { createOpportunitiesRepository } from "../opportunities/repository";
import type {
  LeadAssignmentInput,
  LeadCreateInput,
  LeadListRequest,
  LeadRecord,
  LeadRepository,
  LeadStats,
  LeadStatus,
  LeadStatusChangeInput,
  LeadUpdateInput,
  LeadConvertedInput,
} from "./types";

const tableName = "crm_leads";

type LeadRow = {
  id: string;
  tenant_id: string;
  company_id: string | null;
  branch_id: string | null;
  lead_number: string;
  first_name: string;
  last_name: string;
  company_name: string | null;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: LeadStatus;
  score: number;
  owner_user_id: string | null;
  assigned_team_id: string | null;
  expected_value: string | number | null;
  currency: string;
  notes: string | null;
  tags: string[] | null;
  custom_fields: Record<string, unknown> | null;
  converted_party_id: string | null;
  converted_customer_id: string | null;
  converted_opportunity_id: string | null;
  converted_at: Date | string | null;
  converted_by_user_id: string | null;
  conversion_notes: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string | null;
};

const toIso = (value: Date | string | null | undefined) => {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : value;
};

const toNullable = <T>(value: T | undefined | null) => value ?? null;

export function mapLeadRow(row: LeadRow): LeadRecord {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    companyId: row.company_id ?? undefined,
    branchId: row.branch_id ?? undefined,
    leadNumber: row.lead_number,
    firstName: row.first_name,
    lastName: row.last_name,
    companyName: row.company_name ?? undefined,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    source: row.source ?? undefined,
    status: row.status,
    score: Number(row.score),
    ownerUserId: row.owner_user_id ?? undefined,
    assignedTeamId: row.assigned_team_id ?? undefined,
    expectedValue: row.expected_value == null ? undefined : Number(row.expected_value),
    currency: row.currency,
    notes: row.notes ?? undefined,
    tags: row.tags ?? [],
    customFields: row.custom_fields ?? {},
    convertedPartyId: row.converted_party_id ?? undefined,
    convertedCustomerId: row.converted_customer_id ?? undefined,
    convertedOpportunityId: row.converted_opportunity_id ?? undefined,
    convertedAt: toIso(row.converted_at),
    convertedByUserId: row.converted_by_user_id ?? undefined,
    conversionNotes: row.conversion_notes ?? undefined,
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
    deletedAt: toIso(row.deleted_at),
  };
}

function buildLeadNumber(input: LeadCreateInput) {
  if (input.leadNumber) return input.leadNumber;
  const suffix = randomUUID().slice(0, 8).toUpperCase();
  return `LEAD-${suffix}`;
}

function applyTenantScope(query: Knex.QueryBuilder, request: Pick<LeadListRequest, "tenantId" | "companyId" | "branchId">) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}

function applyListFilters(query: Knex.QueryBuilder, request: LeadListRequest) {
  applyTenantScope(query, request);
  query.whereNull("deleted_at");
  if (request.status) query.where("status", request.status);
  if (request.ownerUserId) query.where("owner_user_id", request.ownerUserId);
  if (request.source) query.where("source", request.source);
  if (request.createdFrom) query.where("created_at", ">=", request.createdFrom);
  if (request.createdTo) query.where("created_at", "<=", request.createdTo);
  if (request.search) {
    const search = `%${request.search}%`;
    query.andWhere((builder) => {
      builder
        .whereILike("lead_number", search)
        .orWhereILike("first_name", search)
        .orWhereILike("last_name", search)
        .orWhereILike("company_name", search)
        .orWhereILike("email", search)
        .orWhereILike("phone", search);
    });
  }
  return query;
}

function createInsertRow(input: LeadCreateInput): Omit<LeadRow, "created_at" | "updated_at" | "deleted_at"> {
  return {
    id: randomUUID(),
    tenant_id: input.tenantId,
    company_id: toNullable(input.companyId),
    branch_id: toNullable(input.branchId),
    lead_number: buildLeadNumber(input),
    first_name: input.firstName,
    last_name: input.lastName,
    company_name: toNullable(input.companyName),
    email: toNullable(input.email),
    phone: toNullable(input.phone),
    source: toNullable(input.source),
    status: "NEW",
    score: input.score ?? 0,
    owner_user_id: toNullable(input.ownerUserId),
    assigned_team_id: toNullable(input.assignedTeamId),
    expected_value: toNullable(input.expectedValue),
    currency: input.currency ?? "INR",
    notes: toNullable(input.notes),
    tags: input.tags ?? [],
    custom_fields: input.customFields ?? {},
    converted_party_id: null,
    converted_customer_id: null,
    converted_opportunity_id: null,
    converted_at: null,
    converted_by_user_id: null,
    conversion_notes: null,
  };
}

export function createLeadsRepository(database?: Knex): LeadRepository {
  const db = () => database ?? getTenantKnex();

  return {
    async createLead(input, _actorId = "system") {
      const [row] = await db()<LeadRow>(tableName).insert(createInsertRow(input)).returning("*");
      return mapLeadRow(row);
    },

    async listLeads(request) {
      const page = request.page ?? 1;
      const pageSize = request.pageSize ?? 25;
      const offset = (page - 1) * pageSize;
      const sortBy = request.sortBy ?? "created_at";
      const sortDirection = request.sortDirection ?? "desc";

      const connection = db();
      const rowsQuery = applyListFilters(connection<LeadRow>(tableName).select("*"), request)
        .orderBy(sortBy, sortDirection)
        .limit(pageSize)
        .offset(offset);
      const countQuery = applyListFilters(connection<LeadRow>(tableName).count<{ count: string }[]>({ count: "*" }), request);

      const [rows, countRows] = await Promise.all([rowsQuery, countQuery]);
      return {
        rows: rows.map(mapLeadRow),
        total: Number(countRows[0]?.count ?? 0),
        page,
        pageSize,
      };
    },

    async getLeadById(tenantId, id) {
      const row = await db()<LeadRow>(tableName).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? mapLeadRow(row) : undefined;
    },

    async getLeadByNumber(tenantId, leadNumber, companyId) {
      const query = db()<LeadRow>(tableName)
        .where({ tenant_id: tenantId, lead_number: leadNumber })
        .whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? mapLeadRow(row) : undefined;
    },

    async updateLead(tenantId, id, input, _actorId = "system") {
      const patch = {
        company_id: input.companyId,
        branch_id: input.branchId,
        first_name: input.firstName,
        last_name: input.lastName,
        company_name: input.companyName,
        email: input.email,
        phone: input.phone,
        source: input.source,
        score: input.score,
        owner_user_id: input.ownerUserId,
        assigned_team_id: input.assignedTeamId,
        expected_value: input.expectedValue,
        currency: input.currency,
        notes: input.notes,
        tags: input.tags,
        custom_fields: input.customFields,
        converted_party_id: input.convertedPartyId,
        converted_customer_id: input.convertedCustomerId,
        converted_opportunity_id: input.convertedOpportunityId,
        converted_at: input.convertedAt,
        converted_by_user_id: input.convertedByUserId,
        conversion_notes: input.conversionNotes,
        updated_at: db().fn.now(),
      };
      const compactPatch = Object.fromEntries(Object.entries(patch).filter(([, value]) => value !== undefined));
      const [row] = await db()<LeadRow>(tableName)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update(compactPatch)
        .returning("*");
      return row ? mapLeadRow(row) : undefined;
    },

    async softDeleteLead(tenantId, id, _actorId = "system") {
      const connection = db();
      const [row] = await connection<LeadRow>(tableName)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() })
        .returning("*");
      return row ? mapLeadRow(row) : undefined;
    },

    async changeLeadStatus(tenantId, id, input, _actorId = "system") {
      const [row] = await db()<LeadRow>(tableName)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({
          status: input.status,
          converted_customer_id: input.convertedCustomerId ?? null,
          converted_opportunity_id: input.convertedOpportunityId ?? null,
          updated_at: db().fn.now(),
        })
        .returning("*");
      return row ? mapLeadRow(row) : undefined;
    },

    async assignLead(tenantId, id, input, _actorId = "system") {
      const [row] = await db()<LeadRow>(tableName)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({
          owner_user_id: input.ownerUserId ?? null,
          assigned_team_id: input.assignedTeamId ?? null,
          updated_at: db().fn.now(),
        })
        .returning("*");
      return row ? mapLeadRow(row) : undefined;
    },

    async getLeadForConversion(tenantId, id) {
      const row = await db()<LeadRow>(tableName)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .forUpdate()
        .first();
      return row ? mapLeadRow(row) : undefined;
    },

    async markLeadConverted(tenantId, id, input: LeadConvertedInput, actorId = "system") {
      const connection = db();
      const [row] = await connection<LeadRow>(tableName)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({
          status: "CONVERTED",
          converted_party_id: input.convertedPartyId,
          converted_customer_id: input.convertedCustomerId,
          converted_opportunity_id: input.convertedOpportunityId ?? null,
          converted_at: connection.fn.now(),
          converted_by_user_id: actorId,
          conversion_notes: input.conversionNotes ?? null,
          updated_at: connection.fn.now(),
        })
        .returning("*");
      return row ? mapLeadRow(row) : undefined;
    },

    async withTransaction(handler) {
      return db().transaction(async (trx) =>
        handler({
          leads: createLeadsRepository(trx),
          masterData: createMasterDataRepository(trx),
          opportunities: createOpportunitiesRepository(trx),
        }),
      );
    },

    async searchLeads(request) {
      return this.listLeads(request);
    },

    async getLeadStats(tenantId, filters = {}): Promise<LeadStats> {
      const query = db()<LeadRow>(tableName).where({ tenant_id: tenantId }).whereNull("deleted_at");
      if (filters.companyId) query.where("company_id", filters.companyId);
      if (filters.branchId) query.where("branch_id", filters.branchId);
      if (filters.ownerUserId) query.where("owner_user_id", filters.ownerUserId);
      if (filters.source) query.where("source", filters.source);

      const rows = await query.select("status", "score", "expected_value");
      const byStatus: LeadStats["byStatus"] = {
        NEW: 0,
        CONTACTED: 0,
        QUALIFIED: 0,
        DISQUALIFIED: 0,
        CONVERTED: 0,
      };
      let totalExpectedValue = 0;
      let totalScore = 0;
      for (const row of rows) {
        byStatus[row.status] += 1;
        totalExpectedValue += row.expected_value == null ? 0 : Number(row.expected_value);
        totalScore += Number(row.score ?? 0);
      }
      return {
        total: rows.length,
        byStatus,
        totalExpectedValue,
        averageScore: rows.length === 0 ? 0 : Number((totalScore / rows.length).toFixed(2)),
      };
    },
  };
}

export const leadsRepository = createLeadsRepository();
