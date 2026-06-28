export const programsSubmitWorkflow = {
  module: "projects/programs",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for projects/programs record ${recordId}`;
  },
};
