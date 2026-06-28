import type { Router } from "express";
import { dashboardsController } from "./controller";
import { manifest } from "./manifest";

export function registerDashboardsRoutes(router: Router) {
  router.get(manifest.routeBase, dashboardsController.list);
  router.post(manifest.routeBase, dashboardsController.create);
  router.patch(`${manifest.routeBase}/:id`, dashboardsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, dashboardsController.transition);
}
