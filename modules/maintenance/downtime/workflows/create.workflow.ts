export const downtimeCreateWorkflow = {
  module: "maintenance/downtime",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for maintenance/downtime record ${recordId}`;
  },
};
