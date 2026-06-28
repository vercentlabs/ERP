export const reservationsSubmitWorkflow = {
  module: "inventory/reservations",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/reservations record ${recordId}`;
  },
};
