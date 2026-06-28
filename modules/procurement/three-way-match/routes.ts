import type { Router } from "express";
import { threeWayMatchController } from "./controller";
import { manifest } from "./manifest";

export function registerThreeWayMatchRoutes(router: Router) {
  router.get(manifest.routeBase, threeWayMatchController.list);
  router.post(manifest.routeBase, threeWayMatchController.create);
  router.patch(`${manifest.routeBase}/:id`, threeWayMatchController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, threeWayMatchController.transition);
}
