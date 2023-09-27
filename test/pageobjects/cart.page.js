import { $, $$ } from '@wdio/globals'
import Page from './page.js';

class CartPage extends Page {

    // Element representing the page title
    get pageTitleElement() {
        return $(".header_secondary_container .title");
    }

    // List of elements representing product names
    get productNamesList() {
        return $$('.inventory_item_name');
    }

    // Element representing the checkout button
    get checkoutButtonElement() {
        return $('#checkout');
    }

    // Element representing error messages
    // This element displays an error message when the user attempts to initiate checkout with an empty cart.
    get errorMessageElement() {
        return $('.error-message');
    }

    // Method to initiate the checkout process
    async initiateCheckout() {
        // Click on the checkout button
        (await this.checkoutButtonElement).click();
    }
}

export default new CartPage();
