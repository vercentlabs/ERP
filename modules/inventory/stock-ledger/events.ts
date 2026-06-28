export const events = {
  warehouseCreated: "inventory.warehouse.created",
  warehouseUpdated: "inventory.warehouse.updated",
  warehouseDeleted: "inventory.warehouse.deleted",
  binCreated: "inventory.bin.created",
  binUpdated: "inventory.bin.updated",
  binDeleted: "inventory.bin.deleted",
  openingCreated: "inventory.stock.opening_created",
  stockAdjusted: "inventory.stock.adjusted",
  ledgerEntryCreated: "inventory.stock.ledger_entry.created",
  balanceUpdated: "inventory.stock.balance.updated",
} as const;
