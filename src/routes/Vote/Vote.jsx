import CreateForm from "../../components/CreateForm/CreateForm";
import { useTranslation } from "react-i18next";
import "./Vote.css";
import UserContext from "../../context/userContext/UserContext";
//icons
import { IoCreateOutline } from "react-icons/io5";
import {
	AiOutlineHistory,
	AiFillExclamationCircle,
	AiOutlineClose,
} from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
const Vote = () => {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState("all");
	const [eventCreated, setEventCreated] = useState(false);
	const [createdEventId, setCreatedEventId] = useState(false);

	return (
		<section className="vote">
			<aside>
				<div
					className={activeTab === "create" ? "activeTab" : ""}
					onClick={() => setActiveTab("create")}>
					<IoCreateOutline className="vote-icons" />
					{t("vote.create")}
				</div>
				<div
					className={activeTab === "recent" ? "activeTab" : ""}
					onClick={() => setActiveTab("recent")}>
					<AiOutlineHistory className="vote-icons" />
					{t("vote.recent")}
				</div>
				<div
					className={activeTab === "all" ? "activeTab" : ""}
					onClick={() => setActiveTab("all")}>
					<BsFillGridFill className="vote-icons" />
					{t("vote.all")}
				</div>
				<div
					className={activeTab === "upcoming" ? "activeTab" : ""}
					onClick={() => setActiveTab("upcoming")}>
					<AiFillExclamationCircle className="vote-icons" />
					{t("vote.upcoming")}
				</div>
				<div
					className={activeTab === "myEvents" ? "activeTab" : ""}
					onClick={() => setActiveTab("myEvents")}>
					<MdDateRange className="vote-icons" />
					{t("vote.my")}
				</div>
			</aside>
			<main className="vote-main">
				{activeTab === "create" && (
					<CreateForm
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						setEventCreated={setEventCreated}
						setCreatedEventId={setCreatedEventId}
					/>
				)}
				{(activeTab === "myEvents" ||
					activeTab === "all" ||
					activeTab === "upcoming" ||
					activeTab === "recent") && (
					<div className="vote-main">
						{eventCreated && (
							<EventCreatedModal
								id={createdEventId}
								setEventCreated={setEventCreated}
								setActiveTab={setActiveTab}
							/>
						)}
						<MyEvents />
					</div>
				)}
			</main>
		</section>
	);
};
const MyEvents = () => {
	const { userEvents } = useContext(UserContext);

	return (
		<>
			{userEvents.length > 0 ? (
				userEvents
					.sort(
						(a, b) => new Date(a.startDate) - new Date(b.startDate)
					)
					.map((event) => {
						return <Card event={event} key={event.id} />;
					})
			) : (
				<h2 style={{ color: "ghostwhite" }}>No Events</h2>
			)}
		</>
	);
};
const Card = ({ event }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<div className="vote-card">
			<h1>{event.name}</h1>
			<div className="vote-card-item">
				<h3>
					{event.description && event.description.length > 50
						? `${event.description.slice(0, 50)}...`
						: `${event.description}`}
				</h3>
				{/* {<span>
					{parseInt(event.participants / 100) * 100}+ Participants
				</span>} */}
			</div>
			<div className="vote-card-item">
				<h4>{event.type.toUpperCase()}</h4>
				<h4>STARTS {new Date(event.startDate).toDateString()}</h4>
				<h4>ENDS {new Date(event.endDate).toDateString()}</h4>
				<button>
					<Link
						to={`/vote/${event.id}`}
						className="vote-card-btn-link">
						{t("vote.goToEvent")}
					</Link>
				</button>
			</div>
		</div>
	);
};
const EventCreatedModal = ({ id, setEventCreated }) => {
	const { t } = useTranslation();
	return (
		<div className="modal">
			<span>{t("event.create.eventCreatedSuccessfully")}</span>
			<Link to={`/vote/${id}`} style={{ color: "ghostwhite" }}>
				{t("event.create.goToEvent")}
			</Link>
			<button onClick={() => setEventCreated(false)}>
				<AiOutlineClose />
			</button>
		</div>
	);
};
export default Vote;
