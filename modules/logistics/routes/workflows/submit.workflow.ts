export const routesSubmitWorkflow = {
  module: "logistics/routes",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for logistics/routes record ${recordId}`;
  },
};
