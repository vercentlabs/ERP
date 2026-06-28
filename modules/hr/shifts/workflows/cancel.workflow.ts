export const shiftsCancelWorkflow = {
  module: "hr/shifts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/shifts record ${recordId}`;
  },
};
