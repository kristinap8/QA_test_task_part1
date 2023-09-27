import { $, $$ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {

    // Element representing the login input field
    get loginInputField() {
        return $('#user-name');
    }

    // Element representing the password input field
    get passwordInputField() {
        return $('#password');
    }

    // Element representing the login button
    get loginButtonElement() {
        return $('#login-button');
    }

    // List of elements representing 'x' icons in form
    get xIconsList() {
        return $$('.form_group svg');
    }

    // Element representing the error message container
    // This container displays an error message if login fails.
    get errorMessageElement() {
        return $('[class="error-message-container error"] h3');
    }

    // Method to set login credentials in the input fields
    // This method sets the provided login and password in the respective input fields.
    async setLoginCredentials(login, password) {
        await this.loginInputField.setValue(login);
        await this.passwordInputField.setValue(password);
    }

    // Method to perform the login action
    // This method clicks the login button to initiate the login process.
    async login() {
        await this.loginButtonElement.click();
    }
}

export default new LoginPage();
