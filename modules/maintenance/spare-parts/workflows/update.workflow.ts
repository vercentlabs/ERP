export const sparePartsUpdateWorkflow = {
  module: "maintenance/spare-parts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for maintenance/spare-parts record ${recordId}`;
  },
};
