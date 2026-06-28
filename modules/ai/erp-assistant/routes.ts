import type { Router } from "express";
import { erpAssistantController } from "./controller";
import { manifest } from "./manifest";

export function registerErpAssistantRoutes(router: Router) {
  router.get(manifest.routeBase, erpAssistantController.list);
  router.post(manifest.routeBase, erpAssistantController.create);
  router.patch(`${manifest.routeBase}/:id`, erpAssistantController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, erpAssistantController.transition);
}
