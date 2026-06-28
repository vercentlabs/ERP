export const exportsSubmitWorkflow = {
  module: "platform/exports",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/exports record ${recordId}`;
  },
};
