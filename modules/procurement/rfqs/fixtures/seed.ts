import sample from "./sample.json";
import { rfqsService } from "../service";

export async function seedRfqs() {
  return rfqsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
