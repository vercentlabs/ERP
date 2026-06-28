export const onboardingUpdateWorkflow = {
  module: "hr/onboarding",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/onboarding record ${recordId}`;
  },
};
