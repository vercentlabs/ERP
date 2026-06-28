import sample from "./sample.json";
import { downtimeService } from "../service";

export async function seedDowntime() {
  return downtimeService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
