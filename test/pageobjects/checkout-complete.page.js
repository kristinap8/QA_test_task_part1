import { $, $$ } from '@wdio/globals'
import Page from './page.js';

class CheckoutCompletePage extends Page {
    // Element representing the page title
    // This is the title displayed on the checkout complete page.
    get pageTitleElement() {
        return $(".title");
    }

    // Element representing the completion message
    // This element displays a message indicating the completion of the checkout process.
    get completionMessageElement() {
        return $('.complete-header');
    }

    // Element representing the home button
    // Clicking this button allows the user to return to the product listing page.
    get homeButtonElement() {
        return $('#back-to-products');
    }

    // Method to navigate back to the product listing page
    // This method clicks the home button to return to the product listing page.
    async navigateToProductListing() {
        // Click on the home button
        (await this.homeButtonElement).click();
    }
}

export default new CheckoutCompletePage();
