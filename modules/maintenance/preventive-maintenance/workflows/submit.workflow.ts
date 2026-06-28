export const preventiveMaintenanceSubmitWorkflow = {
  module: "maintenance/preventive-maintenance",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for maintenance/preventive-maintenance record ${recordId}`;
  },
};
