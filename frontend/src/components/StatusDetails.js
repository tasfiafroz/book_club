
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// import '../styles/style.css';

// const StatusDetails = ({status}) => {

//     return (
//         <div className="status-details"> 
//             <h4>{status.name}</h4>
//             <p><strong>Status: </strong>{status.description}</p>
//             <p>{formatDistanceToNow(new Date(status.createdAt), { addSuffix: true})}</p>
//         </div>
//     )
// }

// export default StatusDetails

import { useState } from "react";
import '../styles/style.css';

const StatusDetails = ({ status }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState(status.replies || []);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply = { text: replyText };

    try {
      const response = await fetch(`/api/status/${status._id}/reply`, {
        method: "POST",
        body: JSON.stringify(newReply),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const json = await response.json();
        setReplies(json.replies); // Update local state with the full replies array
        setReplyText(""); // Clear input
      } else {
        console.error("Failed to add reply:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  return (
<div className="status">
  <h4>Name: {status.name}</h4>
  <p>Status: {status.description}</p>

  <button onClick={() => setShowReplies(!showReplies)}>
    {showReplies ? "Hide Replies" : "See Replies"} ({replies.length})
  </button>

  {showReplies && (
    <div className="replies">
      {replies.length > 0 ? (
        replies.map((reply, index) => <p key={index}>- {reply.text}</p>)
      ) : (
        <p>No replies yet.</p>
      )}

      <form onSubmit={handleReplySubmit} className="reply-form">
        <input
          type="text"
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button className="abc" type="submit">Reply</button>
      </form>
    </div>
  )}
</div>
  );
};

export default StatusDetails;