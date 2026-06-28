export const routesCancelWorkflow = {
  module: "logistics/routes",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for logistics/routes record ${recordId}`;
  },
};
