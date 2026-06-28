export const receivingApproveWorkflow = {
  module: "warehouse/receiving",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for warehouse/receiving record ${recordId}`;
  },
};
