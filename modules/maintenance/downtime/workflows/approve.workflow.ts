export const downtimeApproveWorkflow = {
  module: "maintenance/downtime",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for maintenance/downtime record ${recordId}`;
  },
};
