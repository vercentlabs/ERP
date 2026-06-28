import sample from "./sample.json";
import { semanticLayerService } from "../service";

export async function seedSemanticLayer() {
  return semanticLayerService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
