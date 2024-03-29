import {After, AfterAll, Before, BeforeAll, Status} from "@cucumber/cucumber";
import {Browser, BrowserContext, chromium, Page} from "@playwright/test";
import {fixture} from "./page.fixture";
import {invokeBrowser} from "../helper/browsers/browser.manager";
import {getEnv} from "../helper/env/env";
import {createLogger} from "winston";
import {options} from "../helper/util/logger";
import * as fs from 'fs';


let page: Page;
let browser: Browser;
let context: BrowserContext

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({pickle}) {
    const scenarioName  = pickle.name + pickle.id;
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos"
        }
    });
    page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName))
});

After(async function ({pickle, result}) {
    //Screenshot for failure scenario
    let videoPath: string;
    let img: Buffer;
    console.log(result?.status)
    if (result?.status == Status.FAILED) {
        videoPath = await fixture.page.video().path();
        img = await fixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}.png`, type: "png"})
    }
    await fixture.page.close();
    await context.close();

    if (result?.status == Status.FAILED) {
        this.attach(img, "image/png");
        this.attach(fs.readFileSync(videoPath), 'video/webm');
    }
});

AfterAll(async function () {
    await browser.close();
    //fixture.logger.close();
});
