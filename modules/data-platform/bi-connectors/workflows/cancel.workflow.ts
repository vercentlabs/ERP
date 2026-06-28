export const biConnectorsCancelWorkflow = {
  module: "data-platform/bi-connectors",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for data-platform/bi-connectors record ${recordId}`;
  },
};
