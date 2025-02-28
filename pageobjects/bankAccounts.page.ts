import { expect } from "@wdio/globals";

class bankAccountsPage {
  public get modalTitle() {
    return $("[data-test=user-onboarding-dialog-title]");
  }
  public get modalNextButton() {
    return $("[data-test=user-onboarding-next]");
  }
  public get modalBankTitle() {
    return $("data-test=user-onboarding-dialog-title");
  }
  public get modalNameInput() {
    return $("#bankaccount-bankName-input");
  }
  public get modalRoutingInput() {
    return $("#bankaccount-routingNumber-input");
  }
  public get modalAccountNumberInput() {
    return $("#bankaccount-accountNumber-input");
  }
  public get modalSaveButton() {
    return $("[data-test=bankaccount-submit]");
  }
  public get modalFinishedButton() {
    return $("[data-test=user-onboarding-next]");
  }
  public async confirmNewUserModal() {
    expect(this.modalTitle).toBeDisplayed();
    this.modalNextButton.click();
  }
  public async bankName() {
    const elem = $("div h2");
    await elem.waitForExist();
  }  
  public get createButton() {
    return $("[data-test=bankaccount-new]");
  }
  public get deleteButton() {
    return $("[data-test=bankaccount-delete]");
  }
  public async populateNewAccountFields(text: string) {
    const randomNumber = Math.floor(Math.random() * (999-900)) +100000000
    this.modalNameInput.setValue(`${text} Bank`);
    // const accountNumber = parseInt(dayjs().format('MMDDHHmms'))
    this.modalRoutingInput.setValue(randomNumber);
    this.modalAccountNumberInput.setValue(randomNumber+1);
    this.modalSaveButton.click();
    this.modalFinishedButton.click();
  }
  public async assertElementsDisplayed() {
    expect(this.bankName()).toBeDisplayed();
    expect(this.createButton).toBeDisplayed();
    expect(this.deleteButton).toBeDisplayed();
  }
}

export default new bankAccountsPage();
