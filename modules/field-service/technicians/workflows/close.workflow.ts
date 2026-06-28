export const techniciansCloseWorkflow = {
  module: "field-service/technicians",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for field-service/technicians record ${recordId}`;
  },
};
