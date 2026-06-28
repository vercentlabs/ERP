export const reservationsCreateWorkflow = {
  module: "inventory/reservations",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/reservations record ${recordId}`;
  },
};
