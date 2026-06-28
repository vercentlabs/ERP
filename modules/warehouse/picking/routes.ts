import type { Router } from "express";
import { pickingController } from "./controller";
import { manifest } from "./manifest";

export function registerPickingRoutes(router: Router) {
  router.get(manifest.routeBase, pickingController.list);
  router.post(manifest.routeBase, pickingController.create);
  router.patch(`${manifest.routeBase}/:id`, pickingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, pickingController.transition);
}
