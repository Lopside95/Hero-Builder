// import { test, expect } from "@playwright/test";

// test("createLocalHero", async ({ page }) => {
//   await page.goto("http://localhost:3000/");
//   await page.getByRole("link", { name: "continue" }).click();
//   await page.locator('button[name="boots"]').first().click();
//   await page.locator('button[name="weapon"]').first().click();
//   await page
//     .locator(
//       "div:nth-child(2) > div > div > .overflow-hidden > div > div > .rounded-lg > #undefined-form-item > .inline-flex"
//     )
//     .first()
//     .click();
//   await page.getByPlaceholder("Hero name").click();
//   await page.getByPlaceholder("Hero name").fill("Playwright");
//   await page.getByRole("button", { name: "Submit" }).click();
//   await page.getByRole("combobox").click();
//   await page.getByRole("link", { name: "Local Profile" }).click();
// });
