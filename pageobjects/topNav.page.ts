class topNavigation {
  public get menuIcon(): ChainablePromiseElement {
    return $("[data-testid=MenuIcon]");
  }
  public get appNameLogo(): ChainablePromiseElement {
    return $(".NavBar-logo");
  }
  public get newButton(): ChainablePromiseElement {
    return $("[data-testid=AttachMoneyIcon]");
  }
  public get notificationsIcon(): ChainablePromiseElement {
    return $("[data-testid=NotificationsIcon]");
  }
  assertElementsDisplayed() {
    expect(this.menuIcon).toBeDisplayed();
    expect(this.appNameLogo).toBeDisplayed();
    expect(this.newButton).toBeDisplayed();
    expect(this.notificationsIcon).toBeDisplayed();
  }
}
export default new topNavigation();
