import sample from "./sample.json";
import { professionalServicesService } from "../service";

export async function seedProfessionalServices() {
  return professionalServicesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
