import { store } from "@/store";

export const authenticate = async ({ userId, password }) => {
  // get type of authentication
  const currentAurhentication = store.state.admin.currentAurhentication;
  // if current authentication is local
  if (currentAurhentication == "local") {
    // return promise
    return new Promise((resolve) => {
      // return resolve or reject
      return resolve(userId == null && password.toString() == "111");
    });
  }
};
