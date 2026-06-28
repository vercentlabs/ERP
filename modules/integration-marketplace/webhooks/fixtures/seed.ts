import sample from "./sample.json";
import { webhooksService } from "../service";

export async function seedWebhooks() {
  return webhooksService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
