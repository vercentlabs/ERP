export const downtimeCancelWorkflow = {
  module: "maintenance/downtime",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for maintenance/downtime record ${recordId}`;
  },
};
