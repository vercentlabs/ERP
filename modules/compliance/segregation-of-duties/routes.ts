import type { Router } from "express";
import { segregationOfDutiesController } from "./controller";
import { manifest } from "./manifest";

export function registerSegregationOfDutiesRoutes(router: Router) {
  router.get(manifest.routeBase, segregationOfDutiesController.list);
  router.post(manifest.routeBase, segregationOfDutiesController.create);
  router.patch(`${manifest.routeBase}/:id`, segregationOfDutiesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, segregationOfDutiesController.transition);
}
