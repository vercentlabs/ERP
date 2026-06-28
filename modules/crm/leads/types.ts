import type { ActorContext, BranchId, CompanyId, PageRequest, PageResult, TenantId, UserId } from "@vercent/shared-types";
import type {
  Address,
  AddressCreate,
  Customer,
  CustomerCreate,
  MasterDataRepository,
  Party,
  PartyCreate,
  PartyType,
} from "../../master-data/foundation/types";
import type { OpportunityRecord, OpportunityRepository } from "../opportunities/types";

export const leadStatuses = ["NEW", "CONTACTED", "QUALIFIED", "DISQUALIFIED", "CONVERTED"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export const leadSources = [
  "website",
  "referral",
  "phone",
  "email",
  "event",
  "social",
  "partner",
  "import",
  "other",
] as const;
export type LeadSource = (typeof leadSources)[number];

export type LeadSortField = "created_at" | "updated_at" | "score" | "expected_value";
export type SortDirection = "asc" | "desc";

export type LeadRecord = {
  id: string;
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  leadNumber: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  email?: string;
  phone?: string;
  source?: LeadSource | string;
  status: LeadStatus;
  score: number;
  ownerUserId?: UserId;
  assignedTeamId?: string;
  expectedValue?: number;
  currency: string;
  notes?: string;
  tags: string[];
  customFields: Record<string, unknown>;
  convertedPartyId?: string;
  convertedCustomerId?: string;
  convertedOpportunityId?: string;
  convertedAt?: string;
  convertedByUserId?: UserId;
  conversionNotes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type LeadCreateInput = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  leadNumber?: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  email?: string;
  phone?: string;
  source?: LeadSource | string;
  score?: number;
  ownerUserId?: UserId;
  assignedTeamId?: string;
  expectedValue?: number;
  currency?: string;
  notes?: string;
  tags?: string[];
  customFields?: Record<string, unknown>;
};

export type LeadUpdateInput = Partial<Omit<LeadCreateInput, "tenantId" | "leadNumber">> & {
  convertedPartyId?: string | null;
  convertedCustomerId?: string | null;
  convertedOpportunityId?: string | null;
  convertedAt?: string | null;
  convertedByUserId?: string | null;
  conversionNotes?: string | null;
};

export type LeadListRequest = PageRequest & {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  status?: LeadStatus;
  ownerUserId?: UserId;
  source?: string;
  createdFrom?: string;
  createdTo?: string;
  sortBy?: LeadSortField;
  sortDirection?: SortDirection;
};

export type LeadStatusChangeInput = {
  status: LeadStatus;
  convertedCustomerId?: string;
  convertedOpportunityId?: string;
};

export type LeadAssignmentInput = {
  ownerUserId?: UserId;
  assignedTeamId?: string;
};

export type LeadConversionAddressInput = Omit<
  AddressCreate,
  "tenantId" | "companyId" | "branchId" | "partyId" | "addressType" | "isDefaultBilling" | "isDefaultShipping"
>;

export type LeadConversionInput = {
  partyType: PartyType;
  displayName: string;
  legalName?: string;
  gstin?: string;
  pan?: string;
  email?: string;
  phone?: string;
  customerGroup?: string;
  paymentTerms?: string;
  currency?: string;
  gstTreatment?: string;
  billingAddress?: LeadConversionAddressInput;
  shippingAddress?: LeadConversionAddressInput;
  createOpportunity?: boolean;
  opportunityName?: string;
  expectedValue?: number;
  expectedCloseDate?: string;
  opportunitySource?: string;
  notes?: string;
};

export type LeadConvertedInput = {
  convertedPartyId: string;
  convertedCustomerId: string;
  convertedOpportunityId?: string | null;
  conversionNotes?: string | null;
};

export type LeadConversionResult = {
  lead: LeadRecord;
  party: Party;
  customer: Customer;
  addresses: Address[];
  opportunity: OpportunityRecord | null;
  summary: {
    leadId: string;
    partyId: string;
    customerId: string;
    opportunityId?: string;
    convertedAt?: string;
  };
};

export type LeadStats = {
  total: number;
  byStatus: Record<LeadStatus, number>;
  totalExpectedValue: number;
  averageScore: number;
};

export type LeadActionContext = ActorContext & {
  reason?: string;
};

export type LeadRepository = {
  createLead(input: LeadCreateInput, actorId?: string): Promise<LeadRecord>;
  listLeads(request: LeadListRequest): Promise<PageResult<LeadRecord>>;
  getLeadById(tenantId: string, id: string): Promise<LeadRecord | undefined>;
  getLeadByNumber(tenantId: string, leadNumber: string, companyId?: string): Promise<LeadRecord | undefined>;
  updateLead(tenantId: string, id: string, input: LeadUpdateInput, actorId?: string): Promise<LeadRecord | undefined>;
  softDeleteLead(tenantId: string, id: string, actorId?: string): Promise<LeadRecord | undefined>;
  changeLeadStatus(
    tenantId: string,
    id: string,
    input: LeadStatusChangeInput,
    actorId?: string,
  ): Promise<LeadRecord | undefined>;
  assignLead(tenantId: string, id: string, input: LeadAssignmentInput, actorId?: string): Promise<LeadRecord | undefined>;
  getLeadForConversion(tenantId: string, id: string): Promise<LeadRecord | undefined>;
  markLeadConverted(tenantId: string, id: string, input: LeadConvertedInput, actorId?: string): Promise<LeadRecord | undefined>;
  withTransaction<T>(
    handler: (repositories: { leads: LeadRepository; masterData: MasterDataRepository; opportunities: OpportunityRepository }) => Promise<T>,
  ): Promise<T>;
  searchLeads(request: LeadListRequest): Promise<PageResult<LeadRecord>>;
  getLeadStats(tenantId: string, filters?: Pick<LeadListRequest, "companyId" | "branchId" | "ownerUserId" | "source">): Promise<LeadStats>;
};
