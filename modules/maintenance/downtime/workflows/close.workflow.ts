export const downtimeCloseWorkflow = {
  module: "maintenance/downtime",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for maintenance/downtime record ${recordId}`;
  },
};
