import { $ } from "@wdio/globals";
import { transaction } from "../types/interfaces.ts";

class transactionsPage {
  public get moneyIcon() {
    return $("[data-testid=AttachMoneyIcon]");
  }
  public get searchBar() {
    return $("[data-test=user-list-search-input]");
  }
  public async finderUserInSearchResults(userId: string) {
    return $(`[data-test=user-list-item-${userId}]`);
  }
  public get amountField() {
    return $("#amount");
  }
  public get notesField() {
    return $("#transaction-create-description-input");
  }
  public get requestButton() {
    return $("[data-test=transaction-create-submit-request]");
  }
  public get payButton() {
    return $("[data-test=transaction-create-submit-payment]");
  }
  public get mineTab() {
    return $("[data-test=nav-personal-tab]");
  }
  public get friendsTab() {
    return $('[data-test="nav-contacts-tab"]');
  }
  async performTransaction(dataObject: transaction) {
    await this.moneyIcon.click();
    await this.searchBar.setValue(dataObject.firstName);
    const findUserInResults = await this.finderUserInSearchResults(
      dataObject.id
    );
    await findUserInResults.click();
    await this.amountField.setValue(dataObject.amount);
    await this.notesField.setValue(dataObject.note);
    if (dataObject.type == "Requested") {
      await this.requestButton.click();
    } else {
      await this.payButton.click();
    }
  }
  async verifyConfirmationPage(dataObject: transaction) {
    const confirmContact = await this.confirmationPageText(
      dataObject.firstName
    );
    expect(await confirmContact).toContain(dataObject.firstName);
    const confirmTransactionType = await this.confirmationPageText(
      dataObject.type
    );
    expect(confirmTransactionType).toContain(dataObject.type);
    const confirmAmount = await this.confirmationPageText(
      `$${dataObject.amount}`
    );
    expect(confirmAmount).toContain(dataObject.amount);
  }

  async confirmationPageText(value: string) {
    const elems = await $$("//h2"); // Get all <h2> elements
    for (const elem of elems) {
      const text = await elem.getText();
      if (text.includes(value)) {
        return text;
      }
    }
    return false;
  }
}

export default new transactionsPage();
