import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import UserContext from "../../context/userContext/UserContext.js";

const Navbar = () => {
	const navigate = useNavigate();
	const user = useContext(UserContext);
	const [isMenu, setIsMenu] = useState(false);
	const [lang, setLang] = useState(i18next.language);
	const { t } = useTranslation();
	const handleChange = (value) => {
		i18next.changeLanguage(value);
		setLang(value);
	};
	const Menubar = () => {
		return (
			<div className="menubar">
				<div
					className="menupad"
					onClick={() => {
						setIsMenu(!isMenu);
					}}></div>
				<div
					className="menuitem"
					onClick={() => {
						redirect("/home");
						setIsMenu(false);
					}}>
					{t("navbar.home")}
				</div>
				<div
					className="menuitem"
					onClick={() => {
						navigate("/vote");
						setIsMenu(false);
					}}>
					{t("navbar.voting")}
				</div>
				<div
					className="menuitem"
					onClick={() => {
						redirect("/rating");
						setIsMenu(false);
					}}>
					{t("navbar.rating")}
				</div>
				<div
					className="menuitem"
					onClick={() => {
						redirect("/review");
						setIsMenu(false);
					}}>
					{t("navbar.review")}
				</div>
				<div
					className="menuitem"
					onClick={() => {
						redirect("/bitwallet");
						setIsMenu(false);
					}}>
					{t("Navbar.bitwallet")}
				</div>
			</div>
		);
	};
	return (
		<div className="navbar">
			<div className="logocontainer">
				{/* <img
					src={logo}
					alt="BIT DAO"
					onClick={() => navigate("/home")}
					style={{
						width: "150px",
						height: "80px",
					}}
				/> */}
				BIT DAO
			</div>
			<div className="navbuttoncontainer">
				<div className="navbutton" onClick={() => navigate("/home")}>
					{t("navbar.home")}
				</div>
				<div className="navbutton" onClick={() => navigate("/vote")}>
					{t("navbar.vote")}
				</div>
				<div className="navbutton" onClick={() => navigate("/rate")}>
					{t("navbar.rate")}
				</div>
				<div className="navbutton" onClick={() => navigate("/review")}>
					{t("navbar.review")}
				</div>
				<div
					className="navbutton"
					onClick={() => navigate("/bitwallet")}>
					{t("Navbar.bitwallet")}
				</div>
			</div>

			<div className="navrightbuttoncontainer">
				{/* <div class="dropdown">
					<svg
						className="language-select"
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 24 24"
						class="dropbtn2"
						height="1.5rem"
						width="1.5rem"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"></path>
					</svg>
					<div class="dropdown-content2">
						<a
							onClick={() => {
								handleChange("ar");
							}}
							value={"ar"}>
							العربية
						</a>
						<a
							onClick={() => {
								handleChange("en");
							}}
							value={"en"}>
							English
						</a>
					</div>
				</div> */}

				{user.iswalletAvailable ? (
					user.isConnected ? (
						<div className="whitebutton">
							<button onClick={() => navigate("/dashboard")}>
								{/* <DashboardIcon
									sx={{ fontSize: 20, marginRight: "5px" }}
								/> */}
								{t("Navbar.Dashboard")}
							</button>
						</div>
					) : (
						<div className="whitebutton">
							<button
								onClick={() => {
									user.login();
								}}>
								{t("navbar.connect")}
							</button>
						</div>
					)
				) : (
					<div className="whitebutton">
						<button
							onClick={() => {
								window.open("https://metamask.io");
							}}>
							{t("navbar.getWallet")}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
