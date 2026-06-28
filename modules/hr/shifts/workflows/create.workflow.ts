export const shiftsCreateWorkflow = {
  module: "hr/shifts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/shifts record ${recordId}`;
  },
};
