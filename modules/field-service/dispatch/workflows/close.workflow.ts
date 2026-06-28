export const dispatchCloseWorkflow = {
  module: "field-service/dispatch",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for field-service/dispatch record ${recordId}`;
  },
};
