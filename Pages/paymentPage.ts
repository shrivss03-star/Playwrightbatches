import { Locator, Page } from "@playwright/test";

export interface PaymentDetails {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardholderName: string;
    country: string;
}

export class PaymentPage {
     page: Page;
    paymentMethodHeading: Locator;
    cardNumber: Locator;
    expiryMonth: Locator;
    expiryYear: Locator;
    cvv: Locator;
    cardholderName: Locator;
    country: Locator;
    placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paymentMethodHeading = this.page.getByText("Payment Method", { exact: true });
        this.cardNumber = this.page.locator(".field").filter({ hasText: "Credit Card Number" }).locator("input");
        const expiryFields = this.page.locator(".field.small").filter({ hasText: "Expiry Date" }).locator("select");
        this.expiryMonth = expiryFields.nth(0);
        this.expiryYear = expiryFields.nth(1);
        this.cvv = this.page.locator(".field.small").filter({ hasText: "CVV Code" }).locator("input");
        this.cardholderName = this.page.locator(".field").filter({ hasText: "Name on Card" }).locator("input");
        this.country = this.page.getByPlaceholder("Select Country");
        this.placeOrderButton = this.page.getByText("Place Order", { exact: true });
    }

    async fillPaymentDetails(details: PaymentDetails): Promise<void> {
        await this.cardNumber.fill(details.cardNumber);
        await this.expiryMonth.selectOption(details.expiryMonth);
        await this.expiryYear.selectOption(details.expiryYear);
        await this.cvv.fill(details.cvv);
        await this.cardholderName.fill(details.cardholderName);
        await this.country.fill("");
        await this.country.pressSequentially(details.country, { delay: 100 });
        await this.page.locator(".ta-results").getByText(details.country, { exact: true }).click();
    }

    async placeOrder(): Promise<void> {
        await this.placeOrderButton.click();
    }
}
