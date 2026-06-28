export const reservationsRejectWorkflow = {
  module: "inventory/reservations",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/reservations record ${recordId}`;
  },
};
