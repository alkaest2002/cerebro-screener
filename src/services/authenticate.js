import { store } from "@/store";

export const authenticate = async ({ userId, password }) => {
  //get type of authentication
  const currentAurhentication = store.state.admin.currentAurhentication;
  // if current authentication is local
  if (currentAurhentication == "local") {
    // return promise
    return new Promise((resolve, reject) => {
      // return resolve or reject
      return userId == null && password.toString() == "111"
        ? resolve(true)
        : reject();
    });
  }
};
