export const routesUpdateWorkflow = {
  module: "logistics/routes",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for logistics/routes record ${recordId}`;
  },
};
