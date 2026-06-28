import type { ActorContext, BranchId, CompanyId, PageResult, TenantId } from "@vercent/shared-types";

export const creditNoteAllocationTargetTypes = ["SALES_INVOICE", "SALES_DEBIT_NOTE"] as const;
export type CreditNoteAllocationTargetType = (typeof creditNoteAllocationTargetTypes)[number];

export type CreditNoteAllocationRecord = {
  id: string;
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  creditNoteId: string;
  targetType: CreditNoteAllocationTargetType;
  targetId: string;
  customerId: string;
  allocationDate: string;
  amount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreditNoteAllocationCreateInput = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  creditNoteId: string;
  targetType: CreditNoteAllocationTargetType;
  targetId: string;
  allocationDate?: string;
  amount: number;
  notes?: string;
};

export type CreditNoteAllocationListRequest = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  creditNoteId?: string;
  targetType?: CreditNoteAllocationTargetType;
  targetId?: string;
  customerId?: string;
  page?: number;
  pageSize?: number;
};

export type CreditNoteAllocationActionContext = ActorContext & { reason?: string };

export type CreditNoteAllocationRepository = {
  createCreditNoteAllocation(input: CreditNoteAllocationCreateInput & { customerId: string }, actorId?: string): Promise<CreditNoteAllocationRecord>;
  listCreditNoteAllocations(request: CreditNoteAllocationListRequest): Promise<PageResult<CreditNoteAllocationRecord>>;
  getCreditNoteAllocations(tenantId: string, creditNoteId: string): Promise<CreditNoteAllocationRecord[]>;
  getInvoiceCreditAllocations(tenantId: string, salesInvoiceId: string): Promise<CreditNoteAllocationRecord[]>;
  getDebitNoteCreditAllocations(tenantId: string, salesDebitNoteId: string): Promise<CreditNoteAllocationRecord[]>;
};
