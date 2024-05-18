const validUser = {
  email: "admin@admin.com",
  password: "secret_admin"
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
  noValidUser,
  userWithoutEmail,
  userWithoutPassword,
  userWithoutData
}