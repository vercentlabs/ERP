import type { Router } from "express";
import { leaveController } from "./controller";
import { manifest } from "./manifest";

export function registerLeaveRoutes(router: Router) {
  router.get(manifest.routeBase, leaveController.list);
  router.post(manifest.routeBase, leaveController.create);
  router.patch(`${manifest.routeBase}/:id`, leaveController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, leaveController.transition);
}
