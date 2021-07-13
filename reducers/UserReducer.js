import { RESTOK, SIGNIN, SIGNOUT } from "../type";

export function UserReducer(prevState, { type, data }) {
  switch (type) {
    case RESTOK:
      return {
        ...prevState,
        token: data.token,
        isLoading: false,
      };
    case SIGNIN:
      return {
        ...prevState,
        isSignout: false,
        userData: {
          email: data.user.email,
          username: data.user.username,
          avatar: data.user.avatar,
        },
        token: data.token,
      };
    case SIGNOUT:
      return {
        ...prevState,
        userData: null,
        isSignout: true,
        token: null,
      };
  }
}
