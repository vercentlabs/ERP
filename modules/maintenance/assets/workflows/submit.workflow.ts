export const assetsSubmitWorkflow = {
  module: "maintenance/assets",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for maintenance/assets record ${recordId}`;
  },
};
