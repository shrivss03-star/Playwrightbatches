import { from } from "node:stream/iter";
import {test,expect} from '@playwright/test'
import { LoginPage } from "../Pages/loginPage";
import data from '../Testdata/login.json'

let lp:LoginPage  //create the instance at global level
test.beforeEach('login scenario', async({page})=>{
  lp= new LoginPage(page)
 await lp.launchUrl(data.url)
}
)
test('login validatio', async({page})=>{
    // creating an object or instance of the class
   await lp.loginIntoApplication(data.email, data.password)
   await expect(lp.homepageIdentifier).toBeVisible()
})

test('invalid login', async({page})=>{

    await lp.loginIntoApplication(data.email, data.invalidpassword)
    await expect(lp.errorMessage).toBeVisible()
})
