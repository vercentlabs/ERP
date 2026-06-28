export const workCentersSubmitWorkflow = {
  module: "manufacturing/work-centers",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for manufacturing/work-centers record ${recordId}`;
  },
};
