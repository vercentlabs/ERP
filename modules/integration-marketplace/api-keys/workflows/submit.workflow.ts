export const apiKeysSubmitWorkflow = {
  module: "integration-marketplace/api-keys",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for integration-marketplace/api-keys record ${recordId}`;
  },
};
