import sample from "./sample.json";
import { qualityCertificatesService } from "../service";

export async function seedQualityCertificates() {
  return qualityCertificatesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
