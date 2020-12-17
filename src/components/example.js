import react from "react";

import NewPostForm from "./NewPostForm";

const PostList = (props) => {
  return (
    <div className="contact-list">
      {contacts.map((contact, idx) => {
        const { name, email, address, phoneNumber, contactType } = contact;

        return (
          <div className="contact" key={idx}>
            <h3>
              {name} ({contactType})
            </h3>
            <h4>Address: {address}</h4>
            <h4>Email: {email}</h4>
            <h4>Phone Number: {phoneNumber}</h4>
            <div className="actions">
              <button onClick={() => setActiveContact(contact)}>EDIT</button>
              <button
                onClick={() => {
                  fetchAPI(
                    `https://univ-contact-book.herokuapp.com/api/contacts/${contact.id}`,
                    "DELETE"
                  )
                    .then((data) => {
                      removeContact(contact);
                    })
                    .catch(console.error);
                }}
              >
                DELETE
              </button>
            </div>
            <CommentList
              contact={contact}
              comments={contact.comments}
              removeComment={removeComment}
            />
            <NewCommentForm contact={contact} addComment={addComment} />
          </div>
        );
      })}
    </div>
  );
};

//export default Post;
