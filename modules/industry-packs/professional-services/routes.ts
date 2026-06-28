import type { Router } from "express";
import { professionalServicesController } from "./controller";
import { manifest } from "./manifest";

export function registerProfessionalServicesRoutes(router: Router) {
  router.get(manifest.routeBase, professionalServicesController.list);
  router.post(manifest.routeBase, professionalServicesController.create);
  router.patch(`${manifest.routeBase}/:id`, professionalServicesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, professionalServicesController.transition);
}
