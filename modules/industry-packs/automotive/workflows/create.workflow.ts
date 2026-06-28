export const automotiveCreateWorkflow = {
  module: "industry-packs/automotive",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/automotive record ${recordId}`;
  },
};
