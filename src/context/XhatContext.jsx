import { createContext, useContext, useState, useEffect } from "react";
import useAlert from "../hooks/useAlert";
import AuthContext from "./AuthContext";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const XhatContext = createContext();

export const XhatProvider = ({ children }) => {
  const { alertInfo, showAndHide } = useAlert();
  const [state, dispatch] = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const isAuthenticated = state.accessToken !== null;
  const loggedInUserId = userProfile._id;

  useEffect(() => {
    fetchUsers();
    getUserProfile()
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/xhatya/getusers");
    const data = await res.json();
    setUsers(data);
  };

  const getUserProfile = async () => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      try {
        const res = await fetch(
          "http://localhost:8000/xhatya/userProfile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        const data = await res.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    } else {
      console.log(false);
      
    }
  };
  

  const onUserSelect = async(userId) => {

    setSelectedUser(userId);


    const senderId = loggedInUserId; 

    socket.emit("join_room", {
      senderId: senderId,
      recipientId: userId, 
    });

    console.log(`Joined room with user: ${userId}`);

    try {
        
        const res = await fetch("http://localhost:8000/xhatya/getmessages", {
            method : "POST",
            headers: {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem("auth-token")
            },
            body: JSON.stringify({senderId, userId})
        })
        const previousMessages = await res.json();
        
        
        console.log(previousMessages);
        
        setMessages(previousMessages); 
      } catch (error) {
        console.error("Error fetching previous messages:", error);
      }
  };

  return (
    <XhatContext.Provider
      value={{
        alertInfo,
        showAndHide,
        isAuthenticated,
        userProfile,
        setUserProfile,
        selectedUser,
        setSelectedUser,
        users, 
        setUsers,
        onUserSelect,
        loggedInUserId,
        messages, 
        setMessages
      }}
    >
      {children}
    </XhatContext.Provider>
  );
};

export default XhatContext;
