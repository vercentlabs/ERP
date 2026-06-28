export const projectsCancelWorkflow = {
  module: "projects/projects",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for projects/projects record ${recordId}`;
  },
};
