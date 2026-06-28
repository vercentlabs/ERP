export type MasterDataStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
export type PartyType = "INDIVIDUAL" | "COMPANY";
export type AddressType = "BILLING" | "SHIPPING" | "REGISTERED" | "OFFICE" | "WAREHOUSE" | "OTHER";
export type ItemType = "PRODUCT" | "SERVICE" | "RAW_MATERIAL" | "FINISHED_GOOD" | "SEMI_FINISHED_GOOD" | "CONSUMABLE" | "ASSET";

export type Scope = { tenantId: string; companyId?: string; branchId?: string };
export type AuditDates = { createdAt: string; updatedAt: string; deletedAt?: string };
export type PageResult<T> = { rows: T[]; total: number; page: number; pageSize: number };
export type MasterDataContext = Scope & {
  actorId: string;
  roles: string[];
  permissions: string[];
  attributes?: Record<string, string | number | boolean>;
};
export type ListRequest = Scope & {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: MasterDataStatus;
  type?: string;
  group?: string;
  createdFrom?: string;
  createdTo?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
};

export type Party = Scope & AuditDates & {
  id: string;
  partyNumber: string;
  partyType: PartyType;
  displayName: string;
  legalName?: string;
  taxId?: string;
  gstin?: string;
  pan?: string;
  email?: string;
  phone?: string;
  website?: string;
  status: MasterDataStatus;
  tags: string[];
  customFields: Record<string, unknown>;
};

export type Address = Scope & AuditDates & {
  id: string;
  partyId: string;
  addressType: AddressType;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  gstStateCode?: string;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
};

export type Customer = Scope & AuditDates & {
  id: string;
  partyId: string;
  customerNumber: string;
  customerGroup?: string;
  creditLimit: number;
  paymentTerms?: string;
  currency: string;
  gstTreatment?: string;
  receivableAccountId?: string;
  status: MasterDataStatus;
};

export type Supplier = Scope & AuditDates & {
  id: string;
  partyId: string;
  supplierNumber: string;
  supplierGroup?: string;
  paymentTerms?: string;
  currency: string;
  gstTreatment?: string;
  payableAccountId?: string;
  rating?: number;
  status: MasterDataStatus;
};

export type Uom = Scope & AuditDates & {
  id: string;
  code: string;
  name: string;
  category?: string;
  precision: number;
  isBase: boolean;
  status: MasterDataStatus;
};

export type Item = Scope & AuditDates & {
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
  taxCategory?: string;
  hsnSacCode?: string;
  barcode?: string;
  status: MasterDataStatus;
  tags: string[];
  customFields: Record<string, unknown>;
};

export type PartyCreate = Omit<Party, keyof AuditDates | "id" | "partyNumber" | "status" | "tags" | "customFields"> &
  Partial<Pick<Party, "partyNumber" | "status" | "tags" | "customFields">>;
export type PartyUpdate = Partial<Omit<PartyCreate, "tenantId">>;
export type AddressCreate = Omit<Address, keyof AuditDates | "id" | "isDefaultBilling" | "isDefaultShipping"> &
  Partial<Pick<Address, "isDefaultBilling" | "isDefaultShipping">>;
export type AddressUpdate = Partial<Omit<AddressCreate, "tenantId" | "partyId">>;
export type CustomerCreate = Omit<Customer, keyof AuditDates | "id" | "customerNumber" | "creditLimit" | "currency" | "status"> &
  Partial<Pick<Customer, "customerNumber" | "creditLimit" | "currency" | "status">>;
export type CustomerUpdate = Partial<Omit<CustomerCreate, "tenantId" | "partyId">>;
export type SupplierCreate = Omit<Supplier, keyof AuditDates | "id" | "supplierNumber" | "currency" | "status"> &
  Partial<Pick<Supplier, "supplierNumber" | "currency" | "status">>;
export type SupplierUpdate = Partial<Omit<SupplierCreate, "tenantId" | "partyId">>;
export type UomCreate = Omit<Uom, keyof AuditDates | "id" | "precision" | "isBase" | "status"> &
  Partial<Pick<Uom, "precision" | "isBase" | "status">>;
export type UomUpdate = Partial<Omit<UomCreate, "tenantId" | "code">>;
export type ItemCreate = Omit<Item, keyof AuditDates | "id" | "itemNumber" | "isStockItem" | "isSalesItem" | "isPurchaseItem" | "isManufacturingItem" | "currency" | "status" | "tags" | "customFields"> &
  Partial<Pick<Item, "itemNumber" | "isStockItem" | "isSalesItem" | "isPurchaseItem" | "isManufacturingItem" | "currency" | "status" | "tags" | "customFields">>;
export type ItemUpdate = Partial<Omit<ItemCreate, "tenantId" | "itemNumber" | "baseUomId">> & { baseUomId?: string };

export type ItemStats = {
  total: number;
  byStatus: Record<MasterDataStatus, number>;
  stockItems: number;
  serviceItems: number;
};

export type MasterDataRepository = {
  createParty(input: PartyCreate): Promise<Party>;
  listParties(input: ListRequest): Promise<PageResult<Party>>;
  getPartyById(tenantId: string, id: string): Promise<Party | undefined>;
  getPartyByNumber(tenantId: string, partyNumber: string, companyId?: string): Promise<Party | undefined>;
  updateParty(tenantId: string, id: string, input: PartyUpdate): Promise<Party | undefined>;
  softDeleteParty(tenantId: string, id: string): Promise<Party | undefined>;
  searchParties(input: ListRequest): Promise<PageResult<Party>>;
  createAddress(input: AddressCreate): Promise<Address>;
  listAddressesByParty(tenantId: string, partyId: string): Promise<Address[]>;
  updateAddress(tenantId: string, id: string, input: AddressUpdate): Promise<Address | undefined>;
  softDeleteAddress(tenantId: string, id: string): Promise<Address | undefined>;
  setDefaultBillingAddress(tenantId: string, id: string): Promise<Address | undefined>;
  setDefaultShippingAddress(tenantId: string, id: string): Promise<Address | undefined>;
  createCustomer(input: CustomerCreate): Promise<Customer>;
  listCustomers(input: ListRequest): Promise<PageResult<Customer>>;
  getCustomerById(tenantId: string, id: string): Promise<Customer | undefined>;
  getCustomerByNumber(tenantId: string, customerNumber: string, companyId?: string): Promise<Customer | undefined>;
  updateCustomer(tenantId: string, id: string, input: CustomerUpdate): Promise<Customer | undefined>;
  softDeleteCustomer(tenantId: string, id: string): Promise<Customer | undefined>;
  searchCustomers(input: ListRequest): Promise<PageResult<Customer>>;
  createSupplier(input: SupplierCreate): Promise<Supplier>;
  listSuppliers(input: ListRequest): Promise<PageResult<Supplier>>;
  getSupplierById(tenantId: string, id: string): Promise<Supplier | undefined>;
  getSupplierByNumber(tenantId: string, supplierNumber: string, companyId?: string): Promise<Supplier | undefined>;
  updateSupplier(tenantId: string, id: string, input: SupplierUpdate): Promise<Supplier | undefined>;
  softDeleteSupplier(tenantId: string, id: string): Promise<Supplier | undefined>;
  searchSuppliers(input: ListRequest): Promise<PageResult<Supplier>>;
  createUom(input: UomCreate): Promise<Uom>;
  listUoms(input: ListRequest): Promise<PageResult<Uom>>;
  getUomById(tenantId: string, id: string): Promise<Uom | undefined>;
  getUomByCode(tenantId: string, code: string, companyId?: string): Promise<Uom | undefined>;
  updateUom(tenantId: string, id: string, input: UomUpdate): Promise<Uom | undefined>;
  softDeleteUom(tenantId: string, id: string): Promise<Uom | undefined>;
  createItem(input: ItemCreate): Promise<Item>;
  listItems(input: ListRequest): Promise<PageResult<Item>>;
  getItemById(tenantId: string, id: string): Promise<Item | undefined>;
  getItemByNumber(tenantId: string, itemNumber: string, companyId?: string): Promise<Item | undefined>;
  getItemBySku(tenantId: string, sku: string, companyId?: string): Promise<Item | undefined>;
  updateItem(tenantId: string, id: string, input: ItemUpdate): Promise<Item | undefined>;
  softDeleteItem(tenantId: string, id: string): Promise<Item | undefined>;
  searchItems(input: ListRequest): Promise<PageResult<Item>>;
  getItemStats(tenantId: string): Promise<ItemStats>;
};
