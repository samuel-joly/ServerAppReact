import { UserReducer } from "./reducers/UserReducer";
import { SIGNIN, SIGNOUT, RESTOK } from "./type";
import { UserContext } from "./UserContext";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export function UserState(props) {
	const [state, dispatch] = React.useReducer(UserReducer, {
		userData: {
			email: null,
			username: null,
		},
		token: null,
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
		dispatch({ type: SIGNIN, data});
		setDataToStorage(data, "user");
	}

	async function signOut() {
		dispatch({ type: SIGNOUT });
		await AsyncStorage.removeItem("user");
	}

	async function setToken() {
			const token = JSON.parse(await AsyncStorage.getItem('user'));
			if(token != null) {
				dispatch({type:RESTOK, data:token})
			}
		}

		return (
			<UserContext.Provider value={{ setToken, signIn, signOut, state, dispatch }}>
			  {props.children}
		    </UserContext.Provider>
	    );
    }
