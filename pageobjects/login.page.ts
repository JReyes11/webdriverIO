import { $ } from "@wdio/globals";
import Page from "./page.js";
import contactList from "../fixtures/users.js";

class loginPage extends Page {
  public get inputUsername(): ChainablePromiseElement {
    return $("#username");
  }
  public get inputPassword(): ChainablePromiseElement {
    return $("#password");
  }
  public get btnSubmit(): ChainablePromiseElement {
    return $('button[type="submit"]');
  }
  public async login(username: string, password: string) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }
  public open() {
    return super.open("login");
  }
  public randomUserLogin() {
    const list = contactList.users();
    return list.users[Math.floor(Math.random() * list.users.length)];
  }
}

export default new loginPage();
