export const receivingCreateWorkflow = {
  module: "warehouse/receiving",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for warehouse/receiving record ${recordId}`;
  },
};
