import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
import type {
  Address,
  AddressCreate,
  AddressType,
  AddressUpdate,
  Customer,
  CustomerCreate,
  CustomerUpdate,
  Item,
  ItemCreate,
  ItemStats,
  ItemType,
  ItemUpdate,
  ListRequest,
  MasterDataRepository,
  MasterDataStatus,
  Party,
  PartyCreate,
  PartyType,
  PartyUpdate,
  Supplier,
  SupplierCreate,
  SupplierUpdate,
  Uom,
  UomCreate,
  UomUpdate,
} from "./types";

const tables = {
  parties: "md_parties",
  addresses: "md_addresses",
  customers: "md_customers",
  suppliers: "md_suppliers",
  uoms: "md_uoms",
  items: "md_items",
} as const;

type BaseRow = {
  id: string;
  tenant_id: string;
  company_id: string | null;
  branch_id: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string | null;
};

type PartyRow = BaseRow & {
  party_number: string;
  party_type: PartyType;
  display_name: string;
  legal_name: string | null;
  tax_id: string | null;
  gstin: string | null;
  pan: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  status: MasterDataStatus;
  tags: string[] | null;
  custom_fields: Record<string, unknown> | null;
};

type AddressRow = BaseRow & {
  party_id: string;
  address_type: AddressType;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  gst_state_code: string | null;
  is_default_billing: boolean;
  is_default_shipping: boolean;
};

type CustomerRow = BaseRow & {
  party_id: string;
  customer_number: string;
  customer_group: string | null;
  credit_limit: string | number;
  payment_terms: string | null;
  currency: string;
  gst_treatment: string | null;
  receivable_account_id: string | null;
  status: MasterDataStatus;
};

type SupplierRow = BaseRow & {
  party_id: string;
  supplier_number: string;
  supplier_group: string | null;
  payment_terms: string | null;
  currency: string;
  gst_treatment: string | null;
  payable_account_id: string | null;
  rating: string | number | null;
  status: MasterDataStatus;
};

type UomRow = BaseRow & {
  code: string;
  name: string;
  category: string | null;
  precision: number;
  is_base: boolean;
  status: MasterDataStatus;
};

type ItemRow = BaseRow & {
  item_number: string;
  sku: string | null;
  name: string;
  description: string | null;
  item_type: ItemType;
  item_group: string | null;
  base_uom_id: string;
  sales_uom_id: string | null;
  purchase_uom_id: string | null;
  is_stock_item: boolean;
  is_sales_item: boolean;
  is_purchase_item: boolean;
  is_manufacturing_item: boolean;
  standard_cost: string | number | null;
  selling_price: string | number | null;
  currency: string;
  tax_category: string | null;
  hsn_sac_code: string | null;
  barcode: string | null;
  status: MasterDataStatus;
  tags: string[] | null;
  custom_fields: Record<string, unknown> | null;
};

const toIso = (value: Date | string | null | undefined) => {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : value;
};

const toNullable = <T>(value: T | undefined | null) => value ?? null;

const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));

const numberWithPrefix = (prefix: string, explicit?: string) => explicit ?? `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;

function base(row: BaseRow) {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    companyId: row.company_id ?? undefined,
    branchId: row.branch_id ?? undefined,
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
    deletedAt: toIso(row.deleted_at),
  };
}

export const mapPartyRow = (row: PartyRow): Party => ({
  ...base(row),
  partyNumber: row.party_number,
  partyType: row.party_type,
  displayName: row.display_name,
  legalName: row.legal_name ?? undefined,
  taxId: row.tax_id ?? undefined,
  gstin: row.gstin ?? undefined,
  pan: row.pan ?? undefined,
  email: row.email ?? undefined,
  phone: row.phone ?? undefined,
  website: row.website ?? undefined,
  status: row.status,
  tags: row.tags ?? [],
  customFields: row.custom_fields ?? {},
});

export const mapAddressRow = (row: AddressRow): Address => ({
  ...base(row),
  partyId: row.party_id,
  addressType: row.address_type,
  line1: row.line1,
  line2: row.line2 ?? undefined,
  city: row.city,
  state: row.state,
  postalCode: row.postal_code,
  country: row.country,
  gstStateCode: row.gst_state_code ?? undefined,
  isDefaultBilling: row.is_default_billing,
  isDefaultShipping: row.is_default_shipping,
});

export const mapCustomerRow = (row: CustomerRow): Customer => ({
  ...base(row),
  partyId: row.party_id,
  customerNumber: row.customer_number,
  customerGroup: row.customer_group ?? undefined,
  creditLimit: Number(row.credit_limit),
  paymentTerms: row.payment_terms ?? undefined,
  currency: row.currency,
  gstTreatment: row.gst_treatment ?? undefined,
  receivableAccountId: row.receivable_account_id ?? undefined,
  status: row.status,
});

export const mapSupplierRow = (row: SupplierRow): Supplier => ({
  ...base(row),
  partyId: row.party_id,
  supplierNumber: row.supplier_number,
  supplierGroup: row.supplier_group ?? undefined,
  paymentTerms: row.payment_terms ?? undefined,
  currency: row.currency,
  gstTreatment: row.gst_treatment ?? undefined,
  payableAccountId: row.payable_account_id ?? undefined,
  rating: row.rating == null ? undefined : Number(row.rating),
  status: row.status,
});

export const mapUomRow = (row: UomRow): Uom => ({
  ...base(row),
  code: row.code,
  name: row.name,
  category: row.category ?? undefined,
  precision: row.precision,
  isBase: row.is_base,
  status: row.status,
});

export const mapItemRow = (row: ItemRow): Item => ({
  ...base(row),
  itemNumber: row.item_number,
  sku: row.sku ?? undefined,
  name: row.name,
  description: row.description ?? undefined,
  itemType: row.item_type,
  itemGroup: row.item_group ?? undefined,
  baseUomId: row.base_uom_id,
  salesUomId: row.sales_uom_id ?? undefined,
  purchaseUomId: row.purchase_uom_id ?? undefined,
  isStockItem: row.is_stock_item,
  isSalesItem: row.is_sales_item,
  isPurchaseItem: row.is_purchase_item,
  isManufacturingItem: row.is_manufacturing_item,
  standardCost: row.standard_cost == null ? undefined : Number(row.standard_cost),
  sellingPrice: row.selling_price == null ? undefined : Number(row.selling_price),
  currency: row.currency,
  taxCategory: row.tax_category ?? undefined,
  hsnSacCode: row.hsn_sac_code ?? undefined,
  barcode: row.barcode ?? undefined,
  status: row.status,
  tags: row.tags ?? [],
  customFields: row.custom_fields ?? {},
});

function applyScope(query: Knex.QueryBuilder, request: Pick<ListRequest, "tenantId" | "companyId" | "branchId">) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}

function applyCommonFilters(query: Knex.QueryBuilder, request: ListRequest) {
  applyScope(query, request).whereNull("deleted_at");
  if (request.status) query.where("status", request.status);
  if (request.createdFrom) query.where("created_at", ">=", request.createdFrom);
  if (request.createdTo) query.where("created_at", "<=", request.createdTo);
  return query;
}

function applySearch(query: Knex.QueryBuilder, request: ListRequest, fields: string[]) {
  if (!request.search) return query;
  const search = `%${request.search}%`;
  query.andWhere((builder) => {
    for (const [index, field] of fields.entries()) {
      const method = index === 0 ? "whereILike" : "orWhereILike";
      builder[method](field, search);
    }
  });
  return query;
}

async function listRows<Row extends {}, Model>(
  connection: Knex,
  tableName: string,
  request: ListRequest,
  mapper: (row: Row) => Model,
  options: {
    searchFields: string[];
    sortAllowlist: Record<string, string>;
    defaultSort?: string;
    extraFilters?: (query: Knex.QueryBuilder) => void;
  },
) {
  const page = request.page ?? 1;
  const pageSize = request.pageSize ?? 25;
  const offset = (page - 1) * pageSize;
  const sortBy = options.sortAllowlist[request.sortBy ?? ""] ?? options.defaultSort ?? "created_at";
  const sortDirection = request.sortDirection ?? "desc";

  const build = (query: Knex.QueryBuilder) => {
    applySearch(applyCommonFilters(query, request), request, options.searchFields);
    options.extraFilters?.(query);
    return query;
  };

  const rowsQuery = build(connection<Row>(tableName).select("*")).orderBy(sortBy, sortDirection).limit(pageSize).offset(offset);
  const countQuery = build(connection<Row>(tableName).count<{ count: string }[]>({ count: "*" }));
  const [rows, countRows] = await Promise.all([rowsQuery, countQuery]);
  return {
    rows: rows.map(mapper),
    total: Number(countRows[0]?.count ?? 0),
    page,
    pageSize,
  };
}

export function createMasterDataRepository(database?: Knex): MasterDataRepository {
  const db = () => database ?? getTenantKnex();

  return {
    async createParty(input) {
      const [row] = await db()<PartyRow>(tables.parties)
        .insert({
          id: randomUUID(),
          tenant_id: input.tenantId,
          company_id: toNullable(input.companyId),
          branch_id: toNullable(input.branchId),
          party_number: numberWithPrefix("PARTY", input.partyNumber),
          party_type: input.partyType,
          display_name: input.displayName,
          legal_name: toNullable(input.legalName),
          tax_id: toNullable(input.taxId),
          gstin: toNullable(input.gstin),
          pan: toNullable(input.pan),
          email: toNullable(input.email),
          phone: toNullable(input.phone),
          website: toNullable(input.website),
          status: input.status ?? "ACTIVE",
          tags: input.tags ?? [],
          custom_fields: input.customFields ?? {},
        })
        .returning("*");
      return mapPartyRow(row);
    },
    async listParties(request) {
      return listRows<PartyRow, Party>(db(), tables.parties, request, mapPartyRow, {
        searchFields: ["party_number", "display_name", "legal_name", "email", "phone", "gstin", "pan"],
        sortAllowlist: { created_at: "created_at", updated_at: "updated_at", display_name: "display_name", party_number: "party_number" },
        extraFilters: (query) => {
          if (request.type) query.where("party_type", request.type);
        },
      });
    },
    async getPartyById(tenantId, id) {
      const row = await db()<PartyRow>(tables.parties).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? mapPartyRow(row) : undefined;
    },
    async getPartyByNumber(tenantId, partyNumber, companyId) {
      const query = db()<PartyRow>(tables.parties).where({ tenant_id: tenantId, party_number: partyNumber }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? mapPartyRow(row) : undefined;
    },
    async updateParty(tenantId, id, input) {
      const connection = db();
      const [row] = await connection<PartyRow>(tables.parties)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update(
          compact({
            company_id: input.companyId,
            branch_id: input.branchId,
            party_type: input.partyType,
            display_name: input.displayName,
            legal_name: input.legalName,
            tax_id: input.taxId,
            gstin: input.gstin,
            pan: input.pan,
            email: input.email,
            phone: input.phone,
            website: input.website,
            status: input.status,
            tags: input.tags,
            custom_fields: input.customFields,
            updated_at: connection.fn.now(),
          }),
        )
        .returning("*");
      return row ? mapPartyRow(row) : undefined;
    },
    async softDeleteParty(tenantId, id) {
      const connection = db();
      const [row] = await connection<PartyRow>(tables.parties)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() })
        .returning("*");
      return row ? mapPartyRow(row) : undefined;
    },
    async searchParties(request) {
      return this.listParties(request);
    },
    async createAddress(input) {
      const connection = db();
      const row = await connection.transaction(async (trx) => {
        if (input.isDefaultBilling) {
          await trx<AddressRow>(tables.addresses)
            .where({ tenant_id: input.tenantId, party_id: input.partyId })
            .whereNull("deleted_at")
            .update({ is_default_billing: false, updated_at: trx.fn.now() });
        }
        if (input.isDefaultShipping) {
          await trx<AddressRow>(tables.addresses)
            .where({ tenant_id: input.tenantId, party_id: input.partyId })
            .whereNull("deleted_at")
            .update({ is_default_shipping: false, updated_at: trx.fn.now() });
        }
        const [created] = await trx<AddressRow>(tables.addresses)
          .insert({
            id: randomUUID(),
            tenant_id: input.tenantId,
            company_id: toNullable(input.companyId),
            branch_id: toNullable(input.branchId),
            party_id: input.partyId,
            address_type: input.addressType,
            line1: input.line1,
            line2: toNullable(input.line2),
            city: input.city,
            state: input.state,
            postal_code: input.postalCode,
            country: input.country ?? "IN",
            gst_state_code: toNullable(input.gstStateCode),
            is_default_billing: input.isDefaultBilling ?? false,
            is_default_shipping: input.isDefaultShipping ?? false,
          })
          .returning("*");
        return created;
      });
      return mapAddressRow(row);
    },
    async listAddressesByParty(tenantId, partyId) {
      const rows = await db()<AddressRow>(tables.addresses)
        .where({ tenant_id: tenantId, party_id: partyId })
        .whereNull("deleted_at")
        .orderBy("created_at", "desc");
      return rows.map(mapAddressRow);
    },
    async updateAddress(tenantId, id, input) {
      const connection = db();
      const row = await connection.transaction(async (trx) => {
        const current = await trx<AddressRow>(tables.addresses).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
        if (!current) return undefined;
        if (input.isDefaultBilling) {
          await trx<AddressRow>(tables.addresses)
            .where({ tenant_id: tenantId, party_id: current.party_id })
            .whereNull("deleted_at")
            .update({ is_default_billing: false, updated_at: trx.fn.now() });
        }
        if (input.isDefaultShipping) {
          await trx<AddressRow>(tables.addresses)
            .where({ tenant_id: tenantId, party_id: current.party_id })
            .whereNull("deleted_at")
            .update({ is_default_shipping: false, updated_at: trx.fn.now() });
        }
        const [updated] = await trx<AddressRow>(tables.addresses)
          .where({ tenant_id: tenantId, id })
          .whereNull("deleted_at")
          .update(
            compact({
              company_id: input.companyId,
              branch_id: input.branchId,
              address_type: input.addressType,
              line1: input.line1,
              line2: input.line2,
              city: input.city,
              state: input.state,
              postal_code: input.postalCode,
              country: input.country,
              gst_state_code: input.gstStateCode,
              is_default_billing: input.isDefaultBilling,
              is_default_shipping: input.isDefaultShipping,
              updated_at: trx.fn.now(),
            }),
          )
          .returning("*");
        return updated;
      });
      return row ? mapAddressRow(row) : undefined;
    },
    async softDeleteAddress(tenantId, id) {
      const connection = db();
      const [row] = await connection<AddressRow>(tables.addresses)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() })
        .returning("*");
      return row ? mapAddressRow(row) : undefined;
    },
    async setDefaultBillingAddress(tenantId, id) {
      return this.updateAddress(tenantId, id, { isDefaultBilling: true });
    },
    async setDefaultShippingAddress(tenantId, id) {
      return this.updateAddress(tenantId, id, { isDefaultShipping: true });
    },
    async createCustomer(input) {
      const [row] = await db()<CustomerRow>(tables.customers)
        .insert({
          id: randomUUID(),
          tenant_id: input.tenantId,
          company_id: toNullable(input.companyId),
          branch_id: toNullable(input.branchId),
          party_id: input.partyId,
          customer_number: numberWithPrefix("CUST", input.customerNumber),
          customer_group: toNullable(input.customerGroup),
          credit_limit: input.creditLimit ?? 0,
          payment_terms: toNullable(input.paymentTerms),
          currency: input.currency ?? "INR",
          gst_treatment: toNullable(input.gstTreatment),
          receivable_account_id: toNullable(input.receivableAccountId),
          status: input.status ?? "ACTIVE",
        })
        .returning("*");
      return mapCustomerRow(row);
    },
    async listCustomers(request) {
      return listRows<CustomerRow, Customer>(db(), tables.customers, request, mapCustomerRow, {
        searchFields: ["customer_number", "customer_group", "payment_terms"],
        sortAllowlist: { created_at: "created_at", updated_at: "updated_at", customer_number: "customer_number" },
        extraFilters: (query) => {
          if (request.group) query.where("customer_group", request.group);
        },
      });
    },
    async getCustomerById(tenantId, id) {
      const row = await db()<CustomerRow>(tables.customers).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? mapCustomerRow(row) : undefined;
    },
    async getCustomerByNumber(tenantId, customerNumber, companyId) {
      const query = db()<CustomerRow>(tables.customers).where({ tenant_id: tenantId, customer_number: customerNumber }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? mapCustomerRow(row) : undefined;
    },
    async updateCustomer(tenantId, id, input) {
      const connection = db();
      const [row] = await connection<CustomerRow>(tables.customers)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update(
          compact({
            company_id: input.companyId,
            branch_id: input.branchId,
            customer_group: input.customerGroup,
            credit_limit: input.creditLimit,
            payment_terms: input.paymentTerms,
            currency: input.currency,
            gst_treatment: input.gstTreatment,
            receivable_account_id: input.receivableAccountId,
            status: input.status,
            updated_at: connection.fn.now(),
          }),
        )
        .returning("*");
      return row ? mapCustomerRow(row) : undefined;
    },
    async softDeleteCustomer(tenantId, id) {
      const connection = db();
      const [row] = await connection<CustomerRow>(tables.customers)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() })
        .returning("*");
      return row ? mapCustomerRow(row) : undefined;
    },
    async searchCustomers(request) {
      return this.listCustomers(request);
    },
    async createSupplier(input) {
      const [row] = await db()<SupplierRow>(tables.suppliers)
        .insert({
          id: randomUUID(),
          tenant_id: input.tenantId,
          company_id: toNullable(input.companyId),
          branch_id: toNullable(input.branchId),
          party_id: input.partyId,
          supplier_number: numberWithPrefix("SUP", input.supplierNumber),
          supplier_group: toNullable(input.supplierGroup),
          payment_terms: toNullable(input.paymentTerms),
          currency: input.currency ?? "INR",
          gst_treatment: toNullable(input.gstTreatment),
          payable_account_id: toNullable(input.payableAccountId),
          rating: toNullable(input.rating),
          status: input.status ?? "ACTIVE",
        })
        .returning("*");
      return mapSupplierRow(row);
    },
    async listSuppliers(request) {
      return listRows<SupplierRow, Supplier>(db(), tables.suppliers, request, mapSupplierRow, {
        searchFields: ["supplier_number", "supplier_group", "payment_terms"],
        sortAllowlist: { created_at: "created_at", updated_at: "updated_at", supplier_number: "supplier_number", rating: "rating" },
        extraFilters: (query) => {
          if (request.group) query.where("supplier_group", request.group);
        },
      });
    },
    async getSupplierById(tenantId, id) {
      const row = await db()<SupplierRow>(tables.suppliers).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? mapSupplierRow(row) : undefined;
    },
    async getSupplierByNumber(tenantId, supplierNumber, companyId) {
      const query = db()<SupplierRow>(tables.suppliers).where({ tenant_id: tenantId, supplier_number: supplierNumber }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? mapSupplierRow(row) : undefined;
    },
    async updateSupplier(tenantId, id, input) {
      const connection = db();
      const [row] = await connection<SupplierRow>(tables.suppliers)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update(
          compact({
            company_id: input.companyId,
            branch_id: input.branchId,
            supplier_group: input.supplierGroup,
            payment_terms: input.paymentTerms,
            currency: input.currency,
            gst_treatment: input.gstTreatment,
            payable_account_id: input.payableAccountId,
            rating: input.rating,
            status: input.status,
            updated_at: connection.fn.now(),
          }),
        )
        .returning("*");
      return row ? mapSupplierRow(row) : undefined;
    },
    async softDeleteSupplier(tenantId, id) {
      const connection = db();
      const [row] = await connection<SupplierRow>(tables.suppliers)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() })
        .returning("*");
      return row ? mapSupplierRow(row) : undefined;
    },
    async searchSuppliers(request) {
      return this.listSuppliers(request);
    },
    async createUom(input) {
      const [row] = await db()<UomRow>(tables.uoms)
        .insert({
          id: randomUUID(),
          tenant_id: input.tenantId,
          company_id: toNullable(input.companyId),
          branch_id: toNullable(input.branchId),
          code: input.code.toUpperCase(),
          name: input.name,
          category: toNullable(input.category),
          precision: input.precision ?? 0,
          is_base: input.isBase ?? false,
          status: input.status ?? "ACTIVE",
        })
        .returning("*");
      return mapUomRow(row);
    },
    async listUoms(request) {
      return listRows<UomRow, Uom>(db(), tables.uoms, request, mapUomRow, {
        searchFields: ["code", "name", "category"],
        sortAllowlist: { created_at: "created_at", updated_at: "updated_at", code: "code", name: "name" },
        defaultSort: "code",
        extraFilters: (query) => {
          if (request.group) query.where("category", request.group);
        },
      });
    },
    async getUomById(tenantId, id) {
      const row = await db()<UomRow>(tables.uoms).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? mapUomRow(row) : undefined;
    },
    async getUomByCode(tenantId, code, companyId) {
      const query = db()<UomRow>(tables.uoms).where({ tenant_id: tenantId, code: code.toUpperCase() }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? mapUomRow(row) : undefined;
    },
    async updateUom(tenantId, id, input) {
      const connection = db();
      const [row] = await connection<UomRow>(tables.uoms)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update(
          compact({
            company_id: input.companyId,
            branch_id: input.branchId,
            name: input.name,
            category: input.category,
            precision: input.precision,
            is_base: input.isBase,
            status: input.status,
            updated_at: connection.fn.now(),
          }),
        )
        .returning("*");
      return row ? mapUomRow(row) : undefined;
    },
    async softDeleteUom(tenantId, id) {
      const connection = db();
      const [row] = await connection<UomRow>(tables.uoms)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() })
        .returning("*");
      return row ? mapUomRow(row) : undefined;
    },
    async createItem(input) {
      const [row] = await db()<ItemRow>(tables.items)
        .insert({
          id: randomUUID(),
          tenant_id: input.tenantId,
          company_id: toNullable(input.companyId),
          branch_id: toNullable(input.branchId),
          item_number: numberWithPrefix("ITEM", input.itemNumber),
          sku: toNullable(input.sku),
          name: input.name,
          description: toNullable(input.description),
          item_type: input.itemType,
          item_group: toNullable(input.itemGroup),
          base_uom_id: input.baseUomId,
          sales_uom_id: toNullable(input.salesUomId),
          purchase_uom_id: toNullable(input.purchaseUomId),
          is_stock_item: input.isStockItem ?? true,
          is_sales_item: input.isSalesItem ?? true,
          is_purchase_item: input.isPurchaseItem ?? true,
          is_manufacturing_item: input.isManufacturingItem ?? false,
          standard_cost: toNullable(input.standardCost),
          selling_price: toNullable(input.sellingPrice),
          currency: input.currency ?? "INR",
          tax_category: toNullable(input.taxCategory),
          hsn_sac_code: toNullable(input.hsnSacCode),
          barcode: toNullable(input.barcode),
          status: input.status ?? "ACTIVE",
          tags: input.tags ?? [],
          custom_fields: input.customFields ?? {},
        })
        .returning("*");
      return mapItemRow(row);
    },
    async listItems(request) {
      return listRows<ItemRow, Item>(db(), tables.items, request, mapItemRow, {
        searchFields: ["item_number", "sku", "name", "description", "item_group", "hsn_sac_code", "barcode"],
        sortAllowlist: { created_at: "created_at", updated_at: "updated_at", item_number: "item_number", name: "name", selling_price: "selling_price" },
        extraFilters: (query) => {
          if (request.type) query.where("item_type", request.type);
          if (request.group) query.where("item_group", request.group);
        },
      });
    },
    async getItemById(tenantId, id) {
      const row = await db()<ItemRow>(tables.items).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first();
      return row ? mapItemRow(row) : undefined;
    },
    async getItemByNumber(tenantId, itemNumber, companyId) {
      const query = db()<ItemRow>(tables.items).where({ tenant_id: tenantId, item_number: itemNumber }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? mapItemRow(row) : undefined;
    },
    async getItemBySku(tenantId, sku, companyId) {
      const query = db()<ItemRow>(tables.items).where({ tenant_id: tenantId, sku }).whereNull("deleted_at");
      if (companyId) query.where("company_id", companyId);
      const row = await query.first();
      return row ? mapItemRow(row) : undefined;
    },
    async updateItem(tenantId, id, input) {
      const connection = db();
      const [row] = await connection<ItemRow>(tables.items)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update(
          compact({
            company_id: input.companyId,
            branch_id: input.branchId,
            sku: input.sku,
            name: input.name,
            description: input.description,
            item_type: input.itemType,
            item_group: input.itemGroup,
            base_uom_id: input.baseUomId,
            sales_uom_id: input.salesUomId,
            purchase_uom_id: input.purchaseUomId,
            is_stock_item: input.isStockItem,
            is_sales_item: input.isSalesItem,
            is_purchase_item: input.isPurchaseItem,
            is_manufacturing_item: input.isManufacturingItem,
            standard_cost: input.standardCost,
            selling_price: input.sellingPrice,
            currency: input.currency,
            tax_category: input.taxCategory,
            hsn_sac_code: input.hsnSacCode,
            barcode: input.barcode,
            status: input.status,
            tags: input.tags,
            custom_fields: input.customFields,
            updated_at: connection.fn.now(),
          }),
        )
        .returning("*");
      return row ? mapItemRow(row) : undefined;
    },
    async softDeleteItem(tenantId, id) {
      const connection = db();
      const [row] = await connection<ItemRow>(tables.items)
        .where({ tenant_id: tenantId, id })
        .whereNull("deleted_at")
        .update({ deleted_at: connection.fn.now(), updated_at: connection.fn.now() })
        .returning("*");
      return row ? mapItemRow(row) : undefined;
    },
    async searchItems(request) {
      return this.listItems(request);
    },
    async getItemStats(tenantId) {
      const rows = await db()<ItemRow>(tables.items).where({ tenant_id: tenantId }).whereNull("deleted_at").select("status", "item_type", "is_stock_item");
      const byStatus: ItemStats["byStatus"] = { ACTIVE: 0, INACTIVE: 0, BLOCKED: 0 };
      for (const row of rows) byStatus[row.status] += 1;
      return {
        total: rows.length,
        byStatus,
        stockItems: rows.filter((row) => row.is_stock_item).length,
        serviceItems: rows.filter((row) => row.item_type === "SERVICE").length,
      };
    },
  };
}

export const masterDataRepository = createMasterDataRepository();
