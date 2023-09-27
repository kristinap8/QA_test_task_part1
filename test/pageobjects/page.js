import { browser } from '@wdio/globals'


export default class Page {

    get base_url() {
        return 'https://www.saucedemo.com/';
    }

    open(path) {
        return browser.url(this.base_url + path);
    }
}
