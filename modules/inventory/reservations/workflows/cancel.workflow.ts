export const reservationsCancelWorkflow = {
  module: "inventory/reservations",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/reservations record ${recordId}`;
  },
};
