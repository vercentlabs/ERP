import sample from "./sample.json";
import { mobileJobsService } from "../service";

export async function seedMobileJobs() {
  return mobileJobsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
