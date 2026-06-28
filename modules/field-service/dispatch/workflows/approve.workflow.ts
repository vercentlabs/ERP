export const dispatchApproveWorkflow = {
  module: "field-service/dispatch",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for field-service/dispatch record ${recordId}`;
  },
};
