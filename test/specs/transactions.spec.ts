
import loginPage from "../../pageobjects/login.page.js";
import topNavigation from "../../pageobjects/topNav.page.ts";
import sideNavigation from "../../pageobjects/sideNav.page.ts";
import transactionsPage from "../../pageobjects/transactions.page.ts";
import helper from "../../support/helper.js";
import testUser from "../../fixtures/myAccountPage.ts";
import { testUserInterface } from "../../types/interfaces.ts";

describe("Transactions test Cases", () => {
  let userAccount: testUserInterface;
  beforeEach(async () => {
    userAccount = await testUser.heath93();
    await loginPage.open();
    await loginPage.login(userAccount.username, userAccount.password);
  });

  it("Request payment to person in contact list", async () => {
    const randomUser = await helper.getRandomUser();
    await topNavigation.menuIcon.click();
    randomUser["type"] = "Requested";
    await transactionsPage.performTransaction(randomUser);
    await transactionsPage.verifyConfirmationPage(randomUser);
    sideNavigation.homeButton.click();
    sideNavigation.logout.click();
  });

  it("Make payment to person in contact list", async () => {
    const randomUser = await helper.getRandomUser();
    await topNavigation.menuIcon.click();
    randomUser["type"] = "Paid";
    await transactionsPage.performTransaction(randomUser);
    await transactionsPage.verifyConfirmationPage(randomUser);
    sideNavigation.homeButton.click();
    sideNavigation.logout.click();
  });
});
