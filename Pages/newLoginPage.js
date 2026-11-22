import { Locator, Page } from "@playwright/test";

export class newLoginPage {

constructor(page){// construsctor will have parameter as page
    this.page = page
    this.email = this.page.getByPlaceholder('email@example.com')
    this.password = this.page.locator('#userPassword')
    this.errorMessage =this.page.locator('#toast-container')
    this.homepageIdentifier = this.page.getByText('Automation Practice')
    this.loginButton = this.page.locator('#login')
}
// action goes inside the method
// fill. check. click etc
//variable declartion in typescripte::
// let x =10// thhis is in js
// let y:number =10 // this is in ts

async launchUrl(url){
    await this.page.goto(url)
}

async loginIntoApplication(username, password){
    await this.email.fill(username)
    await this.password.fill(password)
    await this.loginButton.click()
}


}
