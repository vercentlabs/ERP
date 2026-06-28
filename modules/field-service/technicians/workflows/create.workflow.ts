export const techniciansCreateWorkflow = {
  module: "field-service/technicians",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for field-service/technicians record ${recordId}`;
  },
};
