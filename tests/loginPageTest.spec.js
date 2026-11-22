import {test,expect} from '@playwright/test'
import { newLoginPage } from '../Pages/newLoginPage';
import data from '../Testdata/login.json'

let lps  //create the instance at global level
test.beforeEach('login scenario', async({page})=>{
  lps = new newLoginPage(page)
 await lps.launchUrl(data.url)
}
)
test('login validatio', async({page})=>{
    // creating an object or instance of the class
   await lps.loginIntoApplication(data.email, data.password)
   await expect(lps.homepageIdentifier).toBeVisible()
})

test('invalid login', async({page})=>{

    await lps.loginIntoApplication(data.email, data.invalidpassword)
    await expect(lps.errorMessage).toBeVisible()
})
