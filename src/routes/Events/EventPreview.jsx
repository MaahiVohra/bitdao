import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext/UserContext";
import "./Event.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
const EventPreview = ({
	event,
	setPreview,
	handleCreateEvent,
	setActiveTab,
}) => {
	const { userAccount } = useContext(UserContext);
	const currentDate = new Date();
	const [eventRunningStatus, setEventRunningStatus] = useState(() => {
		if (currentDate < new Date(event.startDate).toUTCString()) {
			return "not started";
		} else if (currentDate > new Date(event.endDate).toUTCString()) {
			return "ended";
		} else return "live";
	});

	// Render the Event component for valid eventId
	return (
		<section>
			<main className="event">
				<div className="event-thumbnail">
					<img src={event.thumbnailURL} alt="event-thumbnail" />
				</div>
				<div className="event-banner">
					<div className="event-heading">
						<h1>{event.name}</h1>
					</div>
					<div className="event-tags">
						<span>{event.type.toUpperCase()}</span>
						<span>{eventRunningStatus.toUpperCase()}</span>
					</div>
					<div className="event-buttons"></div>
					<div className="event-description">{event.description}</div>
					<div className="event-options-container">
						<div className="event-options">
							{event.voteOptions.map((option, index) => {
								return (
									<div className="event-option" key={index}>
										{option.image && (
											<div className="vote-options-image">
												<img
													src={option.image}
													alt=""
												/>
											</div>
										)}
										{option.value}
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="event-column-3">
					<div className="event-startdate event-info">
						<span>Start Date: </span>
						{new Date(event.startDate).toDateString()}
					</div>
					<div className="event-enddate event-info">
						<span>End Date: </span>
						{new Date(event.endDate).toDateString()}
					</div>
					<div className="event-startdate event-info">
						<span>Start Time: </span>
						{new Date(event.startDate).toLocaleString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</div>
					<div className="event-enddate event-info">
						<span>End Time: </span>
						{new Date(event.endDate).toLocaleString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</div>
					<div className="event-info">
						<span>Created By: </span>
						{userAccount}
					</div>
					<div className="event-info">
						<span>Total Votes: </span>
						{event.totalVotes}
					</div>
				</div>
			</main>
			<div className="event-preview-buttons">
				<button
					className="event-goback-btn event-options-btn"
					onClick={() => setPreview(false)}>
					<BiArrowBack />
					Go Back
				</button>
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
					onClick={() => {
						setPreview(false);
						handleCreateEvent();
					}}>
					Create
				</button>
			</div>
		</section>
	);
};
export default EventPreview;
