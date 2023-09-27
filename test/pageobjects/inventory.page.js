import { $, $$ } from '@wdio/globals'
import Page from './page.js';

class InventoryPage extends Page {

    // Element representing the shopping cart link
    get shoppingCartElement() {
        return $('.shopping_cart_link');
    }

    // Element representing the shopping cart badge
    get cartBadgeElement() {
        return $('.shopping_cart_badge');
    }

    // Element representing the title on the products page
    get productsTitleElement() {
        return $('.title');
    }

    // List of elements representing product names
    get productNamesList() {
        return $$(".inventory_item_name");
    }

    // List of elements representing product prices
    get productPricesList() {
        return $$(".inventory_item_price");
    }

    // Element representing the menu button
    get menuButtonElement() {
        return $('#react-burger-menu-btn');
    }

    // Element representing the menu container
    get menuElement() {
        return $('.bm-menu');
    }

    // List of elements representing menu items
    get menuItemsList() {
        return $$('.bm-item-list a');
    }

    // List of elements representing "Add to Cart" buttons for products
    get addToCartButtonsList() {
        return $$("button[id*='add-to-cart']");
    }

    // Element representing the product sort dropdown
    get productSortDropdownElement() {
        return $(".select_container select");
    }

    // Element representing the option to sort products by ascending price
    get optionPriceAscendingElement() {
        return $("option[value='lohi']");
    }

    // Element representing the option to sort products by descending price
    get optionPriceDescendingElement() {
        return $("option[value='hilo']");
    }

    // Element representing the option to sort products by ascending name
    get optionNameAscendingElement() {
        return $("option[value='az']");
    }

    // Element representing the option to sort products by descending name
    get optionNameDescendingElement() {
        return $("option[value='za']");
    }

    // Element representing the Twitter link
    get twitterElement() {
        return $('.social_twitter a');
    }

    // Element representing the Facebook link
    get facebookElement() {
        return $('.social_facebook a');
    }

    // Element representing the LinkedIn link
    get linkedinElement() {
        return $('.social_linkedin a');
    }

    // Method to open the menu
    async openMenu() {
        (await this.menuButtonElement).click();
    }

    // Method to log out from the application
    async logout() {
        (await this.menuItemsList[2]).click();
    }

    // Method to add a random product to the cart and return its index
    async addRandomProductToCart() {
        const randomIndex = Math.floor(Math.random() * await this.addToCartButtonsList.length);
        await this.addToCartButtonsList[randomIndex].click();
        return randomIndex;
    }

    // Method to navigate to the shopping cart
    async goToShoppingCart() {
        (await this.shoppingCartElement).click();
    }

    // Method to sort products by name in ascending order
    async sortProductsByNameAscending() {
        (await this.optionNameAscendingElement).click();
    }

    // Method to sort products by name in descending order
    async sortProductsByNameDescending() {
        (await this.optionNameDescendingElement).click();
    }

    // Method to sort products by price in ascending order
    async sortProductsByPriceAscending() {
        (await this.optionPriceAscendingElement).click();
    }

    // Method to sort products by price in descending order
    async sortProductsByPriceDescending() {
        (await this.optionPriceDescendingElement).click();
    }

    // Method to navigate to the Twitter page
    async goToTwitterPage() {
        (await this.twitterElement).click();
    }

    // Method to navigate to the Facebook page
    async goToFacebookPage() {
        (await this.facebookElement).click();
    }

    // Method to navigate to the LinkedIn page
    async goToLinkedInPage() {
        (await this.linkedinElement).click();
    }
}

export default new InventoryPage();
