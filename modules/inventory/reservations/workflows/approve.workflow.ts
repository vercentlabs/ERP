export const reservationsApproveWorkflow = {
  module: "inventory/reservations",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/reservations record ${recordId}`;
  },
};
