export const sparePartsRejectWorkflow = {
  module: "maintenance/spare-parts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for maintenance/spare-parts record ${recordId}`;
  },
};
