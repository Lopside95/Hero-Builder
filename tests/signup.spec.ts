import { test, expect } from "@playwright/test";

test("signUp", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign up" }).getByRole("link").click();
  // await expect(page).toHaveURL("http://localhost:3000/");
  await page.getByPlaceholder("example@email.com").click();
  await page.getByPlaceholder("example@email.com").fill("test@email.com");
  await page.getByPlaceholder("example@email.com").press("Tab");
  await page.getByPlaceholder("Username").fill("LoopTest");
  await page.getByPlaceholder("Username").press("Tab");
  await page.getByPlaceholder("Password ", { exact: true }).fill("Pass1*");
  await page.getByPlaceholder("Password ", { exact: true }).press("Tab");
  await page.getByPlaceholder("Repeat password ").fill("Pass1*");
  await page.getByRole("img").nth(2).click();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("example@email.com").click();
  await page.getByPlaceholder("example@email.com").press("ControlOrMeta+a");
  await page.getByPlaceholder("example@email.com").fill("test@email.com");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "New hero" }).click();
  await page.locator('button[name="boots"]').first().click();
  await page.locator('button[name="weapon"]').first().click();
  await page.getByRole("button", { name: "Next slide" }).nth(2).click();
  // await page.locator('button[name="details.img"]').first().click();

  await page
    .locator(
      "div:nth-child(2) > div > div > div > .overflow-hidden > div > div:nth-child(2) > .rounded-lg > #undefined-form-item > .inline-flex"
    )
    .click();
  await page.getByPlaceholder("Hero name").click();
  await page.getByPlaceholder("Hero name").fill("Test Hero");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Username").click();
  await page.getByLabel("Username").fill("TestUpdate");
  await page.getByRole("button", { name: "Update" }).click();
});
