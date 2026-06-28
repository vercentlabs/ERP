export const onboardingCreateWorkflow = {
  module: "hr/onboarding",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/onboarding record ${recordId}`;
  },
};
