import { expect } from "@wdio/globals";

class bankAccountsPage {
  public get modalTitle(): ChainablePromiseElement  {
    return $("[data-test=user-onboarding-dialog-title]");
  }
  public get modalNextButton(): ChainablePromiseElement  {
    return $("[data-test=user-onboarding-next]");
  }
  public get modalBankTitle(): ChainablePromiseElement  {
    return $("data-test=user-onboarding-dialog-title");
  }
  public get modalNameInput(): ChainablePromiseElement  {
    return $("#bankaccount-bankName-input");
  }
  public get modalRoutingInput(): ChainablePromiseElement  {
    return $("#bankaccount-routingNumber-input");
  }
  public get modalAccountNumberInput(): ChainablePromiseElement  {
    return $("#bankaccount-accountNumber-input");
  }
  public get modalSaveButton(): ChainablePromiseElement  {
    return $("[data-test=bankaccount-submit]");
  }
  public get modalFinishedButton(): ChainablePromiseElement  {
    return $("[data-test=user-onboarding-next]");
  }
  public async confirmNewUserModal(): ChainablePromiseElement  {
    expect(this.modalTitle).toBeDisplayed();
    this.modalNextButton.click();
  }
  public async bankName() {
    const elem = $("div h2");
    await elem.waitForExist();
  }  
  public get createButton(): ChainablePromiseElement  {
    return $("[data-test=bankaccount-new]");
  }
  public get deleteButton(): ChainablePromiseElement  {
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
