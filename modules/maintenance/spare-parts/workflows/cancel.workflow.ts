export const sparePartsCancelWorkflow = {
  module: "maintenance/spare-parts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for maintenance/spare-parts record ${recordId}`;
  },
};
