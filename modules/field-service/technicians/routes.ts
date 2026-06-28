import type { Router } from "express";
import { techniciansController } from "./controller";
import { manifest } from "./manifest";

export function registerTechniciansRoutes(router: Router) {
  router.get(manifest.routeBase, techniciansController.list);
  router.post(manifest.routeBase, techniciansController.create);
  router.patch(`${manifest.routeBase}/:id`, techniciansController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, techniciansController.transition);
}
