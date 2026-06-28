export const routingsCancelWorkflow = {
  module: "manufacturing/routings",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for manufacturing/routings record ${recordId}`;
  },
};
