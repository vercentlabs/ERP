export const programsRejectWorkflow = {
  module: "projects/programs",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for projects/programs record ${recordId}`;
  },
};
