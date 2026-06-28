import sample from "./sample.json";
import { slasService } from "../service";

export async function seedSlas() {
  return slasService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
