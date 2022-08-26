import {auth} from '../../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  deleteUser,
} from 'firebase/auth';

export const createAccount = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      return true;
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error code: ' + errorCode);
      console.log('Error message: ' + errorMessage);
      return false;
      // ..
    });
};

export const logIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log('user');
      console.log(user);
      return true;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error code: ' + errorCode);
      console.log('Error message: ' + errorMessage);
      return false;
    });
};

export const handleSignOut = async () => {
  return signOut(auth)
    .then(() => {
      console.log('Sign out');
      return true;
    })
    .catch(error => {
      console.log(error.message);
      return false;
    });
  // return true;
};

export const deleteAccount = async () => {
  const user = auth.currentUser as User;
  console.log(user);
  return deleteUser(user)
    .then(() => {
      return true;
    })
    .catch(error => {
      console.log(error.message);
      return false;
    });
};
