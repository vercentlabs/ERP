export const downtimeSubmitWorkflow = {
  module: "maintenance/downtime",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for maintenance/downtime record ${recordId}`;
  },
};
