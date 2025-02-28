export interface userAccountObj {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}
export interface userSignUp {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}
export interface testUserInterface {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export interface transaction {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  amount: string;
  note: string;
  type: string;
}
