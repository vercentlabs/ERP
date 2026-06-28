export const returnsRepairsCreateWorkflow = {
  module: "helpdesk/returns-repairs",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for helpdesk/returns-repairs record ${recordId}`;
  },
};
