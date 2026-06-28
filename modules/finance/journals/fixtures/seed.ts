import sample from "./sample.json";
import { journalsService } from "../service";

export async function seedJournals() {
  return journalsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
