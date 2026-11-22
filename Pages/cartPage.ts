import { Locator, Page } from "@playwright/test";

export class CartPage {
    page: Page;
    heading: Locator;
    checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = this.page.getByRole("heading", { name: "My Cart", exact: true });
        this.checkoutButton = this.page.getByRole("button", { name: /Checkout/ });
    }

    productHeading(productName: string): Locator {
        return this.page.getByRole("heading", { name: productName, exact: true });
    }

    async proceedToPayment(): Promise<void> {
        await this.checkoutButton.click();
    }
}
