export const recruitmentRejectWorkflow = {
  module: "hr/recruitment",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for hr/recruitment record ${recordId}`;
  },
};
