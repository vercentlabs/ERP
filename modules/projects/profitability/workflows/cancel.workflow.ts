export const profitabilityCancelWorkflow = {
  module: "projects/profitability",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for projects/profitability record ${recordId}`;
  },
};
