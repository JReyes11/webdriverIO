import { $, expect } from "@wdio/globals";
import sideNavObjects from "../pageobjects/sideNav.page";
import contactList from '../fixtures/users.ts'

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
  public async getRandomUser() {
    const userList = await contactList.users()
    return userList.users[Math.floor(Math.random() * userList.users.length)]
  }
}

export default new helper();