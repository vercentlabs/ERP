export const carriersCreateWorkflow = {
  module: "logistics/carriers",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for logistics/carriers record ${recordId}`;
  },
};
