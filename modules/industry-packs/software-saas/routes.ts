import type { Router } from "express";
import { softwareSaasController } from "./controller";
import { manifest } from "./manifest";

export function registerSoftwareSaasRoutes(router: Router) {
  router.get(manifest.routeBase, softwareSaasController.list);
  router.post(manifest.routeBase, softwareSaasController.create);
  router.patch(`${manifest.routeBase}/:id`, softwareSaasController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, softwareSaasController.transition);
}
