import { computed } from "vue";
import { store } from "@/store";

// get type of authentication
const authentication = computed(() => store.state.admin.currentAuthentication);

const _authenticateLocal = ({ userId, password }) => {
  // return promise
  return new Promise((resolve) => {
    // resolve with credentials check boolean 
    return resolve(userId == null && password.toString() == "111");
  });
};

export const authenticate = async (payload) => {
  // if current authentication is local
  if (authentication.value == "local") return _authenticateLocal(payload);
};
