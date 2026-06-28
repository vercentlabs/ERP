export type TenantId = string;
export type UserId = string;
export type CompanyId = string;
export type BranchId = string;
export type ISODateTime = string;

export type TenantScope = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
};

export type ActorContext = TenantScope & {
  actorId: UserId;
  roles: string[];
  permissions: string[];
  attributes?: Record<string, string | number | boolean>;
};

export type AuditFields = {
  createdAt: ISODateTime;
  createdBy: UserId;
  updatedAt: ISODateTime;
  updatedBy: UserId;
};

export type DocumentStatus = "draft" | "submitted" | "approved" | "rejected" | "cancelled" | "closed";

export type ErpRecord<TExtra extends Record<string, unknown> = Record<string, unknown>> = TenantScope &
  AuditFields &
  TExtra & {
    id: string;
    code: string;
    name: string;
    status: DocumentStatus;
    ownerId?: UserId;
    tags: string[];
    customFields: Record<string, unknown>;
  };

export type BusinessEvent<TPayload = Record<string, unknown>> = TenantScope & {
  id: string;
  type: string;
  aggregateId: string;
  aggregateType: string;
  payload: TPayload;
  actorId: UserId;
  occurredAt: ISODateTime;
};

export type PageRequest = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: DocumentStatus;
};

export type PageResult<T> = {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
};
