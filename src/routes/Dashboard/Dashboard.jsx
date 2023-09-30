import { useContext, useRef, useState } from "react";
import UserContext from "../../context/userContext/UserContext";
import { FaPencilAlt, FaUserCircle } from "react-icons/fa";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
	const { userAccount, user } = useContext(UserContext);
	const [profileImage, setProfileImage] = useState(
		user.profileImageUrl || null
	);
	const navigate = useNavigate();
	const nicknameRef = useRef(null);
	const handleProfileImageUpload = (event) => {
		const file = event.target.files[0];
		user.profileImageUrl = URL.createObjectURL(file);
		setProfileImage(user.profileImageUrl);
	};
	const handleSave = () => {
		if (nicknameRef && nicknameRef.current)
			user.nickname = nicknameRef.current.value;
		navigate("/");
	};
	return (
		<section className="dashboard">
			<div className="dashboard-profileImage-container">
				<div className="dashboard-profileImage">
					{profileImage ? (
						<img
							src={user.profileImageUrl}
							alt="userProfileImage"
						/>
					) : (
						<FaUserCircle />
					)}
				</div>
				<label
					className="dashboard-profileImage-edit"
					htmlFor="dashboard-profileImage-input">
					<FaPencilAlt />
				</label>
				<input
					type="file"
					accept="image/*"
					className="dashboard-profileImage-input"
					id="dashboard-profileImage-input"
					onChange={(e) => handleProfileImageUpload(e)}
				/>
			</div>
			<div className="dashboard-item-container">
				<div className="dashboard-item">
					<label htmlFor="userNickname">Nickname</label>
					<input
						type="text"
						id="userNickname"
						placeholder="Add a Nickname"
						className="dashboard-input"
						defaultValue={user.nickname}
						ref={nicknameRef}
					/>
				</div>
				<div className="dashboard-item">
					<label htmlFor="userWalletAddress">Wallet Address</label>
					<div>{userAccount}</div>
				</div>
				<button
					className="dashboard-savebtn dashboard-item"
					onClick={handleSave}>
					Save
				</button>
			</div>
		</section>
	);
};
export default Dashboard;
