import type { Router } from "express";
import { mobileJobsController } from "./controller";
import { manifest } from "./manifest";

export function registerMobileJobsRoutes(router: Router) {
  router.get(manifest.routeBase, mobileJobsController.list);
  router.post(manifest.routeBase, mobileJobsController.create);
  router.patch(`${manifest.routeBase}/:id`, mobileJobsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, mobileJobsController.transition);
}
