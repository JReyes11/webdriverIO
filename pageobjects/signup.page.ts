import { userSignUp } from "../types/interfaces.ts";
import { faker } from "@faker-js/faker";

class signup {
  public get signupLink(): ChainablePromiseElement {
    return $('[data-test="signup"]');
  }
  public get firstName(): ChainablePromiseElement {
    return $("#firstName");
  }
  public get lastName(): ChainablePromiseElement {
    return $("#lastName");
  }
  public get username(): ChainablePromiseElement {
    return $("#username");
  }
  public get password(): ChainablePromiseElement {
    return $("#password");
  }
  public get confirmPassword(): ChainablePromiseElement {
    return $("#confirmPassword");
  }
  public get submitBtn(): ChainablePromiseElement {
    return $("[data-test=signup-submit]");
  }
  public get firstNameHelperText(): ChainablePromiseElement {
    return $("#firstName-helper-text");
  }
  async populateForm(userObject: userSignUp) {
    await this.firstName.setValue(userObject.firstName);
    await this.lastName.setValue(userObject.lastName);
    await this.username.setValue(userObject.username);
    await this.password.setValue(userObject.password);
    await this.confirmPassword.setValue(userObject.confirmPassword);
  }
  generateUserData() {
    const name = faker.person.firstName();
    return {
      firstName: name,
      lastName: faker.person.lastName(),
      username: `${name}${Math.floor(Math.random() * 9999)}`,
      password: "s3cret",
      confirmPassword: "s3cret",
    };
  }
}
export default new signup();
