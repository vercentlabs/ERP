export const binsSubmitWorkflow = {
  module: "warehouse/bins",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for warehouse/bins record ${recordId}`;
  },
};
