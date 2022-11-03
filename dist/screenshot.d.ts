import { Page } from "puppeteer";
import { MakeScreenshotParams } from "./types";
export declare function makeScreenshot(page: Page, { screenshot, beforeScreenshot, waitUntil, handlebarsHelpers, }: MakeScreenshotParams): Promise<import("./models/Screenshot").Screenshot>;
