export const dispatchCreateWorkflow = {
  module: "field-service/dispatch",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for field-service/dispatch record ${recordId}`;
  },
};
