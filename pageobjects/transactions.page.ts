import { $ } from "@wdio/globals";
import { transaction } from "../types/interfaces.ts";
import { DateTime } from "luxon";

class transactionsPage {
  public get moneyIcon(): ChainablePromiseElement {
    return $("[data-testid=AttachMoneyIcon]");
  }
  public get searchBar(): ChainablePromiseElement {
    return $("[data-test=user-list-search-input]");
  }
  public async finderUserInSearchResults(userId: string) {
    return $(`[data-test=user-list-item-${userId}]`);
  }
  public get amountField(): ChainablePromiseElement {
    return $("#amount");
  }
  public get notesField(): ChainablePromiseElement {
    return $("#transaction-create-description-input");
  }
  public get requestButton(): ChainablePromiseElement {
    return $("[data-test=transaction-create-submit-request]");
  }
  public get everyoneTab(): ChainablePromiseElement {
    return $("[data-test=nav-public-tab]");
  }
  public get payButton(): ChainablePromiseElement {
    return $("[data-test=transaction-create-submit-payment]");
  }
  public get mineTab(): ChainablePromiseElement {
    return $("[data-test=nav-personal-tab]");
  }
  public get friendsTab(): ChainablePromiseElement {
    return $('[data-test="nav-contacts-tab"]');
  }
  public get thumbsUpButton(): ChainablePromiseElement {
    return $("[data-testid=ThumbUpAltOutlinedIcon]");
  }
  public get transactionLikeButton(): ChainablePromiseElement {
    return $("[data-test*=transaction-like-button-]");
  }
  public get commentTextField(): ChainablePromiseElement {
    return $("[data-test*=transaction-comment-input-]");
  }
  public get transactionsTable(): ChainablePromiseElement {
    return $("[role=rowgroup]");
  }
  public get transactionLikes(): ChainablePromiseElement {
    const roleGroup = this.transactionsTable;
    return roleGroup.$$("[data-test=transaction-like-count]");
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
  async getTimestamp() {
    return DateTime.now().toFormat("MM/dd/yyyy HH:mm:ss");
  }

  async findTransaction(count: number) {
    const likes = await this.transactionLikes;
    for (const k of likes) {
      const likesCount = await k.getText();
      if (parseInt(likesCount) == count) {
        await k.click();
        break;
      } else {
        throw new Error(
          `There were no transactions with ${count} likes found!`
        );
      }
    }
  }
}

export default new transactionsPage();
