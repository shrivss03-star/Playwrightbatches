//locator and method present in the page
import { Locator,Page } from "@playwright/test";
export class dashboardPage{
    page:Page
    products: Locator
    homepageProducrPrice: Locator
    viewpageProdcutPrice: Locator
    addtoCartMessage: Locator
    cartButton: Locator
    viewpageProdcutName: Locator

    constructor(page:Page){
        this.page= page
        this.products = this.page.locator('div .card-body')
        this.homepageProducrPrice = this.page.locator('div .text-muted')
        this.viewpageProdcutName = this.page.locator('.rtl-text h2 ')
        this.viewpageProdcutPrice = this.page.locator('.rtl-text h3')
        this.addtoCartMessage = this.page.locator('#toast-container')
        this.cartButton = this.page.locator('[routerlink="/dashboard/cart"]')

    }
    //methods

    async searchProduct(productName:string, button:'view'|'add to cart'){
        await this.products.nth(0).waitFor()
        //capture all the product count and itrate through the products
        const countofproduct= await this.products.count()

        for(let i=0; i<countofproduct;i++){
            //pick one product from list
            const product = await this.products.nth(i)
            //read the name of product and get the text
            //below line is called locator chaining
            const productText =await product.locator('b').textContent()
            // const productTexts = await this.products.locator('b').textContent()

            if(productText?.trim().toLowerCase()=== productName.trim().toLowerCase()){
                //find the button on which we need to perform action
                await product.getByRole('button',{name:button}).click()
                break

            }
        }
    }

    async navigateToCart(){
        await this.cartButton.click()
    }


}