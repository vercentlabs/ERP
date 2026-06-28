export const customReportsSubmitWorkflow = {
  module: "extension-studio/custom-reports",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for extension-studio/custom-reports record ${recordId}`;
  },
};
