export const shiftsCloseWorkflow = {
  module: "hr/shifts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/shifts record ${recordId}`;
  },
};
