export const reservationsCloseWorkflow = {
  module: "inventory/reservations",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/reservations record ${recordId}`;
  },
};
