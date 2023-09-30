import { useEffect, useState, useRef, useContext } from "react";
import "./CommentSection.css";
import { v4 as uuidv4 } from "uuid";
import UserContext from "../../context/userContext/UserContext";
// import defaultAvatar from "defaultAvatar.png";
import { FaUserCircle, FaComment, FaReply } from "react-icons/fa";
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import { BsReplyFill, BsThreeDots } from "react-icons/bs";
const CommentSection = ({ event }) => {
	const {
		userAccount,
		setUserEvents,
		user,
		iswalletAvailable,
		isConnected,
		login,
	} = useContext(UserContext);
	const [comments, setComments] = useState(event.comments);
	const commentBoxRef = useRef(null);
	// useEffect(() => {
	// 	setComments(getComments());
	// }, []);
	// function getComments() {
	// 	return [
	// 		{
	// 			id: 1,
	// 			text: "this is first comment",
	// 			userName: "Dummy",
	// 			commentedOn: new Date("Wed, 20 Jul 2023 08:30:00 GMT"),
	// 		},
	// 	];
	// }
	console.log(user);
	function handleCommentPost() {
		if (
			commentBoxRef &&
			commentBoxRef.current &&
			commentBoxRef.current.value.trim() === (null || "")
		) {
			return;
		}
		const newComment = {
			id: uuidv4(),
			user: {
				nickname: user.nickname || null,
				walletAddress: user.walletAddress || null,
				profileImageUrl: user.profileImageUrl || null,
			},
			text: commentBoxRef.current.value,
			commentedOn: new Date().toUTCString(),
			likes: [],
			dislikes: [],
			replies: [],
		};
		setComments((prev) => [newComment, ...prev]);
		setUserEvents((prevUserEvents) => {
			const updatedUserEvents = prevUserEvents.map((eventItem) => {
				if (eventItem.id === event.id) {
					return {
						...eventItem,
						comments: [newComment, ...eventItem.comments],
					};
				}
				return eventItem;
			});
			return updatedUserEvents;
		});
		commentBoxRef.current.value = "";
		console.log(comments);
	}

	return (
		<section className="commentsection">
			<h1>Comments</h1>
			<main>
				<div className="commentsection-totalcomments">
					<FaComment />
					{event.comments.length}{" "}
					{event.comments.length === 1 ? "Comment" : "Comments"}
				</div>
				{iswalletAvailable ? (
					isConnected ? (
						<div className="commentsection-commentbox-container">
							<div className="commentsection-profileimage">
								{user.profileImageUrl ? (
									<img
										src={user.profileImageUrl}
										alt="profile-image"
									/>
								) : (
									<FaUserCircle />
								)}
							</div>

							<div
								className="commentsection-commentbox
					">
								<div className="comment-user">
									Comment as{" "}
									{user.nickname
										? user.nickname
										: user.walletAddress || null}
								</div>
								<textarea
									name=""
									id=""
									rows="4"
									placeholder="Leave a comment"
									ref={commentBoxRef}
									className="commentbox"></textarea>
								<div className="comment-options">
									<div></div>
									<button
										className="commentbtn"
										onClick={handleCommentPost}>
										Comment
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className="whitebutton commentsection-whitebutton">
							Connect Wallet to Comment
							<button
								onClick={() => {
									login();
								}}>
								Connect
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
							Get Wallet
						</button>
					</div>
				)}
				<div className="comment-container">
					{comments &&
						comments.map((comment) => {
							return (
								<Comment
									comment={comment}
									key={comment.id}
									user={user}
								/>
							);
						})}
				</div>
			</main>
		</section>
	);
};
const Comment = ({ comment, user }) => {
	const formatTimeDifference = (commentedDate, currentDatetime) => {
		const differenceInMilliseconds = currentDatetime - commentedDate;
		const seconds = Math.floor(differenceInMilliseconds / 1000);

		if (seconds < 60) {
			return `${seconds} seconds ago`;
		}

		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) {
			return `${minutes} minutes ago`;
		}

		const hours = Math.floor(minutes / 60);
		if (hours < 24) {
			return `${hours} hours ago`;
		}

		const days = Math.floor(hours / 24);
		if (days < 30) {
			return `${days} days ago`;
		}

		const months = Math.floor(days / 30.44);
		if (months < 12) {
			return `${months} months ago`;
		}

		const years = Math.floor(months / 12);
		return `${years} years ago`;
	};
	const commentedTime = formatTimeDifference(
		new Date(comment.commentedOn),
		new Date()
	);
	const replyRef = useRef(null);
	const [isReplying, setIsReplying] = useState(false);
	const [liked, setLiked] = useState(
		user.walletAddress
			? comment.likes.find((address) => address === user.walletAddress)
			: null
	);
	const [disliked, setDisliked] = useState(
		user.walletAddress
			? comment.dislikes.find((address) => address === user.walletAddress)
			: null
	);
	const handleLike = () => {
		if (!user) return;
		comment.dislikes = comment.dislikes.filter(function (item) {
			return item !== user.walletAddress;
		});
		setDisliked(false);
		comment.likes.push(user.walletAddress);
		setLiked(true);
	};
	const handleDislike = () => {
		if (!user) return;
		comment.likes = comment.likes.filter(function (item) {
			return item !== user.walletAddress;
		});
		setLiked(false);
		comment.dislikes.push(user.walletAddress);
		setDisliked(true);
	};
	const handleReply = (e) => {
		if (!user) return;
		e.preventDefault();
		const newReply = {
			user_id: user.walletAddress,
			text: replyRef.current.value,
		};

		comment.replies.push(newReply);
		setIsReplying(false);
	};
	return (
		<div className="comment">
			<div className="commentsection-profileimage">
				{comment.user.profileImageUrl ? (
					<img
						src={comment.user.profileImageUrl}
						alt="profile-image"
					/>
				) : (
					<FaUserCircle />
				)}
			</div>
			<div className="comment-content">
				<div className="comment-header">
					<div className="comment-user">
						{comment.user.nickname
							? comment.user.nickname
							: comment.user.walletAddress}
					</div>
					<div className="comment-time">{commentedTime}</div>
				</div>
				<div>{comment.text}</div>
				<div className="comment-btns">
					<span
						className="comment-like comment-btns-item"
						onClick={handleLike}>
						{liked ? <BiSolidLike /> : <BiLike />}
						<span className="comment-reply-title">
							{comment.likes.length}
						</span>
					</span>
					<span
						className="comment-dislike comment-btns-item"
						onClick={handleDislike}>
						{disliked ? <BiSolidDislike /> : <BiDislike />}
						<span className="comment-reply-title">
							{comment.dislikes.length}
						</span>
					</span>
					<span
						className="comment-reply comment-btns-item"
						onClick={() => setIsReplying((prev) => !prev)}>
						<BsReplyFill />{" "}
						<span className="comment-reply-title">Reply</span>
					</span>
					<span className="comment-options comment-btns-item">
						<BsThreeDots />{" "}
						<span className="comment-reply-title">More</span>
					</span>
				</div>
				{isReplying && (
					<form className="commentsection-commentbox">
						<textarea
							name=""
							id=""
							rows="4"
							placeholder="Leave a Reply"
							ref={replyRef}
							className="commentbox reply-box"></textarea>
						<div className="reply-buttons">
							<button
								className="reply-cancelbtn"
								onClick={() => setIsReplying(false)}
								type="button">
								Cancel
							</button>
							<button
								className="reply-confirmbtn"
								onClick={(e) => handleReply(e)}
								type="submit">
								Reply
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};
export default CommentSection;
