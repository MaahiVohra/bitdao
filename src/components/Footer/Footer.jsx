import "./Footer.css";

// import logo from "../../assets/logo.png";
import linkedinlogo from "./assets/linkedinlogo.svg";
import instagramlogo from "./assets/instagramlogo.svg";
import Twitterlogo from "./assets/twitter-square-color-icon.svg";
import Telegram from "./assets/telegram-icon.svg";
import { useTranslation } from "react-i18next";
const Footer = () => {
	const { t } = useTranslation();
	return (
		<div className="footer">
			<div className="footerborder"></div>
			<div className="footercontainer">
				<div className="footerlogocontainer">
					{/* <img
						src={logo}
						alt="BEYOND IMAGINATION TECHNOLOGIES"
						onClick={() => {
							window.open("https://www.bitindiaofficial.tech/");
						}}
					/> */}
					BITDAO
				</div>

				<div className="contactcontainer">
					{t("Navbar.Contact_Us")}
					<div>
						<a href="mailto:support@beimagine.tech">
							support@beimagine.tech
						</a>
					</div>
					<div className="socialcontainer">
						<img
							src={linkedinlogo}
							alt=""
							height="40"
							width="40"
							onClick={() => {
								window.open(
									"https://www.linkedin.com/company/beyond-imagination-technlogies-pvt-ltd/?viewAsMember=true"
								);
							}}
						/>
						<img
							src={instagramlogo}
							height="80"
							width="80"
							alt=""
							onClick={() => {
								window.open(
									"https://www.instagram.com/bitindiaofficial/"
								);
							}}
						/>
						<img
							src={Twitterlogo}
							alt=""
							height="35"
							width="35"
							onClick={() => {
								window.open("https://twitter.com/Bit_Memoir");
							}}
						/>
						<img
							src={Telegram}
							alt=""
							style={{ marginLeft: 20 }}
							height="35"
							width="35"
							onClick={() => {
								window.open("https://t.me/bitmemoirofficial");
							}}
						/>
					</div>
				</div>
			</div>
			<div className="copyrightcontainer">{t("Navbar.copyright")}</div>
		</div>
	);
};

export default Footer;
