export const sparePartsSubmitWorkflow = {
  module: "maintenance/spare-parts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for maintenance/spare-parts record ${recordId}`;
  },
};
