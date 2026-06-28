import sample from "./sample.json";
import { scrapReworkService } from "../service";

export async function seedScrapRework() {
  return scrapReworkService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
