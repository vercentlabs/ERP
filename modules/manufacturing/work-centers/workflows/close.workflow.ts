export const workCentersCloseWorkflow = {
  module: "manufacturing/work-centers",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for manufacturing/work-centers record ${recordId}`;
  },
};
