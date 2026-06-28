export const recruitmentUpdateWorkflow = {
  module: "hr/recruitment",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/recruitment record ${recordId}`;
  },
};
