import {Given, setDefaultTimeout, Then, When} from "@cucumber/cucumber";
import {expect} from "@playwright/test";
import {fixture} from "../../hooks/page.fixture";

setDefaultTimeout(60 * 1000 * 2);

Given('user navigates to application', async function () {
    await fixture.page.goto(`${process.env.BASEURL}index.html`);
    fixture.logger.info("Navigated to the application successfully")
});

Given('user click on the login link', async function () {
    await fixture.page.goto(`${process.env.BASEURL}index.html`);
    fixture.logger.info("Navigated to the login page successfully")
});


When('user enter the username as {string}', async function (username) {
    await fixture.page.getByPlaceholder("Username").fill(username);
    fixture.logger.info(`Username '${username}' was entered`)
});


When('user enter the password {string}', async function (password) {
    await fixture.page.getByPlaceholder("Password").fill(password);
    fixture.logger.info(`Password '${password}' was entered`)
});


When('user click on the login button', async function () {
    await fixture.page.locator("#login-button").click();
    fixture.logger.info(`Login button is clicked`)
});


Then('login should be successful', async function () {
    await expect(fixture.page.locator("#header_container")).toBeVisible();
    await fixture.page.waitForTimeout(2_000);
    fixture.logger.info(`Logged in successfully`)
});

Then('login should be unsuccessful', async function () {
    await expect(fixture.page.locator("h3[data-test='error']")).toBeVisible();
    await fixture.page.waitForTimeout(2_000);
    fixture.logger.info(`Logged in unsuccessful`)
});

