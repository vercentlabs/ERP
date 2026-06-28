export const projectsCloseWorkflow = {
  module: "projects/projects",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for projects/projects record ${recordId}`;
  },
};
