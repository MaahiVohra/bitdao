import React from "react";
import image from "../../Assets/main.png";
import image2 from "../../Assets/wallet-illo.svg";
import image3 from "../../Assets/Explore-illo.png";
import image4 from "../../Assets/Browse-illo.png";
import qrcode from "../../Assets/qrcode.png";
import qrcode2 from "../../Assets/qrcode2.png";
import apple from "../../Assets/apple.png";
import chrome from "../../Assets/chrome.svg";
import android from "../../Assets/android.png";
import qrcode3 from "../../Assets/appleqr.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUnlockAlt, FaHandHoldingUsd } from "react-icons/fa";
import { RiNodeTree } from "react-icons/ri";
import { AiOutlineSafetyCertificate, AiFillAndroid } from "react-icons/ai";
import { SiHiveBlockchain } from "react-icons/si";
import { HiClipboardDocumentCheck } from "react-icons/hi2";

import "../../Css/main.d4f40551.css";
import { useTranslation } from "react-i18next";

const Body = () => {
	const { t } = useTranslation();

	const handleClickScroll = () => {
		const element = document.getElementById("main_content2");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	const textAnimation = {
		offscreen: { x: 100, opacity: 0 },
		onscreen: {
			x: 0,
			opacity: 1,
			transition: {
				type: "spring",
				bounce: 0.4,
				duration: 3,
			},
		},
	};

	const imageAnimation = {
		offscreen: { x: 100 },
		offscreen2: { x: 0 },
		onscreen: {
			x: 0,
			opacity: 1,
			transition: {
				type: "spring",
				bounce: 0.4,
				duration: 2,
			},
		},
		onscreen2: {
			x: 100,
			opacity: 1,
			transition: {
				type: "spring",
				bounce: 0.4,
				duration: 2,
			},
		},
	};

	return (
		<div className="main_body" style={{ backgroundColor: "#04000a" }}>
			<motion.div
				initial={"offscreen"}
				whileInView={"onscreen"}
				viewport={{
					once: true,
					amount: 0.5,
				}}
				transition={{ staggerChildren: 0.5 }}
				className="md:w-[80vw] mx-auto main_content_parent">
				<div className="main_content">
					<div className="flex flex-col md:flex-row  items-center w-[80vw] mx-auto main_content_child_1">
						<motion.div
							variants={textAnimation}
							initial={"offscreen"}
							whileInView={"onscreen"}
							viewport={{ once: true, amount: 1 }}
							transition={{ staggerChildren: 0.5 }}
							className="md:w-[40vw] order-2 md:order-1 main_content_child_1_child">
							<div className="content">
								<h1 className="text-white text-2xl font-bold text-center md:text-left  md:tracking-[3px] md:text-[2.5rem] md:leading-[3.4rem] md:font-[1000] content_heading">
									{t("Bitwallet.heading1")} <br />{" "}
									{t("Bitwallet.heading2")} <br />{" "}
									{t("Bitwallet.heading3")}
								</h1>
								<p className="text-white mt-3 md:text-lg text-sm text-center md:text-left content_info">
									{t("Bitwallet.subheading")}
								</p>
							</div>
							<div className="button text-center md:text-left">
								<button
									type="button"
									onClick={handleClickScroll}
									className="text-white w-full md:w-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-2xl text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-4">
									{t("Bitwallet.download")}
								</button>
							</div>
						</motion.div>
						<motion.div
							variants={imageAnimation}
							initial={"offscreen"}
							whileInView={"onscreen"}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ staggerChildren: 0.5 }}
							className="md:w-[40vw] order-1 md:order-2">
							<div className="image md:w-[40vw] mx-auto">
								<img
									style={{ backgroundColor: "#59069a" }}
									src={image}
									alt=""
									className="w-80 h-96 mx-auto"
								/>
							</div>
						</motion.div>
					</div>
					<div className="flex flex-col md:flex-row  items-center w-[80vw] mx-auto mt-20">
						<motion.div
							variants={textAnimation}
							initial={"offscreen"}
							whileInView={"onscreen"}
							viewport={{ once: true, amount: 1 }}
							transition={{ staggerChildren: 0.5 }}
							className="md:w-[40vw] order-2 md:order-1">
							<div className="content">
								<h1 className="text-white text-2xl font-bold text-center md:text-left  md:tracking-[3px] md:text-[2.5rem] md:leading-[3.4rem] md:font-[1000]">
									{t("Bitwallet.heading4")}
								</h1>
								<p className="text-white mt-3 md:text-lg text-sm text-center md:text-left">
									{t("Bitwallet.subheading4")}
								</p>
							</div>
						</motion.div>
						<motion.div
							variants={imageAnimation}
							initial={"offscreen"}
							whileInView={"onscreen"}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ staggerChildren: 0.5 }}
							className="md:w-[40vw] order-1 md:order-2">
							<div className="image md:w-[40vw] px-4">
								<img
									src={image2}
									alt=""
									className="md:w-[35vw]"
								/>
							</div>
						</motion.div>
					</div>
					<div className="flex flex-col md:flex-row  items-center w-[80vw] mx-auto mt-20">
						<motion.div
							variants={textAnimation}
							initial={"offscreen"}
							whileInView={"onscreen"}
							viewport={{ once: true, amount: 1 }}
							transition={{ staggerChildren: 0.5 }}
							className="md:w-[50%] order-2 md:order-2">
							<div className="content">
								<h1 className="text-white text-2xl font-bold text-center md:text-left  md:tracking-[3px] md:text-[2.5rem] md:leading-[3.4rem] md:font-[1000]">
									{t("Bitwallet.heading5")}
								</h1>
								<p className="text-white mt-3 md:text-lg text-sm text-center md:text-left">
									{t("Bitwallet.subheading5")}
								</p>
							</div>
						</motion.div>
						<motion.div
							variants={imageAnimation}
							initial={"offscreen"}
							whileInView={"onscreen"}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ staggerChildren: 0.5 }}
							className="md:w-[50%] order-1 md:order-1 mx-auto">
							<div className="image">
								<img
									src={image3}
									alt=""
									className="md:w-[35vw]"
								/>
							</div>
						</motion.div>
					</div>
					<div className="flex flex-col md:flex-row  items-center w-[80vw] mx-auto mt-20">
						<motion.div
							variants={textAnimation}
							initial={"offscreen"}
							whileInView={"onscreen"}
							viewport={{ once: true, amount: 1 }}
							transition={{ staggerChildren: 0.5 }}
							className="md:w-[50%] order-2 md:order-2">
							<div className="content">
								<h1 className="text-white text-2xl font-bold text-center md:text-left  md:tracking-[3px] md:text-[2.5rem] md:leading-[3.4rem] md:font-[1000]">
									{t("Bitwallet.heading6")}
								</h1>
								<p className="text-white mt-3 md:text-lg text-sm text-center md:text-left">
									{t("Bitwallet.subheading6")}
								</p>
							</div>
						</motion.div>
						<motion.div
							variants={imageAnimation}
							initial={"offscreen"}
							whileInView={"onscreen"}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ staggerChildren: 0.5 }}
							className="md:w-[50%] order-1 md:order-2 mx-auto">
							<div className="image">
								<img
									src={image4}
									alt=""
									className="md:w-[35vw]"
								/>
							</div>
						</motion.div>
					</div>
				</div>
				<div
					id="main_content2"
					className="sm:w-[80vw] main_content2 mt-28 border shadow-2xl border-purple-900 rounded-xl ">
					<h1 className="text-center text-white text-4xl font-bold py-3">
						{t("Bitwallet.bitwalletDwnld")}
					</h1>
					<div className="py-10 flex md:flex-row flex-col  md:justify-between items-center md:w-[80vw] qrcodewidth mx-auto mt-16">
						<motion.div
							whileHover={{
								scale: 1.08,
							}}
							className="md:max-w-[18rem] mt-8 md:mt-0 max-w-sm   border-gray-200 rounded-lg shadow-2xl shadow-gray-900  dark:border-gray-700">
							<p>
								<img
									className="rounded-t-lg  py-4 qrcode"
									src={qrcode}
									alt="img"
								/>
							</p>
							<div className="p-5">
								<div>
									<p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
										{t("Bitwallet.downloadChromeheading")}
									</p>
								</div>
								<div
									onClick={() => {
										window.open(
											"https://chrome.google.com/webstore/detail/bit-wallet/ddphokhghjkekfdoddpeffdpojdofcan"
										);
									}}
									className="linkstyle inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
									{t("Bitwallet.downloadFor")}
									<img
										src={chrome}
										alt=""
										className="w-8 h-8 ml-2 -mr-1"
									/>
								</div>
							</div>
						</motion.div>

						<motion.div
							whileHover={{
								scale: 1.08,
							}}
							className="md:max-w-[18rem] mt-8 sm:mt-0 max-w-sm  border border-gray-200 rounded-lg shadow-2xl shadow-gray-900  dark:border-gray-700">
							<p>
								<img
									className="rounded-t-lg  py-4 w-fit"
									src={qrcode3}
									alt="img"
								/>
							</p>
							<div className="p-5">
								<div>
									<p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
										{t("Bitwallet.downloadIoSheading")}
									</p>
								</div>
								<div
									onClick={() => {
										window.open(
											"https://apps.apple.com/us/app/be-imagine-technology-wallet/id6443855034"
										);
									}}
									className="linkstyle inline-flex items-center px-3 py-2  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
									{t("Bitwallet.downloadFor")}
									<img
										src={apple}
										className="w-8 h-8 ml-2 -mr-1"
									/>
								</div>
							</div>
						</motion.div>
						<motion.div
							whileHover={{
								scale: 1.08,
							}}
							className="md:max-w-[18rem] mt-8 sm:mt-0 max-w-sm  border border-gray-200 rounded-lg shadow-2xl shadow-gray-900  dark:border-gray-700">
							<p>
								<img
									className="rounded-t-lg py-4"
									src={qrcode2}
									alt="img"
								/>
							</p>
							<div className="p-5">
								<div>
									<p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
										{t("Bitwallet.downloadAndroidheading")}
									</p>
								</div>
								<div
									onClick={() => {
										window.open(
											"https://play.google.com/store/apps/details?id=beimagine.tech"
										);
									}}
									className="linkstyle inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
									{t("Bitwallet.downloadFor")}
									{/* <img
										src={android}
										className="w-8 h-8 ml-2 -mr-1"
									/> */}
									<AiFillAndroid className="text-3xl ml-2" />
								</div>
							</div>
						</motion.div>
					</div>
				</div>
				<div className="main_content3">
					<div className="flex flex-col items-center md:w-[80vw] mx-auto mt-28">
						<div className="order-1">
							<div className="content">
								<h1 className="text-white text-2xl font-bold text-center">
									{t("Bitwallet.whatIsBitwallet")}
								</h1>
							</div>
						</div>
						<div className="order-2">
							<div className="video md:mt-24 mt-10">
								{
									<iframe
										width="560"
										height="315"
										src="https://www.youtube.com/embed/YDsqedqmF84"
										title="YouTube video player"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowFullScreen></iframe>
								}
								{/* <iframe className='w-[100vw] h-[30vh] md:w-[80vw] md:h-[80vh]' src="https://www.youtube.com/embed/YDsqedqmF84" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
							</div>
						</div>
					</div>
				</div>

				<div className="features mt-10">
					<section className=" rounded-xl">
						<div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
							<div className="mb-8 lg:mb-16">
								<h2 className="mb-4 text-center text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
									{t("Bitwallet.whyChooseBitwallet.heading")}
								</h2>
								<p className="text-gray-500 sm:text-xl dark:text-gray-400 text-center">
									{t(
										"Bitwallet.whyChooseBitwallet.subheading"
									)}
								</p>
							</div>
							<div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
								<motion.div
									whileHover={{
										scale: 0.75,
									}}
									className="px-5 py-6 rounded-xl bg-blue-600  shadow-xl shadow-gray-800">
									<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
										<FaUnlockAlt className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-white" />
									</div>
									<h3 className="mb-2 text-xl font-bold text-white bg-blue-600">
										{t(
											"Bitwallet.whyChooseBitwallet.Dataprotection"
										)}
									</h3>
									<p className="text-gray-500 dark:text-gray-400"></p>
								</motion.div>
								<motion.div
									whileHover={{
										scale: 0.75,
									}}
									className="px-5 py-6 rounded-xl bg-white shadow-xl shadow-gray-800">
									<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
										<RiNodeTree className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-black" />
									</div>
									<h3 className="mb-2 text-xl font-bold bg-white">
										{t(
											"Bitwallet.whyChooseBitwallet.RobustInfrastructure"
										)}
									</h3>
									<p className="text-gray-500 dark:text-gray-400"></p>
								</motion.div>
								<motion.div
									whileHover={{
										scale: 0.75,
									}}
									className="px-5 py-6 rounded-xl bg-blue-600 shadow-xl shadow-gray-800">
									<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
										<SiHiveBlockchain className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-white" />
									</div>
									<h3 className="mb-2 text-xl font-bold bg-blue-600 text-white">
										{t(
											"Bitwallet.whyChooseBitwallet.Decentralized"
										)}
									</h3>
									<p className="text-gray-500 dark:text-gray-400"></p>
								</motion.div>
								<motion.div
									whileHover={{
										scale: 0.75,
									}}
									className="px-5 py-6 rounded-xl bg-white shadow-xl shadow-gray-800">
									<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
										<AiOutlineSafetyCertificate className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-black" />
									</div>
									<h3 className="mb-2 text-xl font-bold bg-white ">
										{t(
											"Bitwallet.whyChooseBitwallet.Verifiedandsecuretouse"
										)}
									</h3>
									<p className="text-gray-500 dark:text-gray-400"></p>
								</motion.div>
								<motion.div
									whileHover={{
										scale: 0.75,
									}}
									className="px-5 py-6 rounded-xl bg-blue-600 shadow-xl shadow-gray-800">
									<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
										<FaHandHoldingUsd className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-white" />
									</div>
									<h3 className="mb-2 text-xl font-bold bg-blue-600 text-white">
										{t(
											"Bitwallet.whyChooseBitwallet.EasytoUse"
										)}
									</h3>
									<p className="text-gray-500 dark:text-gray-400"></p>
								</motion.div>
								<motion.div
									whileHover={{
										scale: 0.75,
									}}
									className="px-5 py-6 rounded-xl bg-white shadow-xl shadow-gray-800">
									<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900 text-black">
										<HiClipboardDocumentCheck className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 text-black" />
									</div>
									<h3 className="mb-2 text-xl font-bold bg-white text-black">
										{t(
											"Bitwallet.whyChooseBitwallet.SupportAssets"
										)}
									</h3>
									<p className="text-gray-500 dark:text-gray-400"></p>
								</motion.div>
							</div>
						</div>
					</section>
				</div>
			</motion.div>
		</div>
	);
};

export default Body;
