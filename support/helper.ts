import { $, expect } from "@wdio/globals";
import sideNavObjects from "../pageobjects/sideNav.page";
import contactList from '../fixtures/users.ts'
import { testUserInterface } from "../types/interfaces.ts";

class helper {
  public async assertSideMenuItems() {
    expect(sideNavObjects.userFullName).toBeDisplayed();
    expect(sideNavObjects.homeButton).toBeDisplayed();
    expect(sideNavObjects.myAccount).toBeDisplayed();
    expect(sideNavObjects.bankAccounts).toBeDisplayed();
    expect(sideNavObjects.notifications).toBeDisplayed();
    expect(sideNavObjects.logout).toBeDisplayed();
  }
  public async assertPageTitle(title: string) {
    const elem = $("div h2");
    await elem.waitForExist();
    await expect(elem).toHaveText(title);
  }
  public async getRandomUser(loggedInUser: testUserInterface) {
    const userList = await contactList.users()
    const selectUser = userList.users.filter(e => e.username != loggedInUser.username)
    return selectUser[Math.floor(Math.random() * selectUser.length)]
  }
}

export default new helper();