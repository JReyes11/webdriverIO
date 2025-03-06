
import loginPage from "../../pageobjects/login.page.js";
import topNavigation from "../../pageobjects/topNav.page.ts";
import sideNavigation from "../../pageobjects/sideNav.page.ts";
import transactionsPage from "../../pageobjects/transactions.page.ts";
import helper from "../../support/helper.js";
import { testUserInterface } from "../../types/interfaces.ts";

describe("Transactions test Cases", () => {
  let userAccount: testUserInterface;  
  beforeEach(async () => {  
    userAccount = loginPage.randomUserLogin()    
    await loginPage.open();
    await loginPage.login(userAccount.username, userAccount.password);
  });

  it("Request payment to person in contact list", async () => {
    const randomUser = await helper.getRandomUser(userAccount);
    randomUser["type"] = "Requested";
    randomUser["amount"] = `${Math.floor(Math.random() * 10) + 10}`
    randomUser["note"] = `Requesting ${randomUser.amount} from ${randomUser.firstName}`;    
    await topNavigation.menuIcon.click();         
    await transactionsPage.performTransaction(randomUser);
    await transactionsPage.verifyConfirmationPage(randomUser);
    sideNavigation.homeButton.click();
    sideNavigation.logout.click();
  });

  it("Make payment to person in contact list", async () => {
    const randomUser = await helper.getRandomUser(userAccount);
    randomUser["type"] = "Paid";    
    randomUser["amount"] = `${Math.floor(Math.random() * 10) + 10}`
    randomUser["note"] = `Sending ${randomUser.amount} to ${randomUser.firstName}`;
    await topNavigation.menuIcon.click();
    await transactionsPage.performTransaction(randomUser);
    await transactionsPage.verifyConfirmationPage(randomUser);
    sideNavigation.homeButton.click();
    sideNavigation.logout.click();
  });

  it("Like and comment on friends transaction", async () => {   
    //locate and click on transaction that has zero likes
    await transactionsPage.findTransaction(0)
    // click on thumbsUp button
    const thumbsUpBtn = transactionsPage.transactionLikeButton;    
    expect(thumbsUpBtn).toBeEnabled();
    await thumbsUpBtn.click();
    // Click on comment field and enter comment 
    const commentField = transactionsPage.commentTextField;
    await commentField.click();
    const currentDT = await transactionsPage.getTimestamp()
    await commentField.addValue(`[${currentDT}] Approved by ${userAccount.firstName}`);
    await commentField.addValue("\uE007");
  })
});
