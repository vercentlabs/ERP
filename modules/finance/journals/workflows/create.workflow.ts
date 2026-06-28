export const journalsCreateWorkflow = {
  module: "finance/journals",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/journals record ${recordId}`;
  },
};
