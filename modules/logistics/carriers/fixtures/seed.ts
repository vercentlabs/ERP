import sample from "./sample.json";
import { carriersService } from "../service";

export async function seedCarriers() {
  return carriersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
