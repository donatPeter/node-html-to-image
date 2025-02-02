"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeHtmlToImage = void 0;
const puppeteer_cluster_1 = require("puppeteer-cluster");
const Screenshot_1 = require("./models/Screenshot");
const screenshot_1 = require("./screenshot");
function nodeHtmlToImage(options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { html, encoding, transparent, content, output, selector, type, quality, puppeteerArgs = {}, puppeteer = undefined, } = options;
        const cluster = yield puppeteer_cluster_1.Cluster.launch({
            concurrency: puppeteer_cluster_1.Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: (_a = options.maxConcurrency) !== null && _a !== void 0 ? _a : 2,
            puppeteerOptions: Object.assign(Object.assign({}, puppeteerArgs), { headless: true }),
            timeout: (_b = options.browserTimeout) !== null && _b !== void 0 ? _b : 30000,
            puppeteer: puppeteer,
        });
        const shouldBatch = Array.isArray(content);
        const contents = shouldBatch ? content : [Object.assign(Object.assign({}, content), { output, selector })];
        try {
            const screenshots = yield Promise.all(contents.map((content) => {
                const { output, selector: contentSelector } = content, pageContent = __rest(content, ["output", "selector"]);
                return cluster.execute({
                    html,
                    encoding,
                    transparent,
                    output,
                    content: pageContent,
                    selector: contentSelector ? contentSelector : selector,
                    type,
                    quality,
                }, ({ page, data }) => __awaiter(this, void 0, void 0, function* () {
                    const screenshot = yield (0, screenshot_1.makeScreenshot)(page, Object.assign(Object.assign({}, options), { screenshot: new Screenshot_1.Screenshot(data) }));
                    return screenshot;
                }));
            }));
            yield cluster.idle();
            yield cluster.close();
            return shouldBatch
                ? screenshots.map(({ buffer }) => buffer)
                : screenshots[0].buffer;
        }
        catch (err) {
            console.error(err);
            yield cluster.close();
            process.exit(1);
        }
    });
}
exports.nodeHtmlToImage = nodeHtmlToImage;
