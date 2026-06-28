export const designationsCloseWorkflow = {
  module: "hr/designations",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/designations record ${recordId}`;
  },
};
