import { from } from "node:stream/iter";
import{test, expect} from '@playwright/test'
import { LoginPage } from "../Pages/loginPage";
// provide all the hardcoaded value: 
const url='https://rahulshettyacademy.com/client/#/auth/login'
let email='test.vss@gmail.in'
let password='Test@12345'
let errorMessage ='Incorrect email or password.'
let invalidpassword ='abced345'


let lp:LoginPage  //create the instance at global level
test.beforeEach('login scenario', async({page})=>{
  lp= new LoginPage(page)
 await lp.launchUrl(url)
}
)
test('login validatio', async({page})=>{
    // creating an object or instance of the class
//    const lp = new LoginPage(page)
//    await lp.launchUrl(url)
   await lp.loginIntoApplication(email, password)
   await expect(lp.homepageIdentifier).toBeVisible()
})

test('invalid login', async({page})=>{
    const lp= new LoginPage(page)
    await lp.launchUrl(url)
    await lp.loginIntoApplication(email, invalidpassword)
    await expect(lp.errorMessage).toBeVisible()
})
