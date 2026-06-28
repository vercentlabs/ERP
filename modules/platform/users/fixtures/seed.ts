import sample from "./sample.json";
import { usersService } from "../service";

export async function seedUsers() {
  return usersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
