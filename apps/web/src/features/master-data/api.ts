export type MasterDataStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
export type PartyType = "INDIVIDUAL" | "COMPANY";
export type ItemType = "PRODUCT" | "SERVICE" | "RAW_MATERIAL" | "FINISHED_GOOD" | "SEMI_FINISHED_GOOD" | "CONSUMABLE" | "ASSET";

export type PageResult<T> = {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type ListParams = {
  search?: string;
  status?: string;
  type?: string;
  group?: string;
  page?: string;
  pageSize?: string;
};

export type Party = {
  id: string;
  partyNumber: string;
  partyType: PartyType;
  displayName: string;
  legalName?: string;
  gstin?: string;
  pan?: string;
  email?: string;
  phone?: string;
  website?: string;
  status: MasterDataStatus;
};

export type Address = {
  id: string;
  partyId: string;
  addressType: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
};

export type Customer = {
  id: string;
  partyId: string;
  customerNumber: string;
  customerGroup?: string;
  creditLimit: number;
  paymentTerms?: string;
  currency: string;
  gstTreatment?: string;
  status: MasterDataStatus;
};

export type Supplier = {
  id: string;
  partyId: string;
  supplierNumber: string;
  supplierGroup?: string;
  paymentTerms?: string;
  currency: string;
  gstTreatment?: string;
  rating?: number;
  status: MasterDataStatus;
};

export type Uom = {
  id: string;
  code: string;
  name: string;
  category?: string;
  precision: number;
  isBase: boolean;
  status: MasterDataStatus;
};

export type Item = {
  id: string;
  itemNumber: string;
  sku?: string;
  name: string;
  description?: string;
  itemType: ItemType;
  itemGroup?: string;
  baseUomId: string;
  salesUomId?: string;
  purchaseUomId?: string;
  isStockItem: boolean;
  isSalesItem: boolean;
  isPurchaseItem: boolean;
  isManufacturingItem: boolean;
  standardCost?: number;
  sellingPrice?: number;
  currency: string;
  hsnSacCode?: string;
  status: MasterDataStatus;
};

export type ItemStats = {
  total: number;
  byStatus: Record<MasterDataStatus, number>;
  stockItems: number;
  serviceItems: number;
};

const apiBaseUrl = process.env.VERCENT_API_BASE_URL ?? "http://localhost:4000";
const tenantId = process.env.VERCENT_TENANT_ID ?? "demo-tenant";

function apiUrl(path: string, params?: Record<string, string | undefined>) {
  const url = new URL(path, apiBaseUrl);
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value) url.searchParams.set(key, value);
  }
  return url;
}

async function request<T>(path: string, init?: RequestInit, params?: Record<string, string | undefined>) {
  const response = await fetch(apiUrl(path, params), {
    ...init,
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      "x-tenant-id": tenantId,
      "x-permissions": "*",
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}

export const listParties = (params: ListParams = {}) => request<PageResult<Party>>("/api/master-data/parties", undefined, { ...params, pageSize: params.pageSize ?? "25" });
export const getParty = (id: string) => request<Party>(`/api/master-data/parties/${id}`);
export const createParty = (input: Record<string, unknown>) => request<Party>("/api/master-data/parties", { method: "POST", body: JSON.stringify(input) });
export const updateParty = (id: string, input: Record<string, unknown>) => request<Party>(`/api/master-data/parties/${id}`, { method: "PATCH", body: JSON.stringify(input) });
export const listAddresses = (partyId: string) => request<Address[]>(`/api/master-data/parties/${partyId}/addresses`);
export const createAddress = (partyId: string, input: Record<string, unknown>) => request<Address>(`/api/master-data/parties/${partyId}/addresses`, { method: "POST", body: JSON.stringify(input) });

export const listCustomers = (params: ListParams = {}) => request<PageResult<Customer>>("/api/master-data/customers", undefined, { ...params, pageSize: params.pageSize ?? "25" });
export const getCustomer = (id: string) => request<Customer>(`/api/master-data/customers/${id}`);
export const createCustomer = (input: Record<string, unknown>) => request<Customer>("/api/master-data/customers", { method: "POST", body: JSON.stringify(input) });
export const updateCustomer = (id: string, input: Record<string, unknown>) => request<Customer>(`/api/master-data/customers/${id}`, { method: "PATCH", body: JSON.stringify(input) });

export const listSuppliers = (params: ListParams = {}) => request<PageResult<Supplier>>("/api/master-data/suppliers", undefined, { ...params, pageSize: params.pageSize ?? "25" });
export const getSupplier = (id: string) => request<Supplier>(`/api/master-data/suppliers/${id}`);
export const createSupplier = (input: Record<string, unknown>) => request<Supplier>("/api/master-data/suppliers", { method: "POST", body: JSON.stringify(input) });
export const updateSupplier = (id: string, input: Record<string, unknown>) => request<Supplier>(`/api/master-data/suppliers/${id}`, { method: "PATCH", body: JSON.stringify(input) });

export const listUoms = (params: ListParams = {}) => request<PageResult<Uom>>("/api/master-data/uoms", undefined, { ...params, pageSize: params.pageSize ?? "100" });
export const getUom = (id: string) => request<Uom>(`/api/master-data/uoms/${id}`);
export const createUom = (input: Record<string, unknown>) => request<Uom>("/api/master-data/uoms", { method: "POST", body: JSON.stringify(input) });

export const listItems = (params: ListParams = {}) => request<PageResult<Item>>("/api/master-data/items", undefined, { ...params, pageSize: params.pageSize ?? "25" });
export const getItem = (id: string) => request<Item>(`/api/master-data/items/${id}`);
export const getItemStats = () => request<ItemStats>("/api/master-data/items/stats");
export const createItem = (input: Record<string, unknown>) => request<Item>("/api/master-data/items", { method: "POST", body: JSON.stringify(input) });
export const updateItem = (id: string, input: Record<string, unknown>) => request<Item>(`/api/master-data/items/${id}`, { method: "PATCH", body: JSON.stringify(input) });
