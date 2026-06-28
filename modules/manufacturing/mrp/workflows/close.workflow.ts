export const mrpCloseWorkflow = {
  module: "manufacturing/mrp",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for manufacturing/mrp record ${recordId}`;
  },
};
