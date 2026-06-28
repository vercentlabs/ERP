import type { Router } from "express";
import { binsController } from "./controller";
import { manifest } from "./manifest";

export function registerBinsRoutes(router: Router) {
  router.get(manifest.routeBase, binsController.list);
  router.post(manifest.routeBase, binsController.create);
  router.patch(`${manifest.routeBase}/:id`, binsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, binsController.transition);
}
