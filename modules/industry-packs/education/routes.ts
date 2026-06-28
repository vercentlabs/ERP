import type { Router } from "express";
import { educationController } from "./controller";
import { manifest } from "./manifest";

export function registerEducationRoutes(router: Router) {
  router.get(manifest.routeBase, educationController.list);
  router.post(manifest.routeBase, educationController.create);
  router.patch(`${manifest.routeBase}/:id`, educationController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, educationController.transition);
}
