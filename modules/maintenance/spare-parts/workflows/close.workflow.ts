export const sparePartsCloseWorkflow = {
  module: "maintenance/spare-parts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for maintenance/spare-parts record ${recordId}`;
  },
};
