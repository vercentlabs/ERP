import type { Router } from "express";
import { automotiveController } from "./controller";
import { manifest } from "./manifest";

export function registerAutomotiveRoutes(router: Router) {
  router.get(manifest.routeBase, automotiveController.list);
  router.post(manifest.routeBase, automotiveController.create);
  router.patch(`${manifest.routeBase}/:id`, automotiveController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, automotiveController.transition);
}
