export const projectsRejectWorkflow = {
  module: "projects/projects",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for projects/projects record ${recordId}`;
  },
};
