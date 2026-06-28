export const preventiveMaintenanceCancelWorkflow = {
  module: "maintenance/preventive-maintenance",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for maintenance/preventive-maintenance record ${recordId}`;
  },
};
