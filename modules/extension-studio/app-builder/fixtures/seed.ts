import sample from "./sample.json";
import { appBuilderService } from "../service";

export async function seedAppBuilder() {
  return appBuilderService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
