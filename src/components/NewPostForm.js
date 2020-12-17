import React, { useEffect, useState } from "react";
import { createNewPost, updatePost } from "../api";

//location
//will deliver
//title
//description
//price

const initFormData = {
  title: "",
  location: "",
  description: "",
  price: "",
  willDeliver: false,
};

const NewPostForm = (props) => {
  const { addPost, post, clearPost, patchPost } = props;

  const [formData, setFormData] = useState(initFormData);

  const isEdit = !!post;

  useEffect(() => {
    if (!post) {
      setFormData(initFormData);
    } else {
      const { title, location, description, price, willDeliver } = post;
      setFormData({ title, location, description, price, willDeliver });
    }
  }, [post]);

  const handleUpdate = (event) => {
    setFormData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form
      className="post-form"
      onSubmit={(event) => {
        event.preventDefault();

        // const url =
        //   "https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT/posts";

        // fetchAPI(url, "POST", payload)
        //   .then((response) => addPost(response.post))
        //   .catch((err) => {
        //     console.log("err", err);
        //   });

        if (isEdit) {
          updatePost(post._id, formData).then((res) => {
            if (res) {
              patchPost(res);
              setFormData(initFormData);
            }
          });
        } else {
          createNewPost(formData).then((res) => {
            if (res) {
              addPost(res);
              setFormData(initFormData);
            }
          });
        }
      }}
    >
      <h2>{isEdit ? "Edit Post" : "Create New Post"}</h2>
      <label>Title </label>
      <input
        type="text"
        value={formData.title}
        name="title"
        onChange={handleUpdate}
      />
      <br />
      <label>Location </label>
      <input
        type="text"
        value={formData.location}
        name="location"
        onChange={handleUpdate}
      />
      <br />
      <label>Description </label>
      <input
        type="text"
        value={formData.description}
        name="description"
        onChange={handleUpdate}
      />
      <br />
      <label>Price </label>
      <input
        type="text"
        value={formData.price}
        name="price"
        onChange={handleUpdate}
      />
      <br />
      <label>Deliver </label>
      <input
        type="text"
        value={formData.willDeliver}
        name="willDeliver"
        onChange={handleUpdate}
      />
      <br />

      {isEdit ? <button onClick={clearPost}>CANCEL</button> : null}
      <button>{isEdit ? "UPDATE" : "SUBMIT"}</button>
    </form>
  );
};

export default NewPostForm;
