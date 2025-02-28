import { $, expect } from "@wdio/globals";
import { testUserInterface } from "../types/interfaces.ts";

class myAccount {
  public get firstName() {
    return $("#user-settings-firstName-input");
  }
  public get lastName() {
    return $("#user-settings-lastName-input");
  }
  public get emailAddress() {
    return $("[data-test=user-settings-email-input]");
  }
  public get phoneNumber() {
    return $("#user-settings-phoneNumber-input");
  }
  public get saveButton() {
    return $("[data-test=user-settings-submit]")
  }
  async verifyUserInformation(userAccount: testUserInterface) {
    const firstName = await this.firstName.getValue();
    expect(firstName).toEqual(userAccount.firstName);
    const lastName = await this.lastName.getValue();
    expect(lastName).toEqual(userAccount.lastName);
    const email = await this.emailAddress.getValue();
    expect(email).toEqual(userAccount.email);
    const phoneNumber = await this.phoneNumber.getValue();
    expect(phoneNumber).toEqual(userAccount.phoneNumber);
    const saveBtn = this.saveButton
    expect(saveBtn).toBeEnabled();
  }
}

export default new myAccount();
