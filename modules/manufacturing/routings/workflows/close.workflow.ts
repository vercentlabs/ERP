export const routingsCloseWorkflow = {
  module: "manufacturing/routings",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for manufacturing/routings record ${recordId}`;
  },
};
