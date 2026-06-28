export const techniciansCancelWorkflow = {
  module: "field-service/technicians",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for field-service/technicians record ${recordId}`;
  },
};
