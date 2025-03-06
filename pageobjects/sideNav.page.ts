import { $ } from "@wdio/globals";

class sideNavigation {
  public get userFullName(): ChainablePromiseElement {
    return $("[data-test=sidenav-user-full-name]");
  }
  public get homeButton(): ChainablePromiseElement {
    return $('[data-test="sidenav-home"]');
  }
  public get myAccount(): ChainablePromiseElement {
    return $("[data-test=sidenav-user-settings]");
  }
  public get bankAccounts(): ChainablePromiseElement {
    return $('[data-test="sidenav-bankaccounts"]');
  }
  public get notifications(): ChainablePromiseElement {
    return $('[data-test="sidenav-notifications"]');
  }
  public get logout(): ChainablePromiseElement {
    return $("[data-testid=ExitToAppIcon]");
  }
  assertElementsDisplayed(): ChainablePromiseElement {
    expect(this.userFullName).toBeDisplayed();
    expect(this.homeButton).toBeDisplayed();
    expect(this.myAccount).toBeDisplayed();
    expect(this.bankAccounts).toBeDisplayed();
    expect(this.notifications).toBeDisplayed();
    expect(this.logout).toBeDisplayed();
  }
  assertElementsNotDisplayed(): ChainablePromiseElement {
    expect(this.userFullName).not.toBeDisplayed();
    expect(this.homeButton).not.toBeDisplayed();
    expect(this.myAccount).not.toBeDisplayed();
    expect(this.bankAccounts).not.toBeDisplayed();
    expect(this.notifications).not.toBeDisplayed();
    expect(this.logout).not.toBeDisplayed();
  }
}
export default new sideNavigation();
