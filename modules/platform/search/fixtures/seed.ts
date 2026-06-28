import sample from "./sample.json";
import { searchService } from "../service";

export async function seedSearch() {
  return searchService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
