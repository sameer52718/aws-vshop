import React from "react";
import imgChat from "../../../assets/images/chat/chating.png";
import avatar from "../../../assets/images/avatar/NoProfile.png";
import { Icon } from "@iconify/react";

const Chat = () => {
  return (
    <div className="container lg:h-[550px] mx-auto my-12">
      <div className="w-full md:h-full flex flex-col lg:flex-row justify-between items-center gap-5">
        <div className="w-[100%] sm:w-[80%] md:w-[60%] lg:w-[48%] flex justify-center items-center">
          {imgChat && (
            <img className="w-[100%] h-[100%]" src={imgChat} alt="chat" />
          )}
        </div>
        <div className="w-[100%] sm:w-[70%] lg:w-[40%] h-[450px] md:h-full bg-white flex flex-col p-3 border border-[#E0E0E0]">
          <div className=" w-[100%] md:h-[15%] flex items-center gap-2 bg-primary-800 p-3">
            <img
              className="w-[50px] h-[50px] object-cover"
              src={avatar}
              alt="avatar"
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-normal text-secondary-50">
                Khadim Hussain
              </h1>
              <span className="text-sm text-secondary-50">Online</span>
            </div>
          </div>
          <div className="w-[100%] h-[75%] overflow-hidden flex flex-col bg-white p-3 gap-3">
            <div className="w-[55%] py-2 px-3 bg-secondary-100 text-primary-800 rounded-lg rounded-bl-none self-start">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
              ratione quasi excepturi
            </div>
            <div className="w-[55%] py-2 px-3 bg-primary-800 text-secondary-50 rounded-lg rounded-br-none self-end">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
              ratione quasi excepturi
            </div>
            <div className="w-[55%] py-2 px-3 bg-secondary-100 text-primary-800 rounded-lg rounded-bl-none self-start">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
              ratione quasi excepturi
            </div>
          </div>
          <div className="w-[100%] h-[10%] bg-white flex items-center border-t-2 border-[#E0E0E0]">
            <input
              className="w-[90%] h-full outline-none pl-4"
              placeholder="Add a text message here..."
              type="text"
              name="message"
            />
            <button className="w-[10%] h-[70%] text-primary-700 active:text-primary-800">
              <Icon className="w-[100%] h-[100%]" icon="ic:sharp-send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
