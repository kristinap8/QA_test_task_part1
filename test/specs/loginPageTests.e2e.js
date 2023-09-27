import { expect } from '@wdio/globals'
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from '../pageobjects/inventory.page.js';

const validLogin = "standard_user"
const validPassword = "secret_sauce"

describe('Login page', () => {
    beforeEach(async () => {
        // Steps before running the test cases
        // User is on the login page
        await LoginPage.open('');
    });

    // Test Case ID: 1
    // Test Case Title: Valid Login
    // Objective: Login
    it("should log in with valid credentials", async () => {

        // Set valid login credentials
        await LoginPage.setLoginCredentials(validLogin, validPassword);

        // Verify that the login input has the correct value
        await expect(LoginPage.loginInputField).toHaveValue(validLogin);

        // Verify that the password input has the correct value and type
        await expect(LoginPage.passwordInputField).toHaveValue(validPassword);
        await expect(LoginPage.passwordInputField).toHaveAttribute('type', 'password');

        // Click the login button
        await LoginPage.login();

        // Verify that the URL contains 'inventory' (logged in successfully)
        await expect(browser).toHaveUrlContaining('inventory');

        // Verify that the shopping cart and products names are displayed
        await expect(InventoryPage.shoppingCartElement).toBeDisplayed();
        await expect(InventoryPage.productNamesList).toBeDisplayed();
    })

    // Test Case ID: 2
    // Test Case Title: Login with invalid password
    // Objective: Login
    it("should display error message for invalid password", async () => {
        // Generate a random invalid password
        const invalidPassword = Math.random().toString(36).slice(-8);

        // Set valid login and the generated invalid password
        await LoginPage.setLoginCredentials(validLogin, invalidPassword);

        // Verify that the login input has the correct value
        await expect(LoginPage.loginInputField).toHaveValue(validLogin);

        // Verify that the password input has the generated invalid password value and type
        await expect(LoginPage.passwordInputField).toHaveValue(invalidPassword);
        await expect(LoginPage.passwordInputField).toHaveAttribute('type', 'password');

        // Click the login button
        await LoginPage.login();

        // Verify that X icons are displayed next to input fields
        for await (const xIcon of LoginPage.xIconsList) {
            await expect(xIcon).toBeDisplayed();
        }

        // Get the CSS property of the login input's border-bottom-color
        const fieldUnderlineColor = (await LoginPage.loginInputField.getCSSProperty('border-bottom-color'))['value'].match(/\d+/g).map(Number);

        // Verify that the field underline color is reddish
        await expect(fieldUnderlineColor[0] > 100 &&
            fieldUnderlineColor[0] > fieldUnderlineColor[1] * 2 &&
            fieldUnderlineColor[0] > fieldUnderlineColor[2] * 2).toBeTruthy();

        // Verify the displayed error message
        await expect(LoginPage.errorMessageElement).toHaveText("Epic sadface: Username and password do not match any user in this service");
    });

    // Test Case ID: 3
    // Test Case Title: Login with invalid login
    // Objective: Login
    it("should display error message for invalid login", async () => {
        // Define an invalid login
        const invalidLogin = "standarD_user";

        //  Set login credentials with invalid login
        await LoginPage.setLoginCredentials(invalidLogin, validPassword);

        // Verify that the login input has the invalid login value
        await expect(LoginPage.loginInputField).toHaveValue(invalidLogin);

        // Verify that the password input has the valid password value and type
        await expect(LoginPage.passwordInputField).toHaveValue(validPassword);
        await expect(LoginPage.passwordInputField).toHaveAttribute('type', 'password');

        // Click the login button
        await LoginPage.login();

        // Get the CSS property of the login input's border-bottom-color
        const fieldUnderlineColor = (await LoginPage.loginInputField.getCSSProperty('border-bottom-color'))['value'].match(/\d+/g).map(Number);

        // Verify that the field underline color is reddish
        await expect(fieldUnderlineColor[0] > 100 &&
            fieldUnderlineColor[0] > fieldUnderlineColor[1] * 2 &&
            fieldUnderlineColor[0] > fieldUnderlineColor[2] * 2).toBeTruthy();

        // Verify the displayed error message
        await expect(LoginPage.errorMessageElement).toHaveText("Epic sadface: Username and password do not match any user in this service");
    });

    // Test Case ID: 4
    // Test Case Title: Logout
    // Objective: Login 
    it("should log out", async () => {

        // Set valid login credentials and log in
        await LoginPage.setLoginCredentials(validLogin, validPassword);
        await LoginPage.login();

        // Display the menu and verify that it is displayed
        await InventoryPage.openMenu();
        await expect(InventoryPage.menuElement).toBeDisplayed();

        // Verify that each menu item is displayed
        for await (const menuItem of InventoryPage.menuItemsList) {
            await expect(menuItem).toBeDisplayed();
        }

        // Log out by clicking the logout button    
        await InventoryPage.logout();

        // Verify that logged out was successful
        await expect(browser).toHaveUrl(LoginPage.base_url);

        // Verify that the login input fields are empty after logout
        await expect(LoginPage.loginInputField).toHaveValue('');
        await expect(LoginPage.passwordInputField).toHaveValue('');

    });


})