import sample from "./sample.json";
import { proofOfDeliveryService } from "../service";

export async function seedProofOfDelivery() {
  return proofOfDeliveryService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
