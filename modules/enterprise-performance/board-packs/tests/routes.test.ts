import { describe, expect, it } from "vitest";
import { manifest } from "../manifest";

describe("enterprise-performance/board-packs routes", () => {
  it("is tenant-scoped and has a route base", () => {
    expect(manifest.tenantScoped).toBe(true);
    expect(manifest.routeBase).toContain("/api/");
  });
});
