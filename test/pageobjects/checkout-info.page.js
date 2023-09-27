import { $, $$ } from '@wdio/globals'
import Page from './page.js';

class CheckoutInfoPage extends Page {
    // Element representing the checkout information form
    // This form contains fields for the user's name, last name, and postal code.
    get checkoutFormElement() {
        return $(".checkout_info");
    }

    // Element representing the first name input field
    get firstNameInput() {
        return $("#first-name");
    }

    // Element representing the last name input field
    get lastNameInput() {
        return $("#last-name");
    }

    // Element representing the postal code input field
    get postalCodeInput() {
        return $("#postal-code");
    }

    // Element representing the "Continue" button to proceed with checkout
    get continueButtonElement() {
        return $("#continue");
    }

    // Method to fill out the checkout information form
    // This method takes user's name, last name, and postal code as parameters and fills out the corresponding form fields.
    async fillCheckoutInformation(name, lastName, postalCode) {
        (await this.firstNameInput).setValue(name);
        (await this.lastNameInput).setValue(lastName);
        (await this.postalCodeInput).setValue(postalCode);
    }

    // Method to continue with the checkout process
    // This method clicks the "Continue" button to proceed with the checkout.
    async continueWithCheckout() {
        (await this.continueButtonElement).click();
    }
}

export default new CheckoutInfoPage();
