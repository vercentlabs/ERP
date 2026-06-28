export const assetsRejectWorkflow = {
  module: "maintenance/assets",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for maintenance/assets record ${recordId}`;
  },
};
