import sample from "./sample.json";
import { receivingService } from "../service";

export async function seedReceiving() {
  return receivingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
