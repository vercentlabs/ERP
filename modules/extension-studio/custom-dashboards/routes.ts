import type { Router } from "express";
import { customDashboardsController } from "./controller";
import { manifest } from "./manifest";

export function registerCustomDashboardsRoutes(router: Router) {
  router.get(manifest.routeBase, customDashboardsController.list);
  router.post(manifest.routeBase, customDashboardsController.create);
  router.patch(`${manifest.routeBase}/:id`, customDashboardsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customDashboardsController.transition);
}
