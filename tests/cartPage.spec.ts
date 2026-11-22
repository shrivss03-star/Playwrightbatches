import { expect, test } from "@playwright/test";
import { CartPage } from "../Pages/cartPage";
import { dashboardPage } from "../Pages/dashBoardPage";
import { LoginPage } from "../Pages/loginPage";
import loginData from "../Testdata/login.json";
import productData from "../Testdata/product.json";

let cartPage: CartPage;
let loginPage: LoginPage;
let dashboard: dashboardPage;
const product = productData[0];

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboard = new dashboardPage(page);
    cartPage = new CartPage(page);

    await loginPage.launchUrl(loginData.url);
    await loginPage.loginIntoApplication(loginData.email, loginData.password);
    await expect(loginPage.homepageIdentifier).toBeVisible();
    await dashboard.searchProduct(product.productName, "add to cart");
    await expect(dashboard.addtoCartMessage).toContainText(product.successMessage);
    await dashboard.navigateToCart();
});

test("cart shows the selected product and proceeds to payment", async ({ page }) => {
    await expect(cartPage.heading).toBeVisible();
    await expect(cartPage.productHeading(product.productName)).toBeVisible();
    await cartPage.proceedToPayment();
    await expect(page).toHaveURL(/\/dashboard\/order/);
});
