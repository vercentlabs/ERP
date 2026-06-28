export const programsApproveWorkflow = {
  module: "projects/programs",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for projects/programs record ${recordId}`;
  },
};
