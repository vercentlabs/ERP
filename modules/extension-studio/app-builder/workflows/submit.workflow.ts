export const appBuilderSubmitWorkflow = {
  module: "extension-studio/app-builder",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for extension-studio/app-builder record ${recordId}`;
  },
};
