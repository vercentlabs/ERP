import sample from "./sample.json";
import { onboardingService } from "../service";

export async function seedOnboarding() {
  return onboardingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
