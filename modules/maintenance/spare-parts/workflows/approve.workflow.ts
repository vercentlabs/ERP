export const sparePartsApproveWorkflow = {
  module: "maintenance/spare-parts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for maintenance/spare-parts record ${recordId}`;
  },
};
