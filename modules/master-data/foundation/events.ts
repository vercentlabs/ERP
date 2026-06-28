export const events = {
  partyCreated: "master_data.party.created",
  partyUpdated: "master_data.party.updated",
  partyDeleted: "master_data.party.deleted",
  addressCreated: "master_data.address.created",
  addressUpdated: "master_data.address.updated",
  addressDeleted: "master_data.address.deleted",
  customerCreated: "master_data.customer.created",
  customerUpdated: "master_data.customer.updated",
  customerDeleted: "master_data.customer.deleted",
  supplierCreated: "master_data.supplier.created",
  supplierUpdated: "master_data.supplier.updated",
  supplierDeleted: "master_data.supplier.deleted",
  uomCreated: "master_data.uom.created",
  uomUpdated: "master_data.uom.updated",
  uomDeleted: "master_data.uom.deleted",
  itemCreated: "master_data.item.created",
  itemUpdated: "master_data.item.updated",
  itemDeleted: "master_data.item.deleted",
} as const;

export type MasterDataEventType = (typeof events)[keyof typeof events];
