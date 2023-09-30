import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { userApi } from "../../scripts/apiCalls.js";

import { ethers } from "ethers";

const UserState = (props) => {
	const [provider, setProvider] = useState(
		window.ethereum != null
			? new ethers.BrowserProvider(window.ethereum)
			: null
	);
	const [isConnected, setIsConnected] = useState(false);
	const [userAccount, setUserAccount] = useState("");
	const [iswalletAvailable, setIsWalletAvailable] = useState(true);
	const [userData, setUserData] = useState({});
	const [user, setUser] = useState({});
	// const [userEvents, setUserEvents] = useState([
	// 	{
	// 		id: "1",
	// 		name: "Test Event",
	// 		description: "Description",
	// 		startDate: "2023-07-16",
	// 		endDate: "2023-07-25",
	// 		participants: 100,
	// 		type: "public",
	// 		voteOptions: [
	// 			"option 1",
	// 			"option 2",
	// 			"option 3",
	// 			"option 4",
	// 			"option 5",
	// 			"option 6",
	// 			"option 7",
	// 			"option 8",
	// 			"option 9",
	// 			"option 10",
	// 			"option 11",
	// 		],
	// 	},
	// ]);
	const [userEvents, setUserEvents] = useState(
		JSON.parse(localStorage.getItem("MYEVENTS")) || []
	);
	const [userVotes, setUserVotes] = useState(
		JSON.parse(localStorage.getItem("MYVOTES")) || []
	);
	const [userEventIds, setUserEventIds] = useState(
		(userEvents.length > 0 && userEvents.map((event) => event.id)) || []
	);
	useEffect(() => {
		localStorage.setItem("MYEVENTS", JSON.stringify(userEvents));
		localStorage.setItem("MYVOTES", JSON.stringify(userVotes));
	}, [userEvents, userVotes]);
	const poppulateUserAccount = () => {
		setIsWalletAvailable(window.ethereum != null);
		setProvider(
			window.ethereum != null
				? new ethers.BrowserProvider(window.ethereum)
				: null
		);
		if (
			window.ethereum !== null &&
			window.ethereum.selectedAddress !== null &&
			window.ethereum.selectedAddress !== ""
		) {
			setIsConnected(true);
			setUserAccount(window.ethereum.selectedAddress);
			setUser({
				walletAddress: window.ethereum.selectedAddress,
				nickname: null,
				profileImageUrl: null,
			});
			// poppulateUserData(window.ethereum.selectedAddress);
		} else {
			setIsConnected(false);
			setUserAccount("");
		}
	};

	// const poppulateUserData = async () => {
	// 	await userApi({ account: window.ethereum.selectedAddress })
	// 		.then((res) => {
	// 			console.log(res);
	// 			setUserData(res);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	useEffect(() => {
		setTimeout(() => {
			poppulateUserAccount();
		}, 1000);
	}, []);

	const login = async () => {
		await provider
			.send("eth_requestAccounts", [])
			.then((res) => {
				setIsConnected(true);
			})
			.catch((err) => {});
		poppulateUserAccount();
	};

	return (
		<UserContext.Provider
			value={{
				provider,
				login,
				iswalletAvailable,
				isConnected,
				userAccount,
				userData,
				// poppulateUserData,
				userEvents,
				setUserEvents,
				userEventIds,
				setUserEventIds,
				userVotes,
				setUserVotes,
				user,
			}}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
