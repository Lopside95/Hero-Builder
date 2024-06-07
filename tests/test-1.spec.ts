import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign up" }).getByRole("link").click();
  await page.getByPlaceholder("example@email.com").click();
  await page
    .getByPlaceholder("example@email.com")
    .fill("jameswallington@gmail.com");
  await page.getByPlaceholder("example@email.com").press("Tab");
  await page.getByPlaceholder("Username").fill("LopsideTest");
  await page.getByPlaceholder("Username").press("Tab");
  await page.getByPlaceholder("Password ", { exact: true }).fill("Pass1*");
  await page.getByPlaceholder("Password ", { exact: true }).press("Tab");
  await page.getByPlaceholder("Repeat password ").fill("Pass1*");
  await page.locator('[id="\\:rb\\:-form-item"]').getByRole("img").click();
  await page
    .getByPlaceholder("example@email.com")
    .fill("jameswallington@gmail.com");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "New hero" }).click();
  await page.getByLabel("Close").click();
});
// import { test, expect } from "@playwright/test";

// test("test", async ({ page }) => {
//   await page.goto("http://localhost:3000/");
//   await page.getByRole("button", { name: "Sign up" }).getByRole("link").click();
//   await page.getByPlaceholder("example@email.com").click();
//   await page
//     .getByPlaceholder("example@email.com")
//     .fill("jameswallington@gmail.com");
//   await page.getByPlaceholder("example@email.com").press("Tab");
//   await page.getByPlaceholder("Username").fill("LopsideTest");
//   await page.getByPlaceholder("Username").press("Tab");
//   await page.getByPlaceholder("Password ", { exact: true }).fill("Pass1*");
//   await page.getByPlaceholder("Password ", { exact: true }).press("Tab");
//   await page.getByPlaceholder("Repeat password ").fill("Pass1*");
//   await page.locator('[id="\\:rb\\:-form-item"]').getByRole("img").click();
//   await page
//     .getByPlaceholder("example@email.com")
//     .fill("jameswallington@gmail.com");
//   await page.getByRole("button", { name: "Login" }).click();
//   await page.getByRole("link", { name: "New hero" }).click();
//   await page.getByLabel("Close").click();
//   await page.getByText("Erwin's DaggerDamage:").click({
//     button: "right",
//   });
// });
