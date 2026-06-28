import type { Router } from "express";
import { customReportsController } from "./controller";
import { manifest } from "./manifest";

export function registerCustomReportsRoutes(router: Router) {
  router.get(manifest.routeBase, customReportsController.list);
  router.post(manifest.routeBase, customReportsController.create);
  router.patch(`${manifest.routeBase}/:id`, customReportsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customReportsController.transition);
}
