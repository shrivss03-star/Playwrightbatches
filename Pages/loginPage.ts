import { Locator, Page } from "@playwright/test";

export class LoginPage {

    // provide all the property of an page inside the class
    page:Page
    email: Locator
    password: Locator
    errorMessage: Locator
    homepageIdentifier: Locator
    loginButton: Locator

    constructor(page:Page){// construsctor will have parameter as page
    this.page =page
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

async launchUrl(url:string){
    await this.page.goto(url)
}

async loginIntoApplication(username:string, password:string){
    await this.email.fill(username)
    await this.password.fill(password)
    await this.loginButton.click()
}


}
/*

async username(username:string){
await this.email.fill(username)
}
async password(password:string){
await this.password.fill(password)
}
async loginButton(){
    await this.loginButton.click()

}
*/