export const dispatchUpdateWorkflow = {
  module: "field-service/dispatch",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for field-service/dispatch record ${recordId}`;
  },
};
