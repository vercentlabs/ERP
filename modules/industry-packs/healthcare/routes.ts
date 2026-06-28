import type { Router } from "express";
import { healthcareController } from "./controller";
import { manifest } from "./manifest";

export function registerHealthcareRoutes(router: Router) {
  router.get(manifest.routeBase, healthcareController.list);
  router.post(manifest.routeBase, healthcareController.create);
  router.patch(`${manifest.routeBase}/:id`, healthcareController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, healthcareController.transition);
}
