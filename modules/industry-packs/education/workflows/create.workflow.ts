export const educationCreateWorkflow = {
  module: "industry-packs/education",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/education record ${recordId}`;
  },
};
