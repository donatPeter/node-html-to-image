import type { Page, PuppeteerLifeCycleEvent, PuppeteerNodeLaunchOptions } from "puppeteer";
import type { Screenshot } from "./models/Screenshot";
export declare type Content = Array<{
    output: string;
    selector?: string;
}> | object;
export declare type Encoding = "base64" | "binary";
export declare type ImageType = "png" | "jpeg";
export interface ScreenshotParams {
    html: string;
    encoding?: Encoding;
    transparent?: boolean;
    type?: ImageType;
    quality?: number;
    selector?: string;
    content?: Content;
    output?: string;
}
export interface Options extends ScreenshotParams {
    puppeteerArgs?: PuppeteerNodeLaunchOptions;
    browserTimeout?: number;
    maxConcurrency?: number;
    puppeteer?: any;
    waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    beforeScreenshot?: (page: Page) => void;
}
export interface MakeScreenshotParams {
    screenshot: Screenshot;
    waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    beforeScreenshot?: (page: Page) => void;
    handlebarsHelpers?: {
        [helpers: string]: (...args: any[]) => any;
    };
}
