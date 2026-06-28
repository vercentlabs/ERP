export const receivingSubmitWorkflow = {
  module: "warehouse/receiving",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for warehouse/receiving record ${recordId}`;
  },
};
