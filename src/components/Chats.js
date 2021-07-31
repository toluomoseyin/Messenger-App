import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { user } = useAuth();

  const handleLogout = async () => {
    auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "4bb0d3f7-c567-4687-9aec-024498fb124a",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "50dfdf77-e87b-4a15-b1d0-d329a9cd0bb9",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);
  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">ToluChatApp</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(90vh)"
        projectID="4bb0d3f7-c567-4687-9aec-024498fb124a"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
