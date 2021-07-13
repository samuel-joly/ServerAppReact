import React from "react";
import { SIGNIN, SIGNOUT } from "./type";
import { UserReducer } from "./reducers/UserReducer";
import { UserContext } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export function UserState(props) {
	const [state, dispatch] = React.useReducer(UserReducer, {
		userData: {
			email: "PasConnecté@PasdeCompte.null",
			username: "Vous n'êtes pas connecté",
			token: null,
		},
		isLoading: true,
		isSignout: true,
	});

	async function setDataToStorage(data,key) {
		let parsedData = JSON.stringify(data);
		await AsyncStorage.setItem(key, parsedData);
	}

	async function signIn(email, password) {
		const {data} = await axios.post("/auth", {
			url: "/auth",
			method: "post",
			data: {
				username:email,
				password:password,
			},
            headers: {
                "Content-Type":"application/json",
            }
		});
        console.log(data)
		dispatch({ type: SIGNIN, data});
		setDataToStorage(data, "user");
	}

	async function signOut() {
		dispatch({ type: SIGNOUT });
		await AsyncStorage.removeItem("user");
	}

	return (
		<UserContext.Provider value={{ signIn, signOut, state, dispatch }}>
			{props.children}
		</UserContext.Provider>
	);
}
