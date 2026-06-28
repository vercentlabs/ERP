export const downtimeUpdateWorkflow = {
  module: "maintenance/downtime",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for maintenance/downtime record ${recordId}`;
  },
};
