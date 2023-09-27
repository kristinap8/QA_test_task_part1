import { expect } from '@wdio/globals';
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';

const validLogin = "standard_user";
const validPassword = "secret_sauce";

describe('Inventory page', () => {
    beforeEach(async () => {
        // Steps before running the test cases
        // User is logged in to an account
        // User is on the inventory page
        await LoginPage.open('');
        await LoginPage.setLoginCredentials(validLogin, validPassword);
        await LoginPage.login();
    });

    // Test Case ID: 5
    // Test Case Title: Saving the card after logout
    // Objective: Cart
    it("should save the card after logout", async () => {

        // Verify that the cart badge is not displayed
        await expect(InventoryPage.cartBadgeElement).not.toBeDisplayed();

        // Add a random product to the cart
        const productInd = await InventoryPage.addRandomProductToCart();
        const productName = await InventoryPage.productNamesList[productInd].getText();

        // Verify that the cart badge now displays '1'
        await expect(InventoryPage.cartBadgeElement).toHaveText('1');

        // Show the menu and verify that it is displayed
        await InventoryPage.openMenu();
        await expect(InventoryPage.menuElement).toBeDisplayed();

        // Verify that each menu item is displayed
        for await (const menuItem of InventoryPage.menuItemsList) {
            await expect(menuItem).toBeDisplayed();
        }

        // Log out and verify the URL and input values
        await InventoryPage.logout();
        await expect(browser).toHaveUrl(LoginPage.base_url);
        await expect(LoginPage.loginInputField).toHaveValue('');
        await expect(LoginPage.passwordInputField).toHaveValue('');

        // Log in again
        await LoginPage.setLoginCredentials(validLogin, validPassword);
        await LoginPage.login();

        // Verify the URL and page elements
        await expect(browser).toHaveUrlContaining('inventory');
        await expect(InventoryPage.shoppingCartElement).toBeDisplayed();
        await expect(InventoryPage.productNamesList).toBeDisplayed();

        // Navigate to the cart and verify its contents
        await InventoryPage.goToShoppingCart();
        await expect(CartPage.pageTitleElement).toBeDisplayed();
        await expect(CartPage.productNamesList[0]).toHaveText(productName);
    });

    // Test Case ID: 6
    // Test Case Title: Sorting
    // Objective: Products
    it("should sort products", async () => {

        // Get the prices of products before any sorting
        const pricesBeforeFilter = InventoryPage.productPricesList.map(async function (el) {
            return parseFloat((await el.getText()).replace(/[$]/g, ''));
        });

        // Sort products by ascending prices and get the prices after sorting
        await InventoryPage.sortProductsByPriceAscending();
        const pricesAfterFilterAsc = InventoryPage.productPricesList.map(async function (el) {
            return parseFloat((await el.getText()).replace(/[$]/g, ''));
        });

        // Verify that products are sorted in ascending order
        const sortedPricesAscending = await pricesBeforeFilter.sort((a, b) => a - b);
        await expect(sortedPricesAscending).toEqual(await pricesAfterFilterAsc);

        //  Sort products by descending prices and get the prices after sorting
        await InventoryPage.sortProductsByPriceDescending();
        const pricesAfterFilterDesc = InventoryPage.productPricesList.map(async function (el) {
            return parseFloat((await el.getText()).replace(/[$]/g, ''));
        });

        // Verify that products are sorted in descending order
        await expect(sortedPricesAscending.reverse()).toEqual(await pricesAfterFilterDesc)

        // Get the names of products before any sorting
        const namesBeforeFilter = InventoryPage.productNamesList.map(el => el.getText());

        // Sort products by descending names and get the names after sorting
        await InventoryPage.sortProductsByNameDescending();
        const namesAfterFilterDesc = InventoryPage.productNamesList.map(el => el.getText());

        // Verify that products are sorted in descending order by names
        await expect((await namesBeforeFilter).sort().reverse()).toEqual(await namesAfterFilterDesc);

        // Sort products by ascending names and get the names after sorting
        await InventoryPage.sortProductsByNameAscending();
        const namesAfterFilterAsc = InventoryPage.productNamesList.map(el => el.getText());

        // Verify that products are sorted in ascending order by names
        await expect((await namesBeforeFilter).sort()).toEqual(await namesAfterFilterAsc);
    });

    // Test Case ID: 7
    // Test Case Title: Footer links
    // Objective: Footer
    it("should check footer links", async () => {

        // Click on the Twitter link and switch to the new tab
        await InventoryPage.goToTwitterPage();
        // Pause for 5 seconds to allow the new tab to load
        await browser.pause(5000);
        let tabs = await browser.getWindowHandles();
        // Switch to the new tab
        await browser.switchToWindow(tabs[1]);
        // Verify the URL of the new tab
        await expect(browser).toHaveUrl("https://twitter.com/saucelabs");

        // Switch back to the main tab
        await browser.switchToWindow(tabs[0]);

        // Click on the Facebook link and switch to the new tab
        await InventoryPage.goToFacebookPage();
        await browser.pause(5000);
        tabs = await browser.getWindowHandles();
        await browser.switchToWindow(tabs[2]);
        await expect(browser).toHaveUrl("https://www.facebook.com/saucelabs");

        // Switch back to the main tab
        await browser.switchToWindow(tabs[0]);

        // Click on the LinkedIn link and switch to the new tab
        await InventoryPage.goToLinkedInPage();
        await browser.pause(5000);
        tabs = await browser.getWindowHandles();
        await browser.switchToWindow(tabs[3]);
        await expect(browser).toHaveUrl("https://www.linkedin.com/company/sauce-labs/");
    });
})