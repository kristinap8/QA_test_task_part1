import { expect } from '@wdio/globals';
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import CheckoutInfoPage from '../pageobjects/checkout-info.page.js';
import CheckoutCompletePage from '../pageobjects/checkout-complete.page.js';

const validLogin = "standard_user";
const validPassword = "secret_sauce";

describe('Cart page', () => {
    beforeEach(async () => {
        // Steps before running the test cases
        // User is logged in to an account
        // User is on the inventory page
        await LoginPage.open('');
        await LoginPage.setLoginCredentials(validLogin, validPassword);
        await LoginPage.login();
    });

    // Test Case ID: 8
    // Test Case Title: Valid Checkout
    // Objective: Checkout
    it("should process checkout with valid product", async () => {
        // Ensure the cart badge is not displayed initially
        await expect(InventoryPage.cartBadgeElement).not.toBeDisplayed();

        // Add a random product to the cart and retrieve its name and price
        const productInd = await InventoryPage.addRandomProductToCart();
        const productName = await InventoryPage.productNamesList[productInd].getText();
        const productPrice = await InventoryPage.productPricesList[productInd].getText();

        // Verify that the cart badge now displays '1'
        await expect(InventoryPage.cartBadgeElement).toHaveText('1');

        // Navigate to the cart page and verify the product is listed
        await InventoryPage.goToShoppingCart();
        await expect(CartPage.pageTitleElement).toBeDisplayed();
        await expect(CartPage.productNamesList[0]).toHaveText(productName);

        // Go to the checkout page
        await CartPage.initiateCheckout();
        await expect(CheckoutInfoPage.checkoutFormElement).toBeDisplayed();

        // Fill in user information
        const name = "Name";
        const lastName = "Last name";
        const postalCode = "1111";
        await CheckoutInfoPage.fillCheckoutInformation(name, lastName, postalCode);

        // Verify the filled-in information matches
        await expect(await CheckoutInfoPage.firstNameInput).toHaveValue(name);
        await expect(await CheckoutInfoPage.lastNameInput).toHaveValue(lastName);
        await expect(await CheckoutInfoPage.postalCodeInput).toHaveValue(postalCode);

        // Continue to the overview page
        await CheckoutInfoPage.continueWithCheckout();
        await expect(CheckoutPage.pageTitleElement).toHaveTextContaining("Overview");

        // Verify the product and total price on the overview page
        await expect(CheckoutPage.itemNamesList[0]).toHaveText(productName);
        await expect("$" + (await (await CheckoutPage.totalPriceElement).getText()).split("$")[1]).toBe(productPrice);

        // Finish the checkout process
        await CheckoutPage.completeCheckout();
        await expect(CheckoutCompletePage.pageTitleElement).toHaveText("Checkout: Complete!");
        await expect(CheckoutCompletePage.completionMessageElement).toHaveText("Thank you for your order!");

        // Return to the inventory page
        await CheckoutCompletePage.navigateToProductListing();
        await expect(browser).toHaveUrlContaining('inventory');
        await expect(InventoryPage.productNamesList).toBeDisplayed();

        // Ensure the cart badge is not displayed after successful checkout
        await expect(InventoryPage.cartBadgeElement).not.toBeDisplayed();
    });

    // Test Case ID: 9
    // Test Case Title: Checkout without products
    // Objective: Checkout
    it("should not process checkout with empty cart", async () => {
        // Click on the cart to proceed to the cart page
        await InventoryPage.goToShoppingCart();

        // Ensure the cart page is displayed
        await expect(CartPage.pageTitleElement).toBeDisplayed();

        // Verify that no products are listed in the cart
        await expect(CartPage.productNamesList).not.toBeExisting();

        // Attempt to proceed with checkout and expect an error message
        await CartPage.initiateCheckout();
        await expect(CartPage.pageTitleElement).toHaveText("Your Cart");
        await expect(CartPage.errorMessage).toHaveText("Cart is empty");
    });
});
