import { useContext, useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import XhatContext from "../../context/XhatContext";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

function Chatroom() {
  const [message, setMessage] = useState("");

  const { userProfile, selectedUser, setSelectedUser, loggedInUserId, messages, setMessages } =
    useContext(XhatContext);
  

  useEffect(() => {
    if (selectedUser) {
      socket.emit("join_room", {
        senderId: loggedInUserId,
        recipientId: selectedUser,
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && selectedUser) {
      socket.emit("send_message", {
        senderId: loggedInUserId,
        recipientId: selectedUser,
        message: message,
      });
      setMessage("");
    }
  };

  return (
    <div className="h-full flex flex-col justify-between ">
      <div className=" space-y-2 ">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={`${
              msg.senderId === loggedInUserId
                ? "flex justify-start w-[50%] bg-slate-500 rounded-[5px] shadow-md m-[10px] p-[10px]"
                : "flex w-[50%] ml-[49%] bg-slate-800 text-white rounded-[5px] shadow-md p-[10px]"
            }`}
          >
            <strong>{msg.senderId === loggedInUserId ? "You" : "Them"}:</strong>
            {msg.message}
          </p>
        ))}
      </div>
      <div className="bg-slate-500">
        <form
          action=""
          className="flex justify-between w-[80%] p-[10px] m-auto "
          onSubmit={(e)=>sendMessage(e)}
        >
          <input
            type="text"
            placeholder="Type a message"
            className="bg-inherit outline-none text-white w-[70%]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="text-[30px] text-slate-900" >
            <IoMdSend />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatroom;
