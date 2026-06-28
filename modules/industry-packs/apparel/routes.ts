import type { Router } from "express";
import { apparelController } from "./controller";
import { manifest } from "./manifest";

export function registerApparelRoutes(router: Router) {
  router.get(manifest.routeBase, apparelController.list);
  router.post(manifest.routeBase, apparelController.create);
  router.patch(`${manifest.routeBase}/:id`, apparelController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, apparelController.transition);
}
