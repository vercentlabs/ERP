export const workCentersCancelWorkflow = {
  module: "manufacturing/work-centers",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for manufacturing/work-centers record ${recordId}`;
  },
};
