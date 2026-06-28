export const projectsSubmitWorkflow = {
  module: "projects/projects",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for projects/projects record ${recordId}`;
  },
};
