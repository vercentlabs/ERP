export const carriersUpdateWorkflow = {
  module: "logistics/carriers",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for logistics/carriers record ${recordId}`;
  },
};
