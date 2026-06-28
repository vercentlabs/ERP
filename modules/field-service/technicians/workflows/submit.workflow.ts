export const techniciansSubmitWorkflow = {
  module: "field-service/technicians",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for field-service/technicians record ${recordId}`;
  },
};
