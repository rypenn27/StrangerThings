const URL = "https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT";
import React, { useState } from "react";

//build fetches, export
//fetch gets all the posts

export let userObject = {
  username: "",
  password: "",
};

//-----REGISTER A NEW USER ----------////
export const registerUser = async (createdUsername, createdPassword) => {
  console.log(createdUsername, createdPassword);
  try {
    const response = await fetch(`${URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${createdUsername}`,
          password: `${createdPassword}`,
        },
      }),
    });
    const res = await response.json();
    if (res.success) {
      localStorage.setItem("token", res.data.token);
      return res.data;
    }

    console.log("Error in registerUser:", res.error);
  } catch (error) {
    console.log("Error from registerUSer(): ", error);
  }
};

/////--------LOG A USER IN------------///////
export const loginUser = async (
  alreadyCreatedUsername,
  alreadyCreatedPassword
) => {
  userObject.username = alreadyCreatedUsername;
  userObject.password = alreadyCreatedPassword;

  try {
    const response = await fetch(`${URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: alreadyCreatedUsername,
          password: alreadyCreatedPassword,
        },
      }),
    });
    const res = await response.json();
    if (res.success) {
      localStorage.setItem("token", res.data.token);
      return res.data;
    }

    console.log("Error in loginUser", res.error);
  } catch (error) {
    console.log("Error from loginUser(): ", error);
  }
};

///----Log OUt---////
export const logOut = () => {
  localStorage.removeItem("token");
};
///isUserLoggedIn////
export const isUserLoggedIn = () => {
  let token = localStorage.getItem("token");
  return !!token;
};

///-----Grab Already Logged in User's Data----/////
export const userData = async () => {
  let token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await fetch(`${URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    });

    const res = await response.json();
    if (res.success) {
      return res.data;
    }
    console.log("Failed to fetch user data", res.error);
  } catch (error) {
    console.log("Error from userData(): ", error);
  }
};

//////---Fetch Array of Post Objects----//////////
export const fetchPostObjects = async () => {
  try {
    const response = await fetch(`${URL}/posts`);
    const { data } = await response.json();

    ///  localStorage.getItem("token", data.data.token);
    return data;
  } catch (error) {
    console.log("Error from fetchPostObjects", error);
  }
};

export const createNewPost = async (post) => {
  let token = localStorage.getItem("token");
  try {
    const response = await fetch(`${URL}/posts`, {
      method: "post",
      body: JSON.stringify({ post }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    });
    const res = await response.json();
    if (res.success) {
      return res.data.post;
    }

    console.log("Error sending a new post", res.error);
  } catch (err) {
    console.log("POST ERROR", err);
  }
};

export const updatePost = async (postId, post) => {
  let token = localStorage.getItem("token");

  try {
    const response = await fetch(`${URL}/posts/${postId}`, {
      method: "PATCH",
      body: JSON.stringify({ post }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    });
    const res = await response.json();
    if (res.success) {
      return res.data.post;
    }

    console.log("Error updating a post", res.error);
  } catch (err) {
    console.log("PATCH ERROR", err);
  }
};

export const deletePost = async (postId) => {
  let token = localStorage.getItem("token");
  try {
    const response = await fetch(`${URL}/posts/${postId}`, {
      method: "delete",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    });
    const res = await response.json();
    if (res.success) {
      return true;
    }

    console.log("Error deleting a post", res.error);
    return false;
  } catch (err) {
    console.log("DELETE ERROR", err);
  }
};

export const addMessage = async (postId, message) => {
  let token = localStorage.getItem("token");
  try {
    const response = await fetch(`${URL}/posts/${postId}/messages`, {
      method: "POST",
      body: JSON.stringify({ message: { content: message } }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    });
    const res = await response.json();
    if (res.success) {
      return res.data.message;
    }

    console.log("Error sending a new message", res.error);
  } catch (err) {
    console.log("POST Message ERROR", err);
  }
};

export default fetchPostObjects;
