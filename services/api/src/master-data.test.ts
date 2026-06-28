import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import { createMasterDataService } from "../../../modules/master-data/foundation/service";
import type {
  Address,
  AddressCreate,
  AddressUpdate,
  Customer,
  CustomerCreate,
  CustomerUpdate,
  Item,
  ItemCreate,
  ItemStats,
  ItemUpdate,
  ListRequest,
  MasterDataRepository,
  MasterDataStatus,
  Party,
  PartyCreate,
  PartyUpdate,
  Supplier,
  SupplierCreate,
  SupplierUpdate,
  Uom,
  UomCreate,
  UomUpdate,
} from "../../../modules/master-data/foundation/types";
import { createApiService } from "./index";

const context = {
  tenantId: "tenant-a",
  actorId: "user-a",
  roles: ["admin"],
  permissions: ["*"],
};

function createFakeRepository(): MasterDataRepository {
  const parties = new Map<string, Party>();
  const addresses = new Map<string, Address>();
  const customers = new Map<string, Customer>();
  const suppliers = new Map<string, Supplier>();
  const uoms = new Map<string, Uom>();
  const items = new Map<string, Item>();
  const now = () => new Date().toISOString();
  const stamp = () => ({ createdAt: now(), updatedAt: now() });
  const page = <T>(rows: T[], request: ListRequest) => ({ rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 });
  const active = <T extends { tenantId: string; deletedAt?: string }>(map: Map<string, T>, tenantId: string) =>
    [...map.values()].filter((record) => record.tenantId === tenantId && !record.deletedAt);
  const search = <T>(rows: T[], term: string | undefined, fields: Array<keyof T>) => {
    if (!term) return rows;
    const lowered = term.toLowerCase();
    return rows.filter((row) => fields.some((field) => String(row[field] ?? "").toLowerCase().includes(lowered)));
  };
  const deleted = <T extends { updatedAt: string; deletedAt?: string }>(record: T) => ({ ...record, deletedAt: now(), updatedAt: now() });

  return {
    async createParty(input: PartyCreate) {
      const record: Party = {
        ...input,
        id: `party-${parties.size + 1}`,
        partyNumber: input.partyNumber ?? `PARTY-${parties.size + 1}`,
        status: input.status ?? "ACTIVE",
        tags: input.tags ?? [],
        customFields: input.customFields ?? {},
        ...stamp(),
      };
      parties.set(record.id, record);
      return record;
    },
    async listParties(request) {
      let rows = active(parties, request.tenantId);
      if (request.status) rows = rows.filter((row) => row.status === request.status);
      if (request.type) rows = rows.filter((row) => row.partyType === request.type);
      return page(search(rows, request.search, ["partyNumber", "displayName", "email", "phone"]), request);
    },
    async getPartyById(tenantId, id) {
      return active(parties, tenantId).find((record) => record.id === id);
    },
    async getPartyByNumber(tenantId, partyNumber) {
      return active(parties, tenantId).find((record) => record.partyNumber === partyNumber);
    },
    async updateParty(tenantId, id, input: PartyUpdate) {
      const current = await this.getPartyById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, ...input, updatedAt: now() };
      parties.set(id, updated);
      return updated;
    },
    async softDeleteParty(tenantId, id) {
      const current = await this.getPartyById(tenantId, id);
      if (!current) return undefined;
      const record = deleted(current);
      parties.set(id, record);
      return record;
    },
    async searchParties(request) {
      return this.listParties(request);
    },
    async createAddress(input: AddressCreate) {
      const record: Address = {
        ...input,
        id: `address-${addresses.size + 1}`,
        country: input.country ?? "IN",
        isDefaultBilling: input.isDefaultBilling ?? false,
        isDefaultShipping: input.isDefaultShipping ?? false,
        ...stamp(),
      };
      addresses.set(record.id, record);
      return record;
    },
    async listAddressesByParty(tenantId, partyId) {
      return active(addresses, tenantId).filter((record) => record.partyId === partyId);
    },
    async updateAddress(tenantId, id, input: AddressUpdate) {
      const current = active(addresses, tenantId).find((record) => record.id === id);
      if (!current) return undefined;
      const updated = { ...current, ...input, updatedAt: now() };
      addresses.set(id, updated);
      return updated;
    },
    async softDeleteAddress(tenantId, id) {
      const current = active(addresses, tenantId).find((record) => record.id === id);
      if (!current) return undefined;
      const record = deleted(current);
      addresses.set(id, record);
      return record;
    },
    async setDefaultBillingAddress(tenantId, id) {
      return this.updateAddress(tenantId, id, { isDefaultBilling: true });
    },
    async setDefaultShippingAddress(tenantId, id) {
      return this.updateAddress(tenantId, id, { isDefaultShipping: true });
    },
    async createCustomer(input: CustomerCreate) {
      const record: Customer = {
        ...input,
        id: `customer-${customers.size + 1}`,
        customerNumber: input.customerNumber ?? `CUST-${customers.size + 1}`,
        creditLimit: input.creditLimit ?? 0,
        currency: input.currency ?? "INR",
        status: input.status ?? "ACTIVE",
        ...stamp(),
      };
      customers.set(record.id, record);
      return record;
    },
    async listCustomers(request) {
      let rows = active(customers, request.tenantId);
      if (request.status) rows = rows.filter((row) => row.status === request.status);
      return page(search(rows, request.search, ["customerNumber", "customerGroup"]), request);
    },
    async getCustomerById(tenantId, id) {
      return active(customers, tenantId).find((record) => record.id === id);
    },
    async getCustomerByNumber(tenantId, customerNumber) {
      return active(customers, tenantId).find((record) => record.customerNumber === customerNumber);
    },
    async updateCustomer(tenantId, id, input: CustomerUpdate) {
      const current = await this.getCustomerById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, ...input, updatedAt: now() };
      customers.set(id, updated);
      return updated;
    },
    async softDeleteCustomer(tenantId, id) {
      const current = await this.getCustomerById(tenantId, id);
      if (!current) return undefined;
      const record = deleted(current);
      customers.set(id, record);
      return record;
    },
    async searchCustomers(request) {
      return this.listCustomers(request);
    },
    async createSupplier(input: SupplierCreate) {
      const record: Supplier = {
        ...input,
        id: `supplier-${suppliers.size + 1}`,
        supplierNumber: input.supplierNumber ?? `SUP-${suppliers.size + 1}`,
        currency: input.currency ?? "INR",
        status: input.status ?? "ACTIVE",
        ...stamp(),
      };
      suppliers.set(record.id, record);
      return record;
    },
    async listSuppliers(request) {
      let rows = active(suppliers, request.tenantId);
      if (request.status) rows = rows.filter((row) => row.status === request.status);
      return page(search(rows, request.search, ["supplierNumber", "supplierGroup"]), request);
    },
    async getSupplierById(tenantId, id) {
      return active(suppliers, tenantId).find((record) => record.id === id);
    },
    async getSupplierByNumber(tenantId, supplierNumber) {
      return active(suppliers, tenantId).find((record) => record.supplierNumber === supplierNumber);
    },
    async updateSupplier(tenantId, id, input: SupplierUpdate) {
      const current = await this.getSupplierById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, ...input, updatedAt: now() };
      suppliers.set(id, updated);
      return updated;
    },
    async softDeleteSupplier(tenantId, id) {
      const current = await this.getSupplierById(tenantId, id);
      if (!current) return undefined;
      const record = deleted(current);
      suppliers.set(id, record);
      return record;
    },
    async searchSuppliers(request) {
      return this.listSuppliers(request);
    },
    async createUom(input: UomCreate) {
      const record: Uom = {
        ...input,
        id: `uom-${uoms.size + 1}`,
        precision: input.precision ?? 0,
        isBase: input.isBase ?? false,
        status: input.status ?? "ACTIVE",
        ...stamp(),
      };
      uoms.set(record.id, record);
      return record;
    },
    async listUoms(request) {
      let rows = active(uoms, request.tenantId);
      if (request.status) rows = rows.filter((row) => row.status === request.status);
      return page(search(rows, request.search, ["code", "name", "category"]), request);
    },
    async getUomById(tenantId, id) {
      return active(uoms, tenantId).find((record) => record.id === id);
    },
    async getUomByCode(tenantId, code) {
      return active(uoms, tenantId).find((record) => record.code === code);
    },
    async updateUom(tenantId, id, input: UomUpdate) {
      const current = await this.getUomById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, ...input, updatedAt: now() };
      uoms.set(id, updated);
      return updated;
    },
    async softDeleteUom(tenantId, id) {
      const current = await this.getUomById(tenantId, id);
      if (!current) return undefined;
      const record = deleted(current);
      uoms.set(id, record);
      return record;
    },
    async createItem(input: ItemCreate) {
      const record: Item = {
        ...input,
        id: `item-${items.size + 1}`,
        itemNumber: input.itemNumber ?? `ITEM-${items.size + 1}`,
        isStockItem: input.isStockItem ?? true,
        isSalesItem: input.isSalesItem ?? true,
        isPurchaseItem: input.isPurchaseItem ?? true,
        isManufacturingItem: input.isManufacturingItem ?? false,
        currency: input.currency ?? "INR",
        status: input.status ?? "ACTIVE",
        tags: input.tags ?? [],
        customFields: input.customFields ?? {},
        ...stamp(),
      };
      items.set(record.id, record);
      return record;
    },
    async listItems(request) {
      let rows = active(items, request.tenantId);
      if (request.status) rows = rows.filter((row) => row.status === request.status);
      if (request.type) rows = rows.filter((row) => row.itemType === request.type);
      return page(search(rows, request.search, ["itemNumber", "sku", "name", "itemGroup"]), request);
    },
    async getItemById(tenantId, id) {
      return active(items, tenantId).find((record) => record.id === id);
    },
    async getItemByNumber(tenantId, itemNumber) {
      return active(items, tenantId).find((record) => record.itemNumber === itemNumber);
    },
    async getItemBySku(tenantId, sku) {
      return active(items, tenantId).find((record) => record.sku === sku);
    },
    async updateItem(tenantId, id, input: ItemUpdate) {
      const current = await this.getItemById(tenantId, id);
      if (!current) return undefined;
      const updated = { ...current, ...input, updatedAt: now() };
      items.set(id, updated);
      return updated;
    },
    async softDeleteItem(tenantId, id) {
      const current = await this.getItemById(tenantId, id);
      if (!current) return undefined;
      const record = deleted(current);
      items.set(id, record);
      return record;
    },
    async searchItems(request) {
      return this.listItems(request);
    },
    async getItemStats(tenantId): Promise<ItemStats> {
      const rows = active(items, tenantId);
      const byStatus: Record<MasterDataStatus, number> = { ACTIVE: 0, INACTIVE: 0, BLOCKED: 0 };
      for (const row of rows) byStatus[row.status] += 1;
      return {
        total: rows.length,
        byStatus,
        stockItems: rows.filter((row) => row.isStockItem).length,
        serviceItems: rows.filter((row) => row.itemType === "SERVICE").length,
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

describe("master data foundation service", () => {
  it("creates linked parties, customers, suppliers, UOMs, and items", async () => {
    const service = createMasterDataService(createFakeRepository());
    const party = await service.createParty({ tenantId: context.tenantId, partyType: "COMPANY", displayName: "Acme Industries" }, context);
    const customer = await service.createCustomer({ tenantId: context.tenantId, partyId: party.id, customerGroup: "B2B" }, context);
    const supplier = await service.createSupplier({ tenantId: context.tenantId, partyId: party.id, supplierGroup: "Raw material" }, context);
    const uom = await service.createUom({ tenantId: context.tenantId, code: "NOS", name: "Numbers", isBase: true }, context);
    const item = await service.createItem({ tenantId: context.tenantId, name: "Finished pump", itemType: "FINISHED_GOOD", baseUomId: uom.id }, context);

    expect(customer.partyId).toBe(party.id);
    expect(supplier.partyId).toBe(party.id);
    expect(item.baseUomId).toBe(uom.id);
    expect((await service.listItems({ tenantId: context.tenantId, search: "pump" }, context)).total).toBe(1);
    await expect(service.createItem({ tenantId: context.tenantId, name: "Bad item", itemType: "PRODUCT", baseUomId: "missing" }, context)).rejects.toThrow("Base UOM");
  });
});

describe("master data foundation API routes", () => {
  it("serves core create, list, detail, update, address, stats, and delete endpoints", async () => {
    const service = createMasterDataService(createFakeRepository());
    server = createApiService({ masterData: service });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    const baseUrl = `http://127.0.0.1:${port}`;
    const headers = { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*" };

    const party = await fetch(`${baseUrl}/api/master-data/parties`, {
      method: "POST",
      headers,
      body: JSON.stringify({ partyType: "COMPANY", displayName: "Blue Steel Pvt Ltd", email: "ops@example.com" }),
    }).then((response) => response.json() as Promise<Party>);
    expect(party.displayName).toBe("Blue Steel Pvt Ltd");

    expect(await fetch(`${baseUrl}/api/master-data/parties`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/master-data/parties/${party.id}`, { headers }).then((response) => response.status)).toBe(200);
    expect(
      await fetch(`${baseUrl}/api/master-data/parties/${party.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ phone: "+919999999999" }),
      }).then((response) => response.status),
    ).toBe(200);

    expect(
      await fetch(`${baseUrl}/api/master-data/parties/${party.id}/addresses`, {
        method: "POST",
        headers,
        body: JSON.stringify({ addressType: "REGISTERED", line1: "MG Road", city: "Bengaluru", state: "KA", postalCode: "560001" }),
      }).then((response) => response.status),
    ).toBe(201);
    expect(await fetch(`${baseUrl}/api/master-data/parties/${party.id}/addresses`, { headers }).then((response) => response.status)).toBe(200);

    const customer = await fetch(`${baseUrl}/api/master-data/customers`, {
      method: "POST",
      headers,
      body: JSON.stringify({ partyId: party.id, customerGroup: "Enterprise" }),
    }).then((response) => response.json() as Promise<Customer>);
    expect(customer.customerNumber).toContain("CUST");

    const uom = await fetch(`${baseUrl}/api/master-data/uoms`, {
      method: "POST",
      headers,
      body: JSON.stringify({ code: "kg", name: "Kilogram", category: "Weight" }),
    }).then((response) => response.json() as Promise<Uom>);
    expect(uom.code).toBe("KG");

    const item = await fetch(`${baseUrl}/api/master-data/items`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name: "Steel coil", itemType: "RAW_MATERIAL", baseUomId: uom.id, sku: "STEEL-COIL" }),
    }).then((response) => response.json() as Promise<Item>);
    expect(item.sku).toBe("STEEL-COIL");
    expect(await fetch(`${baseUrl}/api/master-data/items/stats`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/master-data/items/${item.id}`, { method: "DELETE", headers }).then((response) => response.status)).toBe(200);
  });
});
