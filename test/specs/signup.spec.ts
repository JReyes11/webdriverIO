import { browser } from "@wdio/globals";
import sideNavigation from "../../pageobjects/sideNav.page.ts";
import topNavigation from "../../pageobjects/topNav.page.ts";
import signup from "../../pageobjects/signup.page.ts";
import loginPage from "../../pageobjects/login.page.ts";
import bankAccountsPage from "../../pageobjects/bankAccounts.page.ts";
import { userSignUp } from "../../types/interfaces.ts";

describe("User Signup Test Cases", () => {
  let mockUserData: userSignUp
  beforeEach(async () => {
    mockUserData = signup.generateUserData();
    await browser.url("http://localhost:3000/signup");
  });

  it("Submit blank form; Assert error message", async () => {
    await signup.submitBtn.click() // click submit button when form is empty
    expect(await signup.firstNameHelperText.getText()).toEqual('First Name is required')    
    expect(signup.submitBtn).toBeDisabled()
  })

  it("Assert submit button disabled when text entered is erased", async () => {
    // generate user mock data, populate form, assert submit button enabled
    const mockUserData = signup.generateUserData();
    await signup.populateForm(mockUserData);
    expect(signup.submitBtn).toBeEnabled()

    // clear a single field, assert submit buutton is now disabled.
    await signup.firstName.clearValue() 
    expect(signup.submitBtn).toBeDisabled() 

    // repopulate the cleared field, assert submit button is now enabled.
    await signup.firstName.setValue(mockUserData.firstName)
    expect(signup.submitBtn).toBeEnabled()
  })

  it("Happy Path: SignUp as a new user ", async () => {        
    await signup.populateForm(mockUserData);
    await signup.submitBtn.click()
    await loginPage.login(mockUserData.username, mockUserData.password);
    await bankAccountsPage.confirmNewUserModal();
    await bankAccountsPage.populateNewAccountFields(mockUserData.firstName);
    const firstName = await sideNavigation.userFullName.getText();
    expect(firstName).toContain(mockUserData.firstName);
    sideNavigation.assertElementsDisplayed();
    topNavigation.assertElementsDisplayed();
    sideNavigation.logout.click()
  });
});
