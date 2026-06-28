export const mrpApproveWorkflow = {
  module: "manufacturing/mrp",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for manufacturing/mrp record ${recordId}`;
  },
};
