import { $, $$ } from '@wdio/globals'
import Page from './page.js';

class CheckoutPage extends Page {

    // Element representing the page title on the checkout overview page
    get pageTitleElement() {
        return $('.title');
    }

    // List of elements representing the names of items in the cart
    get itemNamesList() {
        return $$(".inventory_item_name");
    }

    // Element representing the total price of items in the cart without tax
    get totalPriceElement() {
        return $('.summary_subtotal_label');
    }

    // Element representing the "Finish" button to complete the checkout
    get finishButtonElement() {
        return $('#finish');
    }

    // Method to complete the checkout process
    // This method clicks the "Finish" button to complete the checkout.
    async completeCheckout() {
        (await this.finishButtonElement).click();
    }
}

export default new CheckoutPage();
