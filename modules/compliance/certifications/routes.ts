import type { Router } from "express";
import { certificationsController } from "./controller";
import { manifest } from "./manifest";

export function registerCertificationsRoutes(router: Router) {
  router.get(manifest.routeBase, certificationsController.list);
  router.post(manifest.routeBase, certificationsController.create);
  router.patch(`${manifest.routeBase}/:id`, certificationsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, certificationsController.transition);
}
