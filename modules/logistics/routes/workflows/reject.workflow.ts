export const routesRejectWorkflow = {
  module: "logistics/routes",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for logistics/routes record ${recordId}`;
  },
};
