export const recruitmentSubmitWorkflow = {
  module: "hr/recruitment",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/recruitment record ${recordId}`;
  },
};
