import { RESTOK, SIGNIN, SIGNOUT } from "../type";

export function UserReducer(prevState, { type, data }) {
  switch (type) {
    case RESTOK:
      return {
        ...prevState,
        token: data.token,
      };
    case SIGNIN:
      return {
        ...prevState,
        userData: {
          email: data.user.email,
          username: data.user.username,
        },
        token: data.token,
      };
    case SIGNOUT:
      return {
        ...prevState,
        userData: null,
        token: null,
      };
  }
}
