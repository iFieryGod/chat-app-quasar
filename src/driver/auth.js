import { Auth } from 'aws-amplify';

export async function signIn(email = '', password = '') {
  try {
    return await Auth.signIn({
      username: email,
      password,
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function signUp(email = '', password = '') {
  try {
    return await Auth.signUp({
      username: email,
      password: `${password}`,
      attributes: {
        email,
      },
      validationData: [],
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function validateUser(username = '', code = '') {
  try {
    // eslint-disable-next-line no-console
    console.log('confirm registration', username, code);
    await Auth.confirmSignUp(username, code);
    return Promise.resolve(true);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function resendValidationCode(username = '') {
  try {
    return await Auth.resendSignUp(username);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function signOut() {
  try {
    return await Auth.signOut();
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function changePassword(oldPassword = '', newPassword = '') {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return Auth.changePassword(user, `${oldPassword}`, `${newPassword}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getCurrentAuthUser() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return Promise.resolve({
      id: user.username,
      email: user.signInUserSession.idToken.payload.email,
      username: user.username,
    });
  } catch (err) {
    return Promise.reject(err);
  }
}
