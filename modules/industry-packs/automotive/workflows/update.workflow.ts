export const automotiveUpdateWorkflow = {
  module: "industry-packs/automotive",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/automotive record ${recordId}`;
  },
};
