// functionality
import { useRef, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// components
import EventPreview from "../../routes/Events/EventPreview";

// icons
import { LuPencil } from "react-icons/lu";
import { BsImage } from "react-icons/bs";
import {
	AiOutlineClose,
	AiOutlineCloudUpload,
	AiOutlinePlus,
} from "react-icons/ai";
import UserContext from "../../context/userContext/UserContext";

// styling
import "./CreateForm.css";
import { useSpring, animated } from "@react-spring/web";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const CreateForm = ({ setActiveTab, setEventCreated, setCreatedEventId }) => {
	const { t } = useTranslation();
	const {
		setUserEvents,
		setUserEventIds,
		userAccount,
		isConnected,
		iswalletAvailable,
		login,
	} = useContext(UserContext);
	const nameRef = useRef();
	const descriptionRef = useRef();
	const [eventType, setEventType] = useState("public");
	const [dateTime, setDateTime] = useState(new Date(), new Date());
	const [options, setOptions] = useState([]);
	const [newOption, setNewOption] = useState("");
	const [allowedWalletAddresses, setAllowedWalletAddresses] = useState([]);
	const [uploadedFile, setUploadedFile] = useState(null);
	const [newAllowedWalletAddress, setNewAllowedWalletAddress] = useState([]);
	const [createdEvent, setCreatedEvent] = useState(null);
	const [thumbnail, setThumbnail] = useState(null);
	const [showAddWalletAddressModal, setShowAddWalletAddressModal] =
		useState(false);
	const [preview, setPreview] = useState(false);
	const openAnimation = useSpring({
		from: { opacity: "1", maxWidth: "0px", marginLeft: "0em" },
		to: {
			opacity: eventType === "private" ? "1" : "0",
			maxWidth: eventType === "private" ? "4em" : "0em",
			padding: eventType === "private" ? "15px 15px" : "15px 0px",
			marginLeft: eventType === "private" ? "1em" : "0em",
		},
		config: { duration: "300" },
	});

	function handlePreviewEvent(e) {
		e.preventDefault();
		// refs are not empty
		if (
			nameRef.current === null ||
			nameRef.current.value.trim() === (null || "") ||
			descriptionRef.current === null ||
			descriptionRef.current.value.trim() === (null || "") ||
			// startDateRef.current === null ||
			// startDateRef.current.value.trim() === (null || "") ||
			// endDateRef.current === null ||
			// endDateRef.current.value.trim() === (null || "")
			dateTime[0] === undefined ||
			dateTime[1] === undefined
		) {
			console.log("Input Required");
			return;
		}
		// lists are not empty
		if (
			options.length <= 0 ||
			(eventType === "private" && allowedWalletAddresses.length <= 0)
		) {
			console.log("Options Required");
			return;
		}

		const event = {
			id: uuidv4(),
			name: nameRef.current.value,
			description: descriptionRef.current.value,
			type: eventType,
			startDate: dateTime[0],
			endDate: dateTime[1],
			allowedWalletAddresses: allowedWalletAddresses,
			voteOptions: options,
			participants: 0,
			thumbnailURL: thumbnail,
			createdBy: userAccount,
			comments: [],
			totalVotes: 0,
		};
		setCreatedEvent(event);
		setPreview(event);
	}
	const handleCreateEvent = () => {
		setUserEventIds((prev) => [...prev, createdEvent.id]);
		setUserEvents((prev) => [...prev, createdEvent]);
		setCreatedEventId(createdEvent.id);
		setEventCreated(true);
		setActiveTab("myEvents");
	};
	const handleAddOption = () => {
		if (newOption.trim() !== "") {
			setOptions([
				...options,
				{ value: newOption, image: null, votes: 0 },
			]);
			setNewOption("");
		}
	};
	const handleAddAllowedWalletAddress = () => {
		if (newAllowedWalletAddress.trim() !== "") {
			setAllowedWalletAddresses([
				...allowedWalletAddresses,
				newAllowedWalletAddress,
			]);
			setNewAllowedWalletAddress("");
		}
	};
	const handleOptionChange = (event, index) => {
		event.preventDefault();
		const updatedOptions = [...options];
		updatedOptions[index].value = event.target.value;
		setOptions(updatedOptions);
	};
	const handleDeleteOption = (index) => {
		const updatedOptions = [...options];
		updatedOptions.splice(index, 1);
		setOptions(updatedOptions);
	};
	const handleDeleteVoteOptionImage = (e, index) => {
		const updatedOptions = [...options];
		updatedOptions[index].image = null;
		setOptions(updatedOptions);
	};
	const handleDeleteAllowedWalletAddress = () => {
		setAllowedWalletAddresses([]);
		setUploadedFile(null);
	};
	const handleAllowedWalletAddressFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				handleAllowedWalletAddressFileLoad(e, file);
			};
			reader.readAsText(file);
		}
	};
	const handleAllowedWalletAddressFileLoad = (e, file) => {
		const csvData = e.target.result;
		const dataArray = csvData.split(",");
		setAllowedWalletAddresses([...allowedWalletAddresses, ...dataArray]);
		setUploadedFile(file.name);
	};
	const handleThumbnailUpload = (event) => {
		const file = event.target.files[0];
		setThumbnail(URL.createObjectURL(file));
	};
	const handleVoteOptionImageUpload = (event, index) => {
		const file = event.target.files[0];
		const updatedOptions = [...options];
		updatedOptions[index].image = URL.createObjectURL(file);
		setOptions(updatedOptions);
	};
	return (
		<section>
			{iswalletAvailable ? (
				isConnected ? (
					<div>
						{!preview ? (
							<section className="createform">
								<div className="createform-header">
									<h1 className="createform-heading">
										{t("event.create.new")}
									</h1>
								</div>
								<div className="createform-uploadedthumbnail">
									{thumbnail ? (
										<img
											src={thumbnail}
											alt="Uploaded"
											className="createform-uploadedthumbnail"
										/>
									) : (
										<span
											style={{
												marginBottom: "4em",
												opacity: 0.5,
											}}>
											Add Thumbnail
										</span>
									)}
									<div className="createform-uploadedthumbnail-overlay button-label">
										<LuPencil />
									</div>
									<input
										type="file"
										accept="image/*"
										className="allowed-walletaddress-file"
										onChange={handleThumbnailUpload}
									/>
								</div>
								<form
									action=""
									onSubmit={(e) => handlePreviewEvent(e)}
									className="createform-form">
									<div className="createform-column">
										<label
											htmlFor="event-name"
											className="createform-label">
											{t("event.create.name")}
										</label>
										<input
											required
											type="text"
											id="event-name"
											name="name"
											defaultValue={
												createdEvent
													? createdEvent.name
													: ""
											}
											placeholder={t(
												"event.create.namePlaceholder"
											)}
											ref={nameRef}
											className="createform-input"
										/>
									</div>
									<div className=" createform-dates">
										<div className="createform-column">
											<label
												htmlFor="createform-startdate"
												className="createform-label">
												Pick Event Duration
											</label>
											<DateTimeRangePicker
												onChange={setDateTime}
												value={dateTime}
												format="d-M-y h:m a"
											/>
											{/* <input
								required
								type="date"
								name="startdate"
								id="createform-startdate"
								ref={startDateRef}
								className="createform-date"
							/> */}
										</div>
										{/* <div className="createform-column">
							<label
								htmlFor="createform-enddate"
								className="createform-label">
								{t("event.create.endDate")}
							</label>
							<input
								required
								type="date"
								name="enddate"
								id="createform-enddate"
								ref={endDateRef}
								className="createform-date"
							/>
						</div> */}
									</div>
									<div className="createform-column">
										<label htmlFor="createform-type">
											{t("event.create.type.label")}
										</label>
										<div className="createform-type-options">
											<button
												type="button"
												onClick={() => {
													setEventType("public");
												}}
												className={
													eventType === "public"
														? "active"
														: null
												}>
												{t("event.create.type.public")}
											</button>
											<button
												type="button"
												onClick={() => {
													setEventType("private");
													handleAccordian();
												}}
												className={
													eventType === "private"
														? "active"
														: null
												}>
												{t("event.create.type.private")}
											</button>
											<animated.button
												style={openAnimation}
												type="button"
												onClick={() => {
													setShowAddWalletAddressModal(
														true
													);
												}}
												className="active addWalletAddressBtn">
												<span>
													<AiOutlinePlus />
												</span>
											</animated.button>
										</div>
									</div>

									{/* <div className=" createform-dates">
						<div className="createform-column">
							<label
								htmlFor="createform-starttime"
								className="createform-label">
								{t("event.create.startTime")}
							</label>
							<input
								required
								type="time"
								name="startdate"
								id="createform-starttime"
								ref={startTimeRef}
								className="createform-date"
							/>
						</div>
						<div className="createform-column">
							<label
								htmlFor="createform-endtime"
								className="createform-label">
								{t("event.create.endTime")}
							</label>
							<input
								required
								type="time"
								name="enddate"
								id="createform-endtime"
								ref={endTimeRef}
								className="createform-date"
							/>
						</div>
					</div> */}
									<div className="createform-column createform-description">
										<label
											htmlFor="event-description"
											className="createform-label">
											{t("event.create.description")}
										</label>
										<textarea
											required
											type="text"
											id="event-description"
											name="description"
											defaultValue={
												createdEvent
													? createdEvent.description
													: ""
											}
											placeholder={t(
												"event.create.descriptionPlaceholder"
											)}
											ref={descriptionRef}
											className="createform-input"
										/>
									</div>
									<div className="createform-column createform-addvoteoptions">
										<label htmlFor="createform-vote-options-input">
											{t("event.create.options")}
										</label>
										{options &&
											options.map((option, index) => {
												return (
													<div
														className="createform-vote-options-container"
														key={index}>
														<div className="createform-vote-options">
															<div className="vote-options-image-container">
																<div className="vote-options-image">
																	<img
																		src={
																			option.image
																		}
																		alt=""
																	/>
																</div>
																<div className="create-vote-option-options-label">
																	<label
																		className="button-label"
																		htmlFor={`createform-vote-option-options-${index}`}>
																		{!option.image && (
																			<BsImage className="upload-image-icon" />
																		)}
																	</label>
																	<input
																		type="file"
																		accept="image/*"
																		id={`createform-vote-option-options-${index}`}
																		className="allowed-walletaddress-file"
																		onChange={(
																			e
																		) =>
																			handleVoteOptionImageUpload(
																				e,
																				index
																			)
																		}
																	/>
																</div>
															</div>
															<input
																type="text"
																value={
																	option.value
																}
																onChange={(e) =>
																	handleOptionChange(
																		e,
																		index
																	)
																}
																onKeyDown={(
																	e
																) => {
																	if (
																		e.key ===
																		"Enter"
																	) {
																		e.preventDefault();
																		e.target.blur();
																	}
																}}
																className="createform-vote-edit"
															/>
															<div className="createform-vote-option-options">
																<button
																	type="button"
																	className="createform-vote-options-cross"
																	onClick={() =>
																		handleDeleteOption(
																			index
																		)
																	}>
																	<AiOutlineClose />
																</button>
															</div>
														</div>
													</div>
												);
											})}
										<input
											type="text"
											id="createform-vote-options-input"
											value={newOption}
											onChange={(e) =>
												setNewOption(e.target.value)
											}
											className="createform-input"
											placeholder={t(
												"event.create.optionsPlaceholder"
											)}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													e.preventDefault();
													handleAddOption();
												}
											}}
										/>
									</div>

									<div className="createform-buttons">
										<button
											className="event-delete-btn event-options-btn"
											onClick={() => {
												setActiveTab("all");
											}}>
											<AiOutlineClose />
											Cancel
										</button>
										<button
											className="event-createbutton event-options-btn"
											type="submit">
											Preview
										</button>
									</div>
								</form>
								{eventType === "private" &&
									showAddWalletAddressModal && (
										<div className="createform-walletaddress-container">
											<div className="createform-allowedwalletaddress-modal">
												<div className="createform-allowedwalletaddress-modal-header">
													<label htmlFor="allowed-walletaddress-input">
														{t(
															"event.create.allowedWalletAddress"
														)}
													</label>
													<a
														style={{
															marginLeft: "1em",
														}}
														href="/assets/example.csv"
														download={
															"example_file.csv"
														}>
														See Example File
													</a>
												</div>
												<div className="createform-allowed-walletaddress">
													<div className="createform-allowed-walletaddress-input-container">
														<div
															style={{
																display: "flex",
																gap: "1em",
															}}>
															{uploadedFile}
															{uploadedFile && (
																<button
																	type="button"
																	className="createform-vote-options-cross"
																	onClick={
																		handleDeleteAllowedWalletAddress
																	}>
																	<AiOutlineClose />
																</button>
															)}
														</div>
														<div className="allowed-walletaddress-file-label">
															<span className="button-label">
																{t(
																	"event.create.uploadFile"
																)}
																<AiOutlineCloudUpload className="upload-file-icon" />
															</span>
															<input
																type="file"
																accept=".csv"
																className="allowed-walletaddress-file"
																onChange={(e) =>
																	handleAllowedWalletAddressFileChange(
																		e
																	)
																}
															/>
														</div>
													</div>
												</div>
												{/* <div className="createform-vote-options-container createform-allowedwalletaddresses-container">
									{allowedWalletAddresses.map(
										(walletAddress, index) => (
											<div
												key={index}
												className="createform-vote-options">
												{walletAddress}
												<button
													type="button"
													className="createform-vote-options-cross"
													onClick={() =>
														handleDeleteAllowedWalletAddress(
															index
														)
													}>
													<AiOutlineClose />
												</button>
											</div>
										)
									)}
								</div> */}
												<button
													className="createform-walletAddressModalBtn"
													onClick={() =>
														setShowAddWalletAddressModal(
															false
														)
													}>
													Done
												</button>
											</div>
										</div>
									)}
							</section>
						) : (
							<EventPreview
								event={createdEvent}
								handleCreateEvent={handleCreateEvent}
								setPreview={setPreview}
								setActiveTab={setActiveTab}
								setEventCreated={setEventCreated}
							/>
						)}
					</div>
				) : (
					<div className="whitebutton">
						Connect Wallet to Create a Voting Event
						<button
							onClick={() => {
								login();
							}}>
							{t("navbar.connect")}
						</button>
					</div>
				)
			) : (
				<div className="whitebutton">
					Install a Wallet to Start Creating Events
					<button
						onClick={() => {
							window.open("https://metamask.io");
						}}>
						{t("navbar.getWallet")}
					</button>
				</div>
			)}
		</section>
	);
};

export default CreateForm;
