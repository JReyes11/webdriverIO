class homePage {
  public get transactionList() {
    return $("[data-test=transaction-list]");
  }
}
export default new homePage();
