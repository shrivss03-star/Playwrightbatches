
import {test,expect} from '@playwright/test'
import { LoginPage } from '../Pages/loginPage'
import { dashboardPage } from '../Pages/dashBoardPage'
import data from "../Testdata/login.json"
import productdata from "../Testdata/product.json"

let lp: LoginPage
let dp: dashboardPage

test.beforeEach(async({page})=>{
    lp= new LoginPage(page)
    dp = new dashboardPage(page)

    //launch the url
    await lp.launchUrl(data.url)
    await lp.loginIntoApplication(data.email, data.password)
    await expect(lp.homepageIdentifier).toBeVisible()
})

for(let p of productdata){
    test(`add to cart ${p.productName}`, async()=>{
        await dp.searchProduct(p.productName,"add to cart")
        await expect(dp.addtoCartMessage).toContainText(p.successMessage)
        await dp.navigateToCart()


    })

    test(`view product ${p.productName}`, async()=>{
        await dp.searchProduct(p.productName,"view")
        await expect(dp.viewpageProdcutName).toBeVisible()


    })
}
