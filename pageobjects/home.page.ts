class homePage {
  public get transactionList(): ChainablePromiseElement  {
    return $("[data-test=transaction-list]");
  } 
}
export default new homePage();
