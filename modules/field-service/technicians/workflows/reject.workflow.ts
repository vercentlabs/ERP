export const techniciansRejectWorkflow = {
  module: "field-service/technicians",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for field-service/technicians record ${recordId}`;
  },
};
