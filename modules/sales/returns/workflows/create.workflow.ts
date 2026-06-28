export const returnsCreateWorkflow = {
  module: "sales/returns",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sales/returns record ${recordId}`;
  },
};
