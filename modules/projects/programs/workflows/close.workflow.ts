export const programsCloseWorkflow = {
  module: "projects/programs",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for projects/programs record ${recordId}`;
  },
};
