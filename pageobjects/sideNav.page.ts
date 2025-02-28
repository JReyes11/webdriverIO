import { $ } from "@wdio/globals";

class sideNavigation {
  public get userFullName() {
    return $("[data-test=sidenav-user-full-name]");
  }
  public get homeButton() {
    return $('[data-test="sidenav-home"]');
  }
  public get myAccount() {
    return $("[data-test=sidenav-user-settings]");
  }
  public get bankAccounts() {
    return $('[data-test="sidenav-bankaccounts"]');
  }
  public get notifications() {
    return $('[data-test="sidenav-notifications"]');
  }
  public get logout() {
    return $("[data-testid=ExitToAppIcon]");
  }
  assertElementsDisplayed() {
    expect(this.userFullName).toBeDisplayed();
    expect(this.homeButton).toBeDisplayed();
    expect(this.myAccount).toBeDisplayed();
    expect(this.bankAccounts).toBeDisplayed();
    expect(this.notifications).toBeDisplayed();
    expect(this.logout).toBeDisplayed();
  }
  assertElementsNotDisplayed() {
    expect(this.userFullName).not.toBeDisplayed();
    expect(this.homeButton).not.toBeDisplayed();
    expect(this.myAccount).not.toBeDisplayed();
    expect(this.bankAccounts).not.toBeDisplayed();
    expect(this.notifications).not.toBeDisplayed();
    expect(this.logout).not.toBeDisplayed();
  }
}
export default new sideNavigation();
