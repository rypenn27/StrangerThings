import React from "react";
import Messages from "./Messages";

//import NewPostForm from "./NewPostForm";
const URL = "https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT";
import { deletePost } from "../api";

const Posts = (props) => {
  const { posts, currentUser, isLoggedIn, removePost, setActivePost } = props;

  const onDeletePost = async (postId) => {
    const result = await deletePost(postId);
    removePost(postId);
  };

  console.log(posts);
  return (
    <div className="post-list">
      {posts.map((post, idx) => {
        const { title, location, description, price, deliver, author } = post;
        return (
          <div className="post" key={idx}>
            <h3>{title}</h3>
            <h4>Location: {location}</h4>
            <h4>Description: {description}</h4>
            <h4>Price: {price}</h4>
            <h4>Deliver: {deliver}</h4>
            <h4>Author: {author.username}</h4>
            <h4></h4>
            {currentUser?._id === post.author._id ? (
              <>
                <div className="actions">
                  <button onClick={() => setActivePost(post)}>EDIT</button>
                </div>

                <div className="actions">
                  <button onClick={() => onDeletePost(post._id)}>DELETE</button>
                </div>
              </>
            ) : null}
            {isLoggedIn ? (
              <div className="message">
                <Messages post={post} currentUser={currentUser} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
