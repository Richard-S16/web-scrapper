import express, { Request, Response } from "express";
import { scrapeWebsite } from "./scraper";

const app = express();

app.get("/", (req: Request, res: Response) =>
  res.send("Hello World from app.ts!")
);

app.get("/scrape", async (req: Request, res: Response) => {
  const url = req.query.url as string;

  if (!url) {
    return res.status(400).send("URL parameter is required.");
  }

  try {
    const data = await scrapeWebsite(url);
    res.json({ title: data });
  } catch (error) {
    res.status(500).send("Error scraping the website.");
  }

  return;
});

export default app;
