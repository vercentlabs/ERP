export const importsSubmitWorkflow = {
  module: "platform/imports",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/imports record ${recordId}`;
  },
};
