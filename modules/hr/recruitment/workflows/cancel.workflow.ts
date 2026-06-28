export const recruitmentCancelWorkflow = {
  module: "hr/recruitment",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/recruitment record ${recordId}`;
  },
};
