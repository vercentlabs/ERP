import type { Router } from "express";
import { subcontractingController } from "./controller";
import { manifest } from "./manifest";

export function registerSubcontractingRoutes(router: Router) {
  router.get(manifest.routeBase, subcontractingController.list);
  router.post(manifest.routeBase, subcontractingController.create);
  router.patch(`${manifest.routeBase}/:id`, subcontractingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, subcontractingController.transition);
}
