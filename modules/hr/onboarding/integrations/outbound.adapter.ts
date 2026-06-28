export const onboardingOutboundAdapter = {
  name: "hr/onboarding.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/onboarding",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
