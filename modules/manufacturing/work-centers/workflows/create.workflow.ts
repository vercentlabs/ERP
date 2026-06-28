export const workCentersCreateWorkflow = {
  module: "manufacturing/work-centers",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for manufacturing/work-centers record ${recordId}`;
  },
};
