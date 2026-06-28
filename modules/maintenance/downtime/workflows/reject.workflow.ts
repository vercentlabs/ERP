export const downtimeRejectWorkflow = {
  module: "maintenance/downtime",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for maintenance/downtime record ${recordId}`;
  },
};
