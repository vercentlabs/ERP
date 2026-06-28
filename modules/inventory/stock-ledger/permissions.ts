export const permissions = {
  viewWarehouses: "inventory.warehouses.view",
  createWarehouses: "inventory.warehouses.create",
  updateWarehouses: "inventory.warehouses.update",
  deleteWarehouses: "inventory.warehouses.delete",
  viewBins: "inventory.bins.view",
  createBins: "inventory.bins.create",
  updateBins: "inventory.bins.update",
  deleteBins: "inventory.bins.delete",
  viewStock: "inventory.stock.view",
  adjustStock: "inventory.stock.adjust",
  openingStock: "inventory.stock.opening",
  viewLedger: "inventory.stock.ledger.view",
  viewAvailability: "inventory.stock.availability.view",
} as const;

export type StockLedgerPermission = (typeof permissions)[keyof typeof permissions];
