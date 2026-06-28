export const routesCloseWorkflow = {
  module: "logistics/routes",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for logistics/routes record ${recordId}`;
  },
};
