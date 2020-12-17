import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { isUserLoggedIn, userData } from "./api";

// These imports won't work until you fix ./components/index.js
import { Title, Page, Site_Nav } from "./components";
const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    userData().then((res) => {
      setCurrentUser(res);
    });
  }, []);

  return (
    <div className="app">
      <Title />
      <Page isLoggedIn={isLoggedIn} currentUser={currentUser} />
      <Site_Nav
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
