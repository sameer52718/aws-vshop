/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { Constants, useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import Hls from "hls.js";
import { useEffect, useMemo, useRef, useState } from "react";
import Poster from "../../../assets/images/avatar/avatar.png";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { userProfile } from "../../../constant/apiRoutes";
import EmojiPicker from "emoji-picker-react";
import { useClickOutside } from "primereact/hooks";
import ReactPlayer from "react-player";

const Container = ({ meetingId, data, handleLike }) => {
  const { user } = useSelector((state) => state.auth);
  const [joined, setJoined] = useState(null);
  const { hlsUrls, hlsState, join, localParticipant, leave } = useMeeting();
  const [fileUrl, setFileUrl] = useState("");
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(false);
  const { publish, messages } = usePubSub("CHAT");
  const overlayRef = useRef(null);

  useClickOutside(overlayRef, () => {
    setActive(false);
  });

  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      if (mMeetingRef.current?.localParticipant?.mode == "CONFERENCE") {
        mMeetingRef.current?.localParticipant.pin();
      }
      setJoined("JOINED");
    },
    onMeetingStateChanged: ({state}) => {
      if (state === "CLOSING") {
        location.reload();
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const playerRef = useRef(null);

  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  useEffect(() => {
    if (hlsUrls.downstreamUrl && hlsState == "HLS_PLAYABLE") {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxLoadingDelay: 1,
          defaultAudioCodec: "mp4a.40.2",
          maxBufferLength: 0,
          maxMaxBufferLength: 5,
          startLevel: 0,
          startPosition: -1,
          maxBufferHole: 0.001,
          highBufferWatchdogPeriod: 0,
          nudgeOffset: 0.05,
          nudgeMaxRetry: 1,
          maxFragLookUpTolerance: 0.1,
          liveSyncDurationCount: 1,
          abrEwmaFastLive: 1,
          abrEwmaSlowLive: 3,
          abrEwmaFastVoD: 1,
          abrEwmaSlowVoD: 3,
          maxStarvationDelay: 1,
        });

        let player = document.querySelector("#hlsPlayer");

        hls.loadSource(hlsUrls.downstreamUrl);
        hls.attachMedia(player);
      } else {
        if (typeof playerRef.current?.play === "function") {
          playerRef.current.src = hlsUrls.downstreamUrl;
          playerRef.current.play();
        }
      }
    }
  }, [hlsUrls, hlsState]);

  useEffect(() => {
    join();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      leave();
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data, status } = await axios.get(`https://api.videosdk.live/v2/recordings?roomId=${meetingId}`, {
          headers: { Authorization: import.meta.env.VITE_VIDEOSDK_TOKEN },
        });
        if (status === 200) {
          setFileUrl(data?.data[0]?.file?.fileUrl);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (hlsState === Constants.hlsEvents.HLS_STOPPED) {
      getData();
    }
  }, [hlsState, meetingId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Sending the Message using the publish method
    publish(
      message,
      { persist: true },
      {
        name: user ? `${user.first_name} ${user.last_name}` : "Guest",
        profile: user?.profile,
      }
    );
    // Clearing the message input
    setMessage("");
  };

  const { participants } = useMeeting();

  const attendeesCount = useMemo(() => {
    const attendees = [...participants.values()]?.filter((participant) => {
      return participant?.mode == "VIEWER";
    });
    console.log(attendees);
    return attendees.length || 0;
  }, [participants]);

  const handleCopy = () => {
    navigator.clipboard.writeText(location.href);
    toast.success("Link copied successfully");
  };

  const handleEmojiClick = ({ emoji }) => {
    setMessage((prev) => prev + emoji);
    setActive(false);
  };

  return (
    <section className="grid lg:grid-cols-3 grid-cols-1 gap-8 ">
      <div className="relative w-full col-span-1 lg:col-span-2">
        {hlsState === Constants?.hlsEvents?.HLS_PLAYABLE && (
          <>
            <span className="badge rounded-sm badge-danger bg-red-600 absolute top-4 right-3 px-4 z-[99999]">
              <div className="flex items-center">
                <Icon className="mb-[3px] mr-[2px] text-white" icon={"ph:dot-fill"} /> Live{" "}
              </div>
            </span>
            <span className="badge rounded-sm badge-danger bg-main absolute top-4 px-4 right-[94px] z-[99999]">
              <div className="flex items-center">
                <Icon className="mb-[3px] mr-1" icon={"carbon:view"} /> {attendeesCount}{" "}
              </div>
            </span>
            <button
              className={`rounded-full bg-white shadow-lg w-[30px] xs:w-[50px] flex items-center  justify-center h-[30px] xs:h-[50px] absolute bottom-10 xs:bottom-20 right-1 xs:right-3 z-[99999]`}
              type="button"
              onClick={handleLike}
            >
              {data?.streaming && data.streaming[0]?.like ? (
                <Icon className="w-full lg:w-7 h-full lg:h-7 text-red-600" icon="ph:heart-fill" />
              ) : (
                <Icon className="w-full lg:w-7 h-full lg:h-7 text-red-600" icon={"ph:heart"} />
              )}
            </button>
            <button
              onClick={handleCopy}
              className=" rounded-full bg-white shadow-lg w-[30px] xs:w-[50px] flex items-center  justify-center h-[30px] xs:h-[50px] absolute bottom-1 xs:bottom-5 right-1 xs:right-3 z-[99999]"
            >
              <Icon className="w-full lg:w-7 h-full lg:h-7 text-main" icon={"mdi:share-outline"} />
            </button>
          </>
        )}

        <div className="w-full">
          {joined === "JOINED" && mMeeting?.localParticipant?.mode === Constants?.modes?.VIEWER && (
            <>
              {hlsState !== "HLS_PLAYABLE" ? (
                <div>
                  <ReactPlayer
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    url={fileUrl}
                    height={"100%"}
                    width={"100%"}
                  />
                  {/* <video src={fileUrl} autoPlay={true} controls muted={true}></video> */}
                </div>
              ) : (
                <div className="relative">
                  <video
                    ref={playerRef}
                    id="hlsPlayer"
                    autoPlay={true}
                    controls
                    playsInline
                    muted={true}
                    onError={(err) => {
                      console.log(err, "hls video error");
                    }}
                  ></video>
                </div>
              )}
            </>
          )}
          {joined === "JOINING" && <p>Joining the Streaming...</p>}
        </div>
      </div>
      <div className="col-span-1">
        <div className="relative">
          <div className=" h-full w-full rounded-md overflow-x-hidden ">
            <div className="flex justify-between items-center py-2 px-4 bg-main ">
              <h6 className="text-lg text-white">Chat</h6>
              <button type="button">
                <Icon icon="fluent:chat-12-regular" color="white" />
              </button>
            </div>
            <div className="flex flex-col gap-3 py-4 px-4 bg-white h-[300px]  xl:h-[392px] overflow-y-auto no-scrollbar">
              <div className="w-[100%] flex flex-col gap-3">
                {messages.map((message) =>
                  localParticipant?.id !== message?.senderId ? (
                    <div className="flex items-start gap-4 bg-gray-50 px-2 py-2 rounded-md w-[90%]" key={message.id}>
                      <img
                        src={message.payload?.profile ? `${userProfile}/${message.payload?.profile}` : Poster}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <span className="xs:text-[14px] text-[13px] font-semibold">{message?.payload?.name}</span>
                        <p className="xs:text-xs text-[10px]">{message.message}</p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex items-start gap-4 bg-gray-100 px-2 py-2 rounded-md w-[90%] justify-end"
                      key={message.id}
                    >
                      <div>
                        <span className="xs:text-[14px] text-[13px] font-semibold block text-right">
                          {message?.payload?.name}
                        </span>
                        <p className="xs:text-xs text-[10px] text-right">{message?.message}</p>
                      </div>
                      <img src={Poster} alt="" className="w-8 h-8 rounded-full object-cover" />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="w-full">
              <form className="flex relative" onSubmit={handleSendMessage}>
                <div className="absolute -top-[360px] left-4" ref={overlayRef}>
                  <EmojiPicker width={300} height={350} open={active} onEmojiClick={handleEmojiClick} />
                </div>
                <button
                  type="button"
                  className="btn btn-primary hover:shadow-none hover:ring-offset-0 hover:ring-0   rounded-none ring-0 outline-none"
                  onClick={() => setActive((prev) => !prev)}
                >
                  <Icon icon="fluent:emoji-28-regular" />
                </button>
                <input
                  type="text"
                  placeholder="Enter Message ..."
                  className="flex-1 outline-none px-4 py-2 bg-main text-white text-sm placeholder:text-white disabled:cursor-not-allowed"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={hlsState !== "HLS_PLAYABLE"}
                />

                <button
                  type="submit"
                  className="btn btn-primary hover:shadow-none hover:ring-offset-0 hover:ring-0   rounded-none ring-0 outline-none"
                  disabled={hlsState !== "HLS_PLAYABLE"}
                >
                  <Icon icon={"material-symbols:send-outline"} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Container;
