export const programsCreateWorkflow = {
  module: "projects/programs",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for projects/programs record ${recordId}`;
  },
};
