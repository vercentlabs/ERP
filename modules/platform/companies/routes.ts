import type { Router } from "express";
import { companiesController } from "./controller";
import { manifest } from "./manifest";

export function registerCompaniesRoutes(router: Router) {
  router.get(manifest.routeBase, companiesController.list);
  router.post(manifest.routeBase, companiesController.create);
  router.patch(`${manifest.routeBase}/:id`, companiesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, companiesController.transition);
}
