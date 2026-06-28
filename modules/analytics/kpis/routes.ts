import type { Router } from "express";
import { kpisController } from "./controller";
import { manifest } from "./manifest";

export function registerKpisRoutes(router: Router) {
  router.get(manifest.routeBase, kpisController.list);
  router.post(manifest.routeBase, kpisController.create);
  router.patch(`${manifest.routeBase}/:id`, kpisController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, kpisController.transition);
}
