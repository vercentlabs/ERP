export const sparePartsCreateWorkflow = {
  module: "maintenance/spare-parts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for maintenance/spare-parts record ${recordId}`;
  },
};
