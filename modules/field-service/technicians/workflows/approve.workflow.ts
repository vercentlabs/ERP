export const techniciansApproveWorkflow = {
  module: "field-service/technicians",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for field-service/technicians record ${recordId}`;
  },
};
