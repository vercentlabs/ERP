export const techniciansUpdateWorkflow = {
  module: "field-service/technicians",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for field-service/technicians record ${recordId}`;
  },
};
