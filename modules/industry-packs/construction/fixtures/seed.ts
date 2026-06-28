import sample from "./sample.json";
import { constructionService } from "../service";

export async function seedConstruction() {
  return constructionService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
