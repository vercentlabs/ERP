export const dispatchSubmitWorkflow = {
  module: "field-service/dispatch",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for field-service/dispatch record ${recordId}`;
  },
};
