export const packingSubmitWorkflow = {
  module: "warehouse/packing",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for warehouse/packing record ${recordId}`;
  },
};
