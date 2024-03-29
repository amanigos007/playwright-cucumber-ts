import {After, AfterAll, Before, BeforeAll, Status} from "@cucumber/cucumber";
import {Browser, BrowserContext, chromium, Page} from "@playwright/test";
import {fixture} from "./page.fixture";
import {invokeBrowser} from "../helper/browsers/browser.manager";
import {getEnv} from "../helper/env/env";
import {createLogger} from "winston";
import {options} from "../helper/util/logger";


let page: Page;
let browser: Browser;
let context: BrowserContext

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({pickle}) {
    const scenarioName  = pickle.name + pickle.id;
    context = await browser.newContext();
    page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName))
});

After(async function ({pickle, result}) {
    //Screenshot for failure scenario
    console.log(result?.status)
    if (result?.status == Status.FAILED) {
        const img = await fixture.page.screenshot({path: `./screenshots/${pickle.name}.png`, type: "png"})
        this.attach(img, "image/png");
    }
    await fixture.page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
    fixture.logger.close();
});
