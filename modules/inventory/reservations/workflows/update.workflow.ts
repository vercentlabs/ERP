export const reservationsUpdateWorkflow = {
  module: "inventory/reservations",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/reservations record ${recordId}`;
  },
};
