export const equipmentSubmitWorkflow = {
  module: "maintenance/equipment",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for maintenance/equipment record ${recordId}`;
  },
};
