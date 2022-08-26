export const logInMock = async (email: string, password: string) => {
  console.log(email + ' ' + password);
  return true;
};
