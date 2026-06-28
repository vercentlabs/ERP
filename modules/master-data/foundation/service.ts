import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { createAuditEvent } from "./audit";
import { permissions } from "./permissions";
import { masterDataRepository } from "./repository";
import {
  addressCreateSchema,
  addressUpdateSchema,
  customerCreateSchema,
  customerUpdateSchema,
  itemCreateSchema,
  itemUpdateSchema,
  listSchema,
  partyCreateSchema,
  partyUpdateSchema,
  supplierCreateSchema,
  supplierUpdateSchema,
  uomCreateSchema,
  uomUpdateSchema,
} from "./schemas";
import type {
  Address,
  AddressCreate,
  AddressUpdate,
  Customer,
  CustomerCreate,
  CustomerUpdate,
  Item,
  ItemCreate,
  ItemUpdate,
  ListRequest,
  MasterDataContext,
  MasterDataRepository,
  Party,
  PartyCreate,
  PartyUpdate,
  Supplier,
  SupplierCreate,
  SupplierUpdate,
  Uom,
  UomCreate,
  UomUpdate,
} from "./types";

type EventName = Parameters<typeof createAuditEvent>[0];

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

const assertPermission = (context: MasterDataContext, permission: string, record?: { tenantId: string; companyId?: string; branchId?: string }) => {
  assertAllowed(evaluatePolicy({ actor: context, permission, record }));
};

const assertFound = <T>(record: T | undefined, label: string) => {
  if (!record) throw new Error(`${label} was not found`);
  return record;
};

function audit(type: EventName, tenantId: string, id: string, context: MasterDataContext) {
  createAuditEvent(type, tenantId, id, context.actorId);
}

export function createMasterDataService(repository: MasterDataRepository = masterDataRepository) {
  async function assertPartyExists(tenantId: string, partyId: string) {
    return assertFound(await repository.getPartyById(tenantId, partyId), "Party");
  }

  async function assertUomExists(tenantId: string, uomId: string, label: string) {
    return assertFound(await repository.getUomById(tenantId, uomId), label);
  }

  async function assertItemUoms(input: Pick<ItemCreate | ItemUpdate, "baseUomId" | "salesUomId" | "purchaseUomId"> & { tenantId?: string }, tenantId: string) {
    if (input.baseUomId) await assertUomExists(tenantId, input.baseUomId, "Base UOM");
    if (input.salesUomId) await assertUomExists(tenantId, input.salesUomId, "Sales UOM");
    if (input.purchaseUomId) await assertUomExists(tenantId, input.purchaseUomId, "Purchase UOM");
  }

  return {
    async listParties(input: unknown, context: MasterDataContext) {
      const parsed = listSchema.parse(input) as ListRequest;
      assertPermission(context, permissions.view);
      return repository.listParties(parsed);
    },
    async getParty(tenantId: string, id: string, context: MasterDataContext) {
      const party = assertFound(await repository.getPartyById(tenantId, id), "Party");
      assertPermission(context, permissions.view, party);
      return party;
    },
    async createParty(input: unknown, context: MasterDataContext): Promise<Party> {
      const parsed = partyCreateSchema.parse(input) as PartyCreate;
      assertPermission(context, permissions.create);
      const created = await repository.createParty(parsed);
      audit("partyCreated", created.tenantId, created.id, context);
      return created;
    },
    async updateParty(tenantId: string, id: string, input: unknown, context: MasterDataContext): Promise<Party> {
      const current = assertFound(await repository.getPartyById(tenantId, id), "Party");
      assertPermission(context, permissions.update, current);
      const parsed = partyUpdateSchema.parse(input) as PartyUpdate;
      const updated = assertFound(await repository.updateParty(tenantId, id, parsed), "Party");
      audit("partyUpdated", tenantId, id, context);
      return updated;
    },
    async deleteParty(tenantId: string, id: string, context: MasterDataContext): Promise<Party> {
      const current = assertFound(await repository.getPartyById(tenantId, id), "Party");
      assertPermission(context, permissions.delete, current);
      const deleted = assertFound(await repository.softDeleteParty(tenantId, id), "Party");
      audit("partyDeleted", tenantId, id, context);
      return deleted;
    },
    async listAddresses(tenantId: string, partyId: string, context: MasterDataContext) {
      const party = await assertPartyExists(tenantId, partyId);
      assertPermission(context, permissions.view, party);
      return repository.listAddressesByParty(tenantId, partyId);
    },
    async createAddress(input: unknown, context: MasterDataContext): Promise<Address> {
      const parsed = addressCreateSchema.parse(input) as AddressCreate;
      const party = await assertPartyExists(parsed.tenantId, parsed.partyId);
      assertPermission(context, permissions.update, party);
      const created = await repository.createAddress(parsed);
      audit("addressCreated", created.tenantId, created.id, context);
      return created;
    },
    async updateAddress(tenantId: string, id: string, input: unknown, context: MasterDataContext): Promise<Address> {
      const parsed = addressUpdateSchema.parse(input) as AddressUpdate;
      assertPermission(context, permissions.update);
      const updated = assertFound(await repository.updateAddress(tenantId, id, parsed), "Address");
      audit("addressUpdated", tenantId, id, context);
      return updated;
    },
    async deleteAddress(tenantId: string, id: string, context: MasterDataContext): Promise<Address> {
      assertPermission(context, permissions.delete);
      const deleted = assertFound(await repository.softDeleteAddress(tenantId, id), "Address");
      audit("addressDeleted", tenantId, id, context);
      return deleted;
    },
    async setDefaultBillingAddress(tenantId: string, id: string, context: MasterDataContext): Promise<Address> {
      assertPermission(context, permissions.update);
      return assertFound(await repository.setDefaultBillingAddress(tenantId, id), "Address");
    },
    async setDefaultShippingAddress(tenantId: string, id: string, context: MasterDataContext): Promise<Address> {
      assertPermission(context, permissions.update);
      return assertFound(await repository.setDefaultShippingAddress(tenantId, id), "Address");
    },
    async listCustomers(input: unknown, context: MasterDataContext) {
      const parsed = listSchema.parse(input) as ListRequest;
      assertPermission(context, permissions.view);
      return repository.listCustomers(parsed);
    },
    async getCustomer(tenantId: string, id: string, context: MasterDataContext) {
      const customer = assertFound(await repository.getCustomerById(tenantId, id), "Customer");
      assertPermission(context, permissions.view, customer);
      return customer;
    },
    async createCustomer(input: unknown, context: MasterDataContext): Promise<Customer> {
      const parsed = customerCreateSchema.parse(input) as CustomerCreate;
      await assertPartyExists(parsed.tenantId, parsed.partyId);
      assertPermission(context, permissions.create);
      const created = await repository.createCustomer(parsed);
      audit("customerCreated", created.tenantId, created.id, context);
      return created;
    },
    async updateCustomer(tenantId: string, id: string, input: unknown, context: MasterDataContext): Promise<Customer> {
      const current = assertFound(await repository.getCustomerById(tenantId, id), "Customer");
      assertPermission(context, permissions.update, current);
      const parsed = customerUpdateSchema.parse(input) as CustomerUpdate;
      const updated = assertFound(await repository.updateCustomer(tenantId, id, parsed), "Customer");
      audit("customerUpdated", tenantId, id, context);
      return updated;
    },
    async deleteCustomer(tenantId: string, id: string, context: MasterDataContext): Promise<Customer> {
      const current = assertFound(await repository.getCustomerById(tenantId, id), "Customer");
      assertPermission(context, permissions.delete, current);
      const deleted = assertFound(await repository.softDeleteCustomer(tenantId, id), "Customer");
      audit("customerDeleted", tenantId, id, context);
      return deleted;
    },
    async listSuppliers(input: unknown, context: MasterDataContext) {
      const parsed = listSchema.parse(input) as ListRequest;
      assertPermission(context, permissions.view);
      return repository.listSuppliers(parsed);
    },
    async getSupplier(tenantId: string, id: string, context: MasterDataContext) {
      const supplier = assertFound(await repository.getSupplierById(tenantId, id), "Supplier");
      assertPermission(context, permissions.view, supplier);
      return supplier;
    },
    async createSupplier(input: unknown, context: MasterDataContext): Promise<Supplier> {
      const parsed = supplierCreateSchema.parse(input) as SupplierCreate;
      await assertPartyExists(parsed.tenantId, parsed.partyId);
      assertPermission(context, permissions.create);
      const created = await repository.createSupplier(parsed);
      audit("supplierCreated", created.tenantId, created.id, context);
      return created;
    },
    async updateSupplier(tenantId: string, id: string, input: unknown, context: MasterDataContext): Promise<Supplier> {
      const current = assertFound(await repository.getSupplierById(tenantId, id), "Supplier");
      assertPermission(context, permissions.update, current);
      const parsed = supplierUpdateSchema.parse(input) as SupplierUpdate;
      const updated = assertFound(await repository.updateSupplier(tenantId, id, parsed), "Supplier");
      audit("supplierUpdated", tenantId, id, context);
      return updated;
    },
    async deleteSupplier(tenantId: string, id: string, context: MasterDataContext): Promise<Supplier> {
      const current = assertFound(await repository.getSupplierById(tenantId, id), "Supplier");
      assertPermission(context, permissions.delete, current);
      const deleted = assertFound(await repository.softDeleteSupplier(tenantId, id), "Supplier");
      audit("supplierDeleted", tenantId, id, context);
      return deleted;
    },
    async listUoms(input: unknown, context: MasterDataContext) {
      const parsed = listSchema.parse(input) as ListRequest;
      assertPermission(context, permissions.view);
      return repository.listUoms(parsed);
    },
    async getUom(tenantId: string, id: string, context: MasterDataContext) {
      const uom = assertFound(await repository.getUomById(tenantId, id), "UOM");
      assertPermission(context, permissions.view, uom);
      return uom;
    },
    async createUom(input: unknown, context: MasterDataContext): Promise<Uom> {
      const parsed = uomCreateSchema.parse(input) as UomCreate;
      assertPermission(context, permissions.create);
      const created = await repository.createUom(parsed);
      audit("uomCreated", created.tenantId, created.id, context);
      return created;
    },
    async updateUom(tenantId: string, id: string, input: unknown, context: MasterDataContext): Promise<Uom> {
      const current = assertFound(await repository.getUomById(tenantId, id), "UOM");
      assertPermission(context, permissions.update, current);
      const parsed = uomUpdateSchema.parse(input) as UomUpdate;
      const updated = assertFound(await repository.updateUom(tenantId, id, parsed), "UOM");
      audit("uomUpdated", tenantId, id, context);
      return updated;
    },
    async deleteUom(tenantId: string, id: string, context: MasterDataContext): Promise<Uom> {
      const current = assertFound(await repository.getUomById(tenantId, id), "UOM");
      assertPermission(context, permissions.delete, current);
      const deleted = assertFound(await repository.softDeleteUom(tenantId, id), "UOM");
      audit("uomDeleted", tenantId, id, context);
      return deleted;
    },
    async listItems(input: unknown, context: MasterDataContext) {
      const parsed = listSchema.parse(input) as ListRequest;
      assertPermission(context, permissions.view);
      return repository.listItems(parsed);
    },
    async getItem(tenantId: string, id: string, context: MasterDataContext) {
      const item = assertFound(await repository.getItemById(tenantId, id), "Item");
      assertPermission(context, permissions.view, item);
      return item;
    },
    async getItemStats(tenantId: string, context: MasterDataContext) {
      assertPermission(context, permissions.view);
      return repository.getItemStats(tenantId);
    },
    async createItem(input: unknown, context: MasterDataContext): Promise<Item> {
      const parsed = itemCreateSchema.parse(input) as ItemCreate;
      await assertItemUoms(parsed, parsed.tenantId);
      assertPermission(context, permissions.create);
      const created = await repository.createItem(parsed);
      audit("itemCreated", created.tenantId, created.id, context);
      return created;
    },
    async updateItem(tenantId: string, id: string, input: unknown, context: MasterDataContext): Promise<Item> {
      const current = assertFound(await repository.getItemById(tenantId, id), "Item");
      assertPermission(context, permissions.update, current);
      const parsed = itemUpdateSchema.parse(input) as ItemUpdate;
      await assertItemUoms(parsed, tenantId);
      const updated = assertFound(await repository.updateItem(tenantId, id, parsed), "Item");
      audit("itemUpdated", tenantId, id, context);
      return updated;
    },
    async deleteItem(tenantId: string, id: string, context: MasterDataContext): Promise<Item> {
      const current = assertFound(await repository.getItemById(tenantId, id), "Item");
      assertPermission(context, permissions.delete, current);
      const deleted = assertFound(await repository.softDeleteItem(tenantId, id), "Item");
      audit("itemDeleted", tenantId, id, context);
      return deleted;
    },
  };
}

export const masterDataService = createMasterDataService();
