import { $ } from "@wdio/globals";
import { transaction } from "../types/interfaces.ts";
import { DateTime } from "luxon";

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
  public get thumbsUpButton() {
    return $("[data-testid=ThumbUpAltOutlinedIcon]");
  }
  public get transactionLikeButton() {
    return $("[data-test*=transaction-like-button-]");
  }
  public get commentTextField() {
    return $("[data-test*=transaction-comment-input-]");
  }
  async performTransaction(dataObject: transaction) {
    await this.moneyIcon.click();
    await this.searchBar.setValue(dataObject.firstName);
    const findUserInResults = await this.finderUserInSearchResults(
      dataObject.id
    );
    await findUserInResults.click();
    await this.amountField.setValue(dataObject.amount);
    await this.notesField.setValue(
      DateTime.now().toFormat("MM/dd/yyyy HH:mm:ss")
    );
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

  async likeAndComment(userFirstName: string) {
    const roleGroup = await $("[role=rowgroup]");
    const items = await roleGroup.$$("[data-test*=transaction-item]");
    for (const k of items) {
      const elem = await $("[data-test=transaction-like-count]");
      const likeCount = await elem.getText();
      if (parseInt(likeCount) == 0) {
        await elem.click();
        break;
      }
    }
    const thumbsUpBtn = this.transactionLikeButton;
    expect(thumbsUpBtn).toBeDisplayed();
    expect(thumbsUpBtn).toBeEnabled();
    await thumbsUpBtn.click();
    const commentField = this.commentTextField;
    await commentField.click();
    const currentDT = DateTime.now().toFormat("MM/dd/yyyy HH:mm:ss");
    await commentField.addValue(`[${currentDT}] Approved by ${userFirstName}`);
    await commentField.addValue("\uE007");
  }
}

export default new transactionsPage();
