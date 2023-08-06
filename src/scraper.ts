import puppeteer from "puppeteer";

export async function scrapeWebsite(url: string): Promise<unknown> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const content = await page.evaluate(() => {
    const title = document.title;
    const content = document.querySelector("body")?.textContent || "";

    return {
      title,
      content,
    };
  });

  await browser.close();

  return content;
}
