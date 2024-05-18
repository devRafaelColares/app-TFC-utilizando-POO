const validUser = {
  email: "admin@admin.com",
  password: "secret_admin"
};

const invalidEmailUser = {
  email: 'user@example',
  password: "secret_admin"
};

const invalidPasswordUser = {
  email: "admin@admin.com",
  password: 'abc',
};

const noValidUser = {
  email: "abc",
  password: "abc"
};

const userWithoutEmail = {
  password: "secret_admin"
};

const userWithoutPassword = {
  email: "admin@admin.com",
};

const userWithoutData = {};

export default {
  validUser,
  invalidEmailUser,
  invalidPasswordUser,
  noValidUser,
  userWithoutEmail,
  userWithoutPassword,
  userWithoutData
}