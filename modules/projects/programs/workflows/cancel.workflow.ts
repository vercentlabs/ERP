export const programsCancelWorkflow = {
  module: "projects/programs",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for projects/programs record ${recordId}`;
  },
};
