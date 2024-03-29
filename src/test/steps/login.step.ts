import {Given, setDefaultTimeout, Then, When} from "@cucumber/cucumber";
import {expect} from "@playwright/test";
import {pageFixture} from "../../hooks/page.fixture";

setDefaultTimeout(60 * 1000 * 2);

Given('user navigates to application', async function () {
    await pageFixture.page.goto(`${process.env.BASEURL}index.html`);
    pageFixture.logger.info("Navigated to the application successfully")
});

Given('user click on the login link', async function () {
    await pageFixture.page.goto(`${process.env.BASEURL}index.html`);
    pageFixture.logger.info("Navigated to the login page successfully")
});


When('user enter the username as {string}', async function (username) {
    await pageFixture.page.getByPlaceholder("Username").fill(username);
    pageFixture.logger.info(`Username '${username}' was entered`)
});


When('user enter the password {string}', async function (password) {
    await pageFixture.page.getByPlaceholder("Password").fill(password);
    pageFixture.logger.info(`Password '${password}' was entered`)
});


When('user click on the login button', async function () {
    await pageFixture.page.locator("#login-button").click();
    pageFixture.logger.info(`Login button is clicked`)
});


Then('login should be successful', async function () {
    await expect(pageFixture.page.locator("#header_container")).toBeVisible();
    await pageFixture.page.waitForTimeout(2_000);
    pageFixture.logger.info(`Logged in successfully`)
});

Then('login should be unsuccessful', async function () {
    await expect(pageFixture.page.locator("h3[data-test='error']")).toBeVisible();
    await pageFixture.page.waitForTimeout(2_000);
    pageFixture.logger.info(`Logged in unsuccessful`)
});

