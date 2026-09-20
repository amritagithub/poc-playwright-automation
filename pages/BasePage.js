export class BasePage {

    constructor(page, logger, config) {

    this.page = page;
    this.logger = logger;
    this.config = config;
     console.log("CONFIG OBJECT:", config);

}
async waitForLoader(
    loaderSelector,
    timeout = this.config.defaultTimeout
) {
    this.logger?.debug(
        `Waiting for loader to disappear: ${loaderSelector}`
    );

    try {
        await this.page
            .locator(loaderSelector)
            .first()
            .waitFor({
                state: 'hidden',
                timeout
            });

        this.logger?.info(
            `Loader is no longer visible: ${loaderSelector}`
        );

    } catch (error) {
        this.logger?.error(
            `Loader did not disappear: ${loaderSelector}. ${error.message}`
        );

        throw new Error(
            `Timed out waiting for loader "${loaderSelector}" to disappear`,
            { cause: error }
        );
    }
}
async navigate(url = this.config.baseUrl) {

    this.logger.info(`Navigating to: ${url}`);

    await this.page.goto(url);

    this.logger.info(`Navigation completed: ${url}`);
}
    async click(locator) {

        this.logger?.debug(`Clicking element: ${locator}`);

        try {
            await this.page.locator(locator).click();

            this.logger?.info(`Successfully clicked: ${locator}`);

        } catch (error) {

            this.logger?.error(
                `Failed to click element: ${locator}. Error: ${error.message}`
            );

            throw new Error(
                `Click failed for locator "${locator}": ${error.message}`
            );
        }
    }

    async fill(locator, value) {

        this.logger?.debug(`Filling element: ${locator}`);

        try {
            await this.page.locator(locator).fill(value);

            this.logger?.info(`Successfully filled: ${locator}`);

        } catch (error) {

            this.logger?.error(
                `Failed to fill element: ${locator}. Error: ${error.message}`
            );

            throw new Error(
                `Fill failed for locator "${locator}": ${error.message}`
            );
        }
    }

    async selectDropdown(locator, value) {

        this.logger?.debug(
            `Selecting "${value}" from dropdown: ${locator}`
        );

        try {
            await this.page
                .locator(locator)
                .selectOption(value);

            this.logger?.info(
                `Successfully selected "${value}" from ${locator}`
            );

        } catch (error) {

            this.logger?.error(
                `Failed dropdown selection on ${locator}. Error: ${error.message}`
            );

            throw new Error(
                `Dropdown selection failed for "${locator}": ${error.message}`
            );
        }
    }

    async hover(locator) {

        this.logger?.debug(`Hovering over: ${locator}`);

        try {
            await this.page.locator(locator).hover();

            this.logger?.info(`Successfully hovered over: ${locator}`);

        } catch (error) {

            this.logger?.error(
                `Failed to hover over ${locator}. Error: ${error.message}`
            );

            throw new Error(
                `Hover failed for "${locator}": ${error.message}`
            );
        }
    }

    async doubleClick(locator) {

        this.logger?.debug(`Double clicking: ${locator}`);

        try {
            await this.page.locator(locator).dblclick();

            this.logger?.info(
                `Successfully double clicked: ${locator}`
            );

        } catch (error) {

            this.logger?.error(
                `Failed double click on ${locator}. Error: ${error.message}`
            );

            throw new Error(
                `Double click failed for "${locator}": ${error.message}`
            );
        }
    }

    async scrollIntoView(locator) {

        this.logger?.debug(
            `Scrolling element into view: ${locator}`
        );

        try {
            await this.page
                .locator(locator)
                .scrollIntoViewIfNeeded();

        } catch (error) {

            this.logger?.error(
                `Failed to scroll ${locator}. Error: ${error.message}`
            );

            throw new Error(
                `Scroll failed for "${locator}": ${error.message}`
            );
        }
    }

    async pressKey(locator, key) {

        this.logger?.debug(
            `Pressing key "${key}" on ${locator}`
        );

        try {
            await this.page
                .locator(locator)
                .press(key);

        } catch (error) {

            this.logger?.error(
                `Failed to press "${key}" on ${locator}. Error: ${error.message}`
            );

            throw new Error(
                `Keyboard action failed for "${locator}": ${error.message}`
            );
        }
    }

    async safeType(locator, value) {

        this.logger?.debug(
            `Safely typing into: ${locator}`
        );

        try {

            const element = this.page.locator(locator);

            await element.waitFor({
                state: 'visible'
            });

            await element.fill(value);

        } catch (error) {

            this.logger?.error(
                `Safe type failed for ${locator}. Error: ${error.message}`
            );

            throw new Error(
                `Safe type failed for "${locator}": ${error.message}`
            );
        }
    }

    async waitForElement(locator, state = 'visible') {

        this.logger?.debug(
            `Waiting for ${locator} to be ${state}`
        );

        try {

            await this.page
                .locator(locator)
                .waitFor({ state });

        } catch (error) {

            this.logger?.error(
                `Wait failed for ${locator}. Error: ${error.message}`
            );

            throw new Error(
                `Wait failed for "${locator}" with state "${state}": ${error.message}`
            );
        }
    }

    async highlightElement(locator) {

        this.logger?.debug(
            `Highlighting element: ${locator}`
        );

        await this.page.locator(locator).evaluate(
            element => {

                element.style.border = '3px solid red';
            }
        );
    }
}