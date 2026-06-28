export const customPagesSubmitWorkflow = {
  module: "extension-studio/custom-pages",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for extension-studio/custom-pages record ${recordId}`;
  },
};
