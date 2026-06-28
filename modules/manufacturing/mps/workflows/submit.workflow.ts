export const mpsSubmitWorkflow = {
  module: "manufacturing/mps",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for manufacturing/mps record ${recordId}`;
  },
};
