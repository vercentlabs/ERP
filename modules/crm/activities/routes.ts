import type { Router } from "express";
import { activitiesController } from "./controller";
import { manifest } from "./manifest";

export function registerActivitiesRoutes(router: Router) {
  router.get(manifest.routeBase, activitiesController.list);
  router.post(manifest.routeBase, activitiesController.create);
  router.patch(`${manifest.routeBase}/:id`, activitiesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, activitiesController.transition);
}
