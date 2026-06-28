export const pickingSubmitWorkflow = {
  module: "warehouse/picking",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for warehouse/picking record ${recordId}`;
  },
};
