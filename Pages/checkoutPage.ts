import { Locator, Page } from "@playwright/test";
export class myCart{

    page:Page
    buyNowButton: Locator
    DeleteButton: Locator
    checkOutButton: Locator
    cartPageHeading: Locator

    constructor(page:Page){
        this.page=page
        this.DeleteButton= this.page.locator('div .fa-trash-o')
        this.buyNowButton= this.page.getByText('Buy Now')
        this.checkOutButton= this.page.getByText('Checkout')
    }

    async verifyCratheading(){
        awa

    }

}