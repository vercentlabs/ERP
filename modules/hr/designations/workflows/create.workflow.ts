export const designationsCreateWorkflow = {
  module: "hr/designations",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/designations record ${recordId}`;
  },
};
