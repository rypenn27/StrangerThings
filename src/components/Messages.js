import React, { useState } from "react";
import { addMessage } from "../api";

const Messages = (props) => {
  const { post, currentUser } = props;

  const [messageText, setMessageText] = useState("");

  const handleUpdate = (event) => {
    setMessageText(event.target.value);
  };

  const onPostMessage = async () => {
    const result = await addMessage(post._id, messageText);
    if (result) {
      console.log("addMessage", result);
      setMessageText("");
    }
  };

  if (post.author._id !== currentUser?._id) {
    return (
      <div>
        <input value={messageText} onChange={handleUpdate} />
        <button onClick={onPostMessage}>Post Message</button>
      </div>
    );
  }

  return <div>Messages</div>;
};

export default Messages;
