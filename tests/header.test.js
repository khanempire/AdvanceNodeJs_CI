const Page = require("./helpers/page");
let page;
beforeEach(async () => {
   page = await Page.build();
   await page.goto("https://localhost:3000");
});

afterEach(async () => {
   await page.close();
});

test("we can launch the browser", async () => {
   //const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);
   const text = await page.getContentsOf("a.brand-logo");
   expect(text).toEqual("Blogster");
});

test("clicking login starts with OAuth flow", async () => {
   await page.click(".right a");

   const url = await page.url();
   expect(url).toMatch(/accounts\.google\.com/);
});

test("when signed in, shows logout button", async () => {
   //const id = "6234c85d21b9eb5350599860";
   await page.login();
   const text = await page.$eval(
      'a[href="/auth/logout"]',
      (el) => el.innerHTML
   );
   console.log(text);
   expect(text).toEqual("Logout");
});
