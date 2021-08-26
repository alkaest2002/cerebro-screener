import { computed } from "vue";
import { store } from "@/store";

// get type of authentication
const authentication = computed(() => store.state.admin.currentAuthentication);

const _authenticateLocal = ({ userId, password }) => {
  console.log(userId == null && password.toString() == "111")
  // return promise
  return new Promise((resolve) => {
    // return resolve or reject
    return resolve(userId == null && password.toString() == "111");
  });
}

export const authenticate = async (payload) => {
  // if current authentication is local
  if (authentication.value == "local") 
    return _authenticateLocal(payload)
};
