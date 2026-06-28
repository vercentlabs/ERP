import type { PageResult } from "@vercent/shared-types";
import type { AccountingPeriodsCreateInput, AccountingPeriodsListRequest, AccountingPeriodsRecord, AccountingPeriodsUpdateInput } from "./types";

const records = new Map<string, AccountingPeriodsRecord>();

const now = () => new Date().toISOString();
const createId = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const accountingPeriodsRepository = {
  async list(request: AccountingPeriodsListRequest): Promise<PageResult<AccountingPeriodsRecord>> {
    const page = request.page ?? 1;
    const pageSize = request.pageSize ?? 50;
    const search = request.search?.toLowerCase();
    const rows = [...records.values()].filter((record) => {
      if (record.tenantId !== request.tenantId) return false;
      if (request.status && record.status !== request.status) return false;
      if (request.ownerId && record.ownerId !== request.ownerId) return false;
      if (request.priority && record.priority !== request.priority) return false;
      if (!search) return true;
      return [record.code, record.name, record.description, record.ownerId]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search));
    });
    const start = (page - 1) * pageSize;
    return { rows: rows.slice(start, start + pageSize), total: rows.length, page, pageSize };
  },

  async getById(tenantId: string, id: string) {
    const record = records.get(id);
    return record?.tenantId === tenantId ? record : undefined;
  },

  async create(input: AccountingPeriodsCreateInput, actorId = "system"): Promise<AccountingPeriodsRecord> {
    const timestamp = now();
    const record: AccountingPeriodsRecord = {
      id: createId(),
      tenantId: input.tenantId,
      companyId: input.companyId,
      branchId: input.branchId,
      code: input.code,
      name: input.name,
      description: input.description,
      amount: input.amount,
      priority: input.priority ?? "medium",
      dueDate: input.dueDate,
      ownerId: input.ownerId,
      source: input.source,
      status: "draft",
      tags: [],
      customFields: input.customFields ?? {},
      createdAt: timestamp,
      createdBy: actorId,
      updatedAt: timestamp,
      updatedBy: actorId,
    };
    records.set(record.id, record);
    return record;
  },

  async update(tenantId: string, id: string, input: AccountingPeriodsUpdateInput, actorId = "system") {
    const current = await this.getById(tenantId, id);
    if (!current) return undefined;
    const updated: AccountingPeriodsRecord = {
      ...current,
      ...input,
      tenantId: current.tenantId,
      code: current.code,
      updatedAt: now(),
      updatedBy: actorId,
    };
    records.set(id, updated);
    return updated;
  },

  async save(record: AccountingPeriodsRecord) {
    records.set(record.id, record);
    return record;
  },
};
