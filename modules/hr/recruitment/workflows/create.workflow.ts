export const recruitmentCreateWorkflow = {
  module: "hr/recruitment",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/recruitment record ${recordId}`;
  },
};
