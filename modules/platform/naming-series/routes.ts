import type { Router } from "express";
import { namingSeriesController } from "./controller";
import { manifest } from "./manifest";

export function registerNamingSeriesRoutes(router: Router) {
  router.get(manifest.routeBase, namingSeriesController.list);
  router.post(manifest.routeBase, namingSeriesController.create);
  router.patch(`${manifest.routeBase}/:id`, namingSeriesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, namingSeriesController.transition);
}
