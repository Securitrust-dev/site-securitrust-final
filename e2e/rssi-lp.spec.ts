import { test, expect } from "@playwright/test";

/**
 * Tests e2e du portage de la LP RSSI externalisé (/rssi-externalise-lp).
 * Prouvent le rendu ET l'interactivité client (form), que le preview headless
 * ne pouvait pas hydrater. Lancent un vrai Chromium -> React s'hydrate.
 */
test.describe("LP RSSI externalisé — /rssi-externalise-lp", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/rssi-externalise-lp");
  });

  test("rend la LP : wrapper, H1, grille pricing, formulaire", async ({ page }) => {
    await expect(page.locator("#lp-root")).toBeVisible();
    await expect(page.locator("h1")).toContainText("RSSI externalisé");
    // Pricing en style natif de la LP : 3 cartes dont une "featured".
    await expect(page.locator("#lp-root .price-card")).toHaveCount(3);
    await expect(page.locator("#lp-root .price-card.featured")).toHaveCount(1);
    await expect(page.locator("#callback-form")).toBeVisible();
  });

  test("formulaire : soumission valide -> état succès, form masqué", async ({ page }) => {
    const form = page.locator("#callback-form");
    const success = page.locator("#form-success");

    await expect(form).toBeVisible();
    await expect(success).not.toHaveClass(/\bshow\b/);

    await page.fill("#f-name", "Jean Test");
    await page.fill("#f-email", "jean@entreprise.fr");
    await page.click('#callback-form button[type="submit"]');

    // Le handler React (porté du <script> vanilla) doit s'exécuter :
    await expect(success).toHaveClass(/\bshow\b/);
    await expect(success).toBeVisible();
    await expect(form).toBeHidden();
  });

  test("formulaire : soumission vide bloquée par la validation HTML", async ({ page }) => {
    const form = page.locator("#callback-form");
    const success = page.locator("#form-success");

    await page.click('#callback-form button[type="submit"]');

    // checkValidity() échoue (champs requis vides) -> pas de succès, form visible.
    await expect(success).not.toHaveClass(/\bshow\b/);
    await expect(form).toBeVisible();
  });
});
