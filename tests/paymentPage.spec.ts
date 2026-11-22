import { expect, test } from "@playwright/test";
import { CartPage } from "../Pages/cartPage";
import { dashboardPage } from "../Pages/dashBoardPage";
import { LoginPage } from "../Pages/loginPage";
import { PaymentPage } from "../Pages/paymentPage";
import loginData from "../Testdata/login.json";
import paymentData from "../Testdata/payment.json";
import productData from "../Testdata/product.json";

let paymentPage: PaymentPage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new dashboardPage(page);
    const cartPage = new CartPage(page);
    paymentPage = new PaymentPage(page);
    const product = productData[0];

    await loginPage.launchUrl(loginData.url);
    await loginPage.loginIntoApplication(loginData.email, loginData.password);
    await expect(loginPage.homepageIdentifier).toBeVisible();

    await dashboard.searchProduct(product.productName, "add to cart");
    await expect(dashboard.addtoCartMessage).toContainText(product.successMessage);
    await dashboard.navigateToCart();
    await expect(cartPage.heading).toBeVisible();
    await cartPage.proceedToPayment();
});

test("payment page accepts test card details and places the order", async ({ page }) => {
    await expect(paymentPage.paymentMethodHeading).toBeVisible();
    await expect(paymentPage.cardNumber).toBeVisible();
    await expect(paymentPage.expiryMonth).toBeVisible();
    await expect(paymentPage.expiryYear).toBeVisible();
    await expect(paymentPage.cvv).toBeVisible();
    await expect(paymentPage.cardholderName).toBeVisible();

    await paymentPage.fillPaymentDetails(paymentData);
    await paymentPage.placeOrder();

    await expect(page.getByRole("heading", { name: "Thankyou for the order.", exact: true })).toBeVisible();
});
