export const shiftsUpdateWorkflow = {
  module: "hr/shifts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/shifts record ${recordId}`;
  },
};
