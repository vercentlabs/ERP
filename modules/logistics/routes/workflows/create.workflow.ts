export const routesCreateWorkflow = {
  module: "logistics/routes",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for logistics/routes record ${recordId}`;
  },
};
