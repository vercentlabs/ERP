export const designationsCancelWorkflow = {
  module: "hr/designations",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/designations record ${recordId}`;
  },
};
