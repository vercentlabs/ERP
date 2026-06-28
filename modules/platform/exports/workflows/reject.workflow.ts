export const exportsRejectWorkflow = {
  module: "platform/exports",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/exports record ${recordId}`;
  },
};
