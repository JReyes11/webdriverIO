class topNavigation {
  public get menuIcon() {
    return $("[data-testid=MenuIcon]");
  }
  public get appNameLogo() {
    return $(".NavBar-logo");
  }
  public get newButton() {
    return $("[data-testid=AttachMoneyIcon]");
  }
  public get notificationsIcon() {
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
