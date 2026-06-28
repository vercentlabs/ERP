export const programsUpdateWorkflow = {
  module: "projects/programs",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for projects/programs record ${recordId}`;
  },
};
