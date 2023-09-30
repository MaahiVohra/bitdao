import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext/UserContext";
import "./Event.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidTrash } from "react-icons/bi";
import { MdHowToVote } from "react-icons/md";
import CommentSection from "../../components/CommentSection/CommentSection";
// import { CommentSection } from "replyke";
import { useSpring, animated } from "@react-spring/web";
export default Event = ({ eventId, navigate }) => {
	// checks if events exists
	useEffect(() => {
		// handles incorrect params i.e. no event exists
		if (!userEventIds.includes(eventId)) {
			navigate("/vote");
		}
	}, []);

	// global states
	const {
		userEventIds,
		userEvents,
		setUserEvents,
		userVotes,
		setUserVotes,
		userAccount,
		isConnected,
		user,
		login,
	} = useContext(UserContext);

	// current event
	const event =
		userEvents.find((userEvent) => userEvent.id === eventId) || null;
	if (event === null) return;

	// local states
	const [showVoteModal, setShowVoteModal] = useState(false);
	const [vote, setVote] = useState(
		userVotes.find((userVote) => userVote.id === eventId) || null
	);
	const [selectedOption, setSelectedOption] = useState(
		vote !== null ? { value: vote.votedFor, index: vote.index } : null
	);
	const currentDate = new Date();
	const [eventRunningStatus, setEventRunningStatus] = useState(() => {
		if (currentDate < new Date(event.startDate).toUTCString()) {
			return "not started";
		} else if (currentDate > new Date(event.endDate).toUTCString()) {
			return "ended";
		} else return "live";
	});
	// for private events - checks if user is allowed to vote
	const allowedWalletAddresses = event.allowedWalletAddresses;
	const voteAllowed =
		(event.type === "private" &&
			allowedWalletAddresses.includes(userAccount)) ||
		(event.type === "public" && isConnected);

	// submits vote in current state
	function handleSubmitVote() {
		if (selectedOption === null) return;
		const newVote = {
			id: eventId,
			votedFor: selectedOption.value,
			index: selectedOption.index,
		};
		event.voteOptions[selectedOption.index].votes += 1;
		event.totalVotes += 1;
		setVote(newVote);
		setUserVotes((prev) => {
			return [...prev, newVote];
		});
		setShowVoteModal(false);
	}
	function handleDeleteEvent() {
		const deletedUserEvents = userEvents.filter(
			(event) => event.id !== eventId
		);
		setUserEvents(deletedUserEvents);
		navigate("/vote");
	}

	// Render the Event component for valid eventId
	return (
		<section>
			<main className="event">
				{event.thumbnailURL && (
					<div className="event-thumbnail">
						<img src={event.thumbnailURL} alt="event-thumbnail" />
					</div>
				)}
				<div className="event-banner">
					<div className="event-heading">
						<h1>{event.name}</h1>
					</div>
					<div className="event-tags">
						<span>{event.type.toUpperCase()}</span>
						<span>{eventRunningStatus.toUpperCase()}</span>
					</div>

					<div className="event-description">{event.description}</div>
					<div className="event-options-container">
						{selectedOption &&
							voteAllowed &&
							eventRunningStatus === "live" && (
								<div className="event-votingfor">
									{vote === null ? "Voting" : "Voted"} for{" "}
									{selectedOption.value}
								</div>
							)}
						<div className="event-options">
							{event.voteOptions.map((option, index) => {
								return (
									<div
										className={`${
											selectedOption &&
											selectedOption.index === index &&
											voteAllowed &&
											eventRunningStatus === "live" &&
											"selected-option"
										} event-option`}
										onClick={() => {
											!vote &&
											voteAllowed &&
											eventRunningStatus === "live"
												? setSelectedOption({
														value: option.value,
														index: index,
												  })
												: null;
										}}
										key={index}>
										{/* style={{width: `${option.votes / event.totalVotes}%`}} */}
										<PercentageAnimation
											optionVotes={option.votes}
											totalVotes={event.totalVotes}
											vote={vote}
											isConnected={isConnected}
										/>
										{option.image && (
											<div className="event-options-image">
												<img
													src={option.image}
													alt="option-image"
												/>
											</div>
										)}
										<div className="vote-options-value">
											{option.value}
										</div>
										{vote && isConnected && (
											<div className="vote-options-percentage">
												{option.votes}
											</div>
										)}
									</div>
								);
							})}
						</div>
						{!vote &&
							voteAllowed &&
							eventRunningStatus === "live" && (
								<button
									className="event-submit-btn"
									onClick={
										!vote &&
										voteAllowed &&
										eventRunningStatus === "live"
											? handleSubmitVote
											: null
									}>
									Submit Vote
								</button>
							)}
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
					<div className="event-buttons">
						{event.createdBy === userAccount.toLowerCase() && (
							<button
								onClick={handleDeleteEvent}
								className="event-delete-btn event-options-btn">
								<BiSolidTrash />
								Delete Event
							</button>
						)}
					</div>
				</div>
			</main>
			<CommentSection event={event} />
			{/* <CommentSection
				appKey="tbugml99aimvwnrz0295g692e3gwf9"
				articleId="vote"
				styleId="64ba0ebd1f94234f03eabd95"
				callbacks={{
					loginClickCallback: login(),
					// commentAuthorClickCallback: COMMENT_AUTHOR_CLICK_CALLBACK,
					// currentUserClickCallback: CURRENT_USER_CLICK_CALLBACK,
				}}
				currentUser={
					user
						? {
								_id: user.walletAddress,
								name: user.nickname,
								img: user.profileImageUrl,
						  }
						: undefined
				}
			/> */}
		</section>
	);
};
const PercentageAnimation = ({
	optionVotes,
	totalVotes,
	isConnected,
	vote,
}) => {
	console.log(vote && isConnected);
	const props = useSpring({
		from: {
			opacity: "0",
			maxWidth: "0",
			width: "100%",
		},
		to: {
			opacity: vote && isConnected ? "0.5" : "0",
			maxWidth:
				vote && isConnected
					? `${(optionVotes / totalVotes) * 100}%`
					: "0em",
		},
		config: { duration: "300" },
	});
	return (
		<animated.div style={props} className="vote-options-percentagebar">
			{/* ${option.votes / event.totalVotes}% */}
		</animated.div>
	);
};
