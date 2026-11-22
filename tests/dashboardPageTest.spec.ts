import {test, expect} from '@playwright/test'
import { LoginPage } from '../Pages/loginPage'
import { dashboardPage } from '../Pages/dashBoardPage'

const url='https://rahulshettyacademy.com/client/#/auth/login'
let email='test.vss@gmail.in'
let password='Test@12345'
let produectName ="ADIDAS ORIGINAL"

let lp:LoginPage
let dp:dashboardPage

test.beforeEach(async ({page})=>{
    lp = new LoginPage(page)
    dp = new dashboardPage(page)
    await lp.launchUrl(url)
    await lp.loginIntoApplication(email, password)

})

test('add to cart1', async()=>{
    await dp.searchProduct(produectName,'add to cart')
    await expect(dp.addtoCartMessage).toBeVisible()
    await dp.navigateToCart()

})

test('view product', async()=>{
    await dp.searchProduct(produectName,'view')
    await expect(dp.viewpageProdcutName).toHaveText(produectName)
})