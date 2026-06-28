export const recruitmentCloseWorkflow = {
  module: "hr/recruitment",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/recruitment record ${recordId}`;
  },
};
