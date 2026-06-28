import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value.length === 0 ? undefined : value))
  .optional();

export const masterDataStatusSchema = z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]);
export const partyTypeSchema = z.enum(["INDIVIDUAL", "COMPANY"]);
export const addressTypeSchema = z.enum(["BILLING", "SHIPPING", "REGISTERED", "OFFICE", "WAREHOUSE", "OTHER"]);
export const itemTypeSchema = z.enum([
  "PRODUCT",
  "SERVICE",
  "RAW_MATERIAL",
  "FINISHED_GOOD",
  "SEMI_FINISHED_GOOD",
  "CONSUMABLE",
  "ASSET",
]);

const scopeSchema = z.object({
  tenantId: z.string().min(1),
  companyId: optionalText,
  branchId: optionalText,
});

export const listSchema = scopeSchema.extend({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(200).default(25),
  search: optionalText,
  status: masterDataStatusSchema.optional(),
  type: optionalText,
  group: optionalText,
  createdFrom: optionalText,
  createdTo: optionalText,
  sortBy: optionalText,
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
});

export const partyCreateSchema = scopeSchema.extend({
  partyNumber: optionalText,
  partyType: partyTypeSchema.default("COMPANY"),
  displayName: z.string().trim().min(1),
  legalName: optionalText,
  taxId: optionalText,
  gstin: optionalText,
  pan: optionalText,
  email: z.string().trim().email().optional().or(z.literal("").transform(() => undefined)),
  phone: optionalText,
  website: optionalText,
  status: masterDataStatusSchema.default("ACTIVE"),
  tags: z.array(z.string().trim().min(1)).default([]),
  customFields: z.record(z.unknown()).default({}),
});

export const partyUpdateSchema = partyCreateSchema.omit({ tenantId: true, partyNumber: true }).partial();

export const addressCreateSchema = scopeSchema.extend({
  partyId: z.string().min(1),
  addressType: addressTypeSchema.default("REGISTERED"),
  line1: z.string().trim().min(1),
  line2: optionalText,
  city: z.string().trim().min(1),
  state: z.string().trim().min(1),
  postalCode: z.string().trim().min(1),
  country: z.string().trim().min(2).default("IN"),
  gstStateCode: optionalText,
  isDefaultBilling: z.coerce.boolean().default(false),
  isDefaultShipping: z.coerce.boolean().default(false),
});

export const addressUpdateSchema = addressCreateSchema.omit({ tenantId: true, partyId: true }).partial();

export const customerCreateSchema = scopeSchema.extend({
  partyId: z.string().min(1),
  customerNumber: optionalText,
  customerGroup: optionalText,
  creditLimit: z.coerce.number().nonnegative().default(0),
  paymentTerms: optionalText,
  currency: z.string().trim().min(3).max(3).default("INR"),
  gstTreatment: optionalText,
  receivableAccountId: optionalText,
  status: masterDataStatusSchema.default("ACTIVE"),
});

export const customerUpdateSchema = customerCreateSchema.omit({ tenantId: true, partyId: true, customerNumber: true }).partial();

export const supplierCreateSchema = scopeSchema.extend({
  partyId: z.string().min(1),
  supplierNumber: optionalText,
  supplierGroup: optionalText,
  paymentTerms: optionalText,
  currency: z.string().trim().min(3).max(3).default("INR"),
  gstTreatment: optionalText,
  payableAccountId: optionalText,
  rating: z.coerce.number().min(0).max(5).optional(),
  status: masterDataStatusSchema.default("ACTIVE"),
});

export const supplierUpdateSchema = supplierCreateSchema.omit({ tenantId: true, partyId: true, supplierNumber: true }).partial();

export const uomCreateSchema = scopeSchema.extend({
  code: z.string().trim().min(1).transform((value) => value.toUpperCase()),
  name: z.string().trim().min(1),
  category: optionalText,
  precision: z.coerce.number().int().min(0).max(8).default(0),
  isBase: z.coerce.boolean().default(false),
  status: masterDataStatusSchema.default("ACTIVE"),
});

export const uomUpdateSchema = uomCreateSchema.omit({ tenantId: true, code: true }).partial();

export const itemCreateSchema = scopeSchema.extend({
  itemNumber: optionalText,
  sku: optionalText,
  name: z.string().trim().min(1),
  description: optionalText,
  itemType: itemTypeSchema.default("PRODUCT"),
  itemGroup: optionalText,
  baseUomId: z.string().min(1),
  salesUomId: optionalText,
  purchaseUomId: optionalText,
  isStockItem: z.coerce.boolean().default(true),
  isSalesItem: z.coerce.boolean().default(true),
  isPurchaseItem: z.coerce.boolean().default(true),
  isManufacturingItem: z.coerce.boolean().default(false),
  standardCost: z.coerce.number().nonnegative().optional(),
  sellingPrice: z.coerce.number().nonnegative().optional(),
  currency: z.string().trim().min(3).max(3).default("INR"),
  taxCategory: optionalText,
  hsnSacCode: optionalText,
  barcode: optionalText,
  status: masterDataStatusSchema.default("ACTIVE"),
  tags: z.array(z.string().trim().min(1)).default([]),
  customFields: z.record(z.unknown()).default({}),
});

export const itemUpdateSchema = itemCreateSchema.omit({ tenantId: true, itemNumber: true }).partial();
