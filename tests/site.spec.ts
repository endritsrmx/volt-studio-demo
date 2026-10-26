import { test, expect } from "@playwright/test";

const pages = ["/", "/about", "/works", "/works/halo-assistant", "/services", "/services/web-design", "/lab", "/blog", "/contact", "/privacy-policy"];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem("loader-seen", "1");
    } catch {}
  });
});

for (const path of pages) {
  test(`renders ${path} without errors or horizontal overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeAttached();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test("menu opens, expands services and navigates", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: /Services/ }).click();
  await dialog.getByRole("link", { name: /3D Experiences/ }).click();
  await expect(page).toHaveURL(/\/services\/3d-experiences/);
});

test("contact form submits", async ({ page }) => {
  await page.goto("/contact");
  await page.fill("input[name=name]", "Test");
  await page.fill("input[name=email]", "test@example.com");
  await page.fill("textarea[name=message]", "Hello there");
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText(/we.ll be in touch/i)).toBeVisible();
});

test("footer logo switch toggles theme", async ({ page }) => {
  await page.goto("/");
  const sw = page.getByRole("switch", { name: "Toggle footer theme" });
  await sw.scrollIntoViewIfNeeded();
  await sw.click();
  await expect(sw).toHaveAttribute("aria-checked", "true");
});
