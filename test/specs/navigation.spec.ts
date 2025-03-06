import loginPage from "../../pageobjects/login.page.js";
import homePage from "../../pageobjects/home.page.ts";
import myAccount from "../../pageobjects/myAccount.page.ts";
import bankAccountsPage from "../../pageobjects/bankAccounts.page.ts";
import notificationsPage from "../../pageobjects/notifications.page.ts";
import topNavigation from "../../pageobjects/topNav.page.ts";
import sideNavigation from "../../pageobjects/sideNav.page.ts";
import helper from "../../support/helper.js";
import { testUserInterface } from "../../types/interfaces.ts";

describe("Smoke Tests: Navigation Side Panel", () => {
  let userAccount: testUserInterface;
  beforeEach(async () => {
    userAccount = loginPage.randomUserLogin();
    await loginPage.open();
    await loginPage.login(userAccount.username, userAccount.password);
  });
  afterEach(async () => {
    const logout = await sideNavigation.logout
    await logout.click()
  })

  it("Home Page: Expand, Collapse, Navigate, Assert Elements.", async () => {
    topNavigation.assertElementsDisplayed(); // assert top nav menu
    sideNavigation.assertElementsDisplayed(); // assert side nav menu
    await topNavigation.menuIcon.click(); // Close Side Nav.
    sideNavigation.assertElementsNotDisplayed(); // Assert side panel not displayed
    expect(homePage.transactionList.getText()).not.toBeNull(); // transactions not null
    sideNavigation.logout.click(); // logout
  });

  it("My Accounts Page: Expand, Collapse, Navigate, Assert Elements.", async () => {
    sideNavigation.myAccount.click(); // navigaye to My Account page
    await helper.assertPageTitle("User Settings"); // assert title
    topNavigation.assertElementsDisplayed(); // assert top nav menu
    sideNavigation.assertElementsDisplayed(); // assert side nav menu
    await topNavigation.menuIcon.click(); // Close Side Nav.
    sideNavigation.assertElementsNotDisplayed(); // Assert side panel not displayed
    await myAccount.verifyUserInformation(userAccount); // assert elements
    sideNavigation.logout.click(); // logout
  });

  it("Bank Accounts Page: Expand, Collapse, Navigate, Assert Elements.", async () => {
    sideNavigation.bankAccounts.click(); // navigaye to My Account page
    await helper.assertPageTitle("Bank Accounts"); // assert title
    topNavigation.assertElementsDisplayed(); // assert top nav menu
    sideNavigation.assertElementsDisplayed(); // assert side nav menu
    await topNavigation.menuIcon.click(); // Close Side Nav.
    sideNavigation.assertElementsNotDisplayed(); // Assert side panel not displayed
    await bankAccountsPage.assertElementsDisplayed(); // assert elements
    sideNavigation.logout.click(); // logout
  });

  it("Notifications Page: Expand, Collapse, Navigate, Assert Elements.", async () => {
    sideNavigation.notifications.click(); // navigaye to My Account page
    await helper.assertPageTitle("Notifications"); // assert title
    topNavigation.assertElementsDisplayed(); // assert top nav menu
    sideNavigation.assertElementsDisplayed(); // assert side nav menu
    await topNavigation.menuIcon.click(); // Close Side Nav.
    sideNavigation.assertElementsNotDisplayed(); /// Assert side panel not displayed
    expect(await notificationsPage.list.getText()).not.toBeNull(); // transactions text
    sideNavigation.logout.click(); // logout
  });

  it("Close Side Navigation, Open Side navigation, Logout.", async () => {
    await topNavigation.menuIcon.click(); // Close Side Nav.
    sideNavigation.assertElementsNotDisplayed(); // Assert side panel not displayed
    await topNavigation.menuIcon.click(); // Open Side Nav.
    topNavigation.assertElementsDisplayed(); // assert top nav menu
    sideNavigation.logout.click(); // logout
  });
});
