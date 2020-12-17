import React, { useEffect, useState } from "react";
import fetchPostObjects from "../api";
import "./Page.css";
import "./NewPostForm.js";
const URL = "https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT";

// import "./Post.js";
import Posts from "./Posts.js";

import NewPostForm from "./NewPostForm.js";

const Page = (props) => {
  const { isLoggedIn, currentUser } = props;

  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    fetchPostObjects(
      "https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT/posts"
    )
      .then((data) => setPosts(data.posts))
      .catch(console.error);
  }, []);

  const addPost = (post) => {
    setPosts((state) => [...state, post]);
  };

  const removePost = (postId) => {
    setPosts((state) => state.filter((post) => post._id !== postId));
  };

  const patchPost = (updatedPost) => {
    setPosts((posts) =>
      posts.map((post) => {
        if (post._id === updatedPost._id) {
          return updatedPost;
        }

        return post;
      })
    );
  };

  return (
    <div className="page">
      {isLoggedIn ? (
        <div className="new-post-form">
          <NewPostForm
            addPost={addPost}
            patchPost={patchPost}
            post={activePost}
            clearPost={() => {
              setActivePost(null);
            }}
          />
        </div>
      ) : null}
      <div className="all-posts">
        <Posts
          posts={posts}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          removePost={removePost}
          setActivePost={setActivePost}
        />
      </div>
    </div>
  );
};

export default Page;
