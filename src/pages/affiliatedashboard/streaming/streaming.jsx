/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import {
  Constants,
  MeetingConsumer,
  MeetingProvider,
  useMeeting,
  useParticipant,
  usePubSub,
} from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Poster from "@/assets/images/avatar/avatar.png";
import { userProfile } from "@/constant/apiRoutes";

function ParticipantView(props) {
  const micRef = useRef(null);
  const { localParticipant } = useMeeting();
  const { webcamStream, micStream, webcamOn, micOn, isLocal } = useParticipant(props.participantId);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const { publish, messages } = usePubSub("CHAT");

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  //Playing the audio in the <audio>
  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current.play().catch((error) => console.error("videoElem.current.play() failed", error));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Sending the Message using the publish method
    publish(
      message,
      { persist: true },
      { name: user ? `${user.first_name} ${user.last_name}` : "Guest", profile: user?.profile }
    );
    // Clearing the message input
    setMessage("");
  };

  return (
    <div className="mt-4">
      <audio ref={micRef} autoPlay muted={isLocal} />
      {webcamOn && (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 ">
          <div className="w-full col-span-1 lg:col-span-2 bg-white h-[500px] py-4 px-4 rounded-md">
            <ReactPlayer
              pip={false}
              light={false}
              controls={false}
              muted={true}
              playing={true}
              url={videoStream}
              height={"100%"}
              width={"100%"}
              onError={(err) => {
                console.log(err, "participant video error");
              }}
            />
          </div>
          <div className="col-span-1 w-full">
            <div className="relative">
              <div className=" h-full w-full rounded-md overflow-x-hidden ">
                <div className="flex justify-between items-center py-2 px-4 bg-main ">
                  <h6 className="text-lg text-white">Chats</h6>
                  <button type="button">
                    <Icon icon="fluent:chat-12-regular" color="white" />
                  </button>
                </div>
                <div className="flex flex-col gap-3 py-4 px-4 bg-white h-[300px]  xl:h-[392px] overflow-y-auto no-scrollbar">
                  <div className="w-[100%] flex flex-col gap-3">
                    {messages.map((message) =>
                      localParticipant.id !== message.senderId ? (
                        <div
                          className="flex items-start gap-4 bg-gray-50 px-2 py-2 rounded-md w-[90%]"
                          key={message.id}
                        >
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
                            <p className="xs:text-xs text-[10px] text-right">{message.message}</p>
                          </div>
                          <img src={Poster} alt="" className="w-8 h-8 rounded-full object-cover" />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <form className="flex " onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      placeholder="Enter Comment ..."
                      className="flex-1 outline-none px-4 py-2 bg-main text-white text-sm placeholder:text-white"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary hover:shadow-none hover:ring-offset-0 hover:ring-0   rounded-none ring-0 outline-none"
                    >
                      <Icon icon={"material-symbols:send-outline"} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Controls() {
  const { end } = useMeeting();
  return (
    <div className="flex justify-end">
      <button onClick={() => end()} className="btn btn-danger">
        Leave
      </button>
    </div>
  );
}

function SpeakerView() {
  //Get the participants and HLS State from useMeeting
  const { participants } = useMeeting();

  //Filtering the host/speakers from all the participants
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter((participant) => {
      return participant.mode == Constants.modes.CONFERENCE;
    });
    return speakerParticipants;
  }, [participants]);
  return (
    <div>
      {/* Controls for the meeting */}
      <Controls />

      {/* Rendring all the HOST participants */}
      {speakers.map((participant) => (
        <ParticipantView participantId={participant.id} key={participant.id} />
      ))}
    </div>
  );
}

function Container() {
  const navigate = useNavigate();
  const [joined, setJoined] = useState(null);
  //Get the method which will be used to join the meeting.
  const { join, startRecording, startHls, end } = useMeeting();
  const mMeeting = useMeeting({
    //callback for when a meeting is joined successfully
    onMeetingJoined: () => {
      if (mMeetingRef.current.localParticipant.mode == "CONFERENCE") {
        mMeetingRef.current.localParticipant.pin();
      }
      setJoined("JOINED");
      startRecording();
      startHls();
    },
    onMeetingLeft: () => {
      navigate("/dashboard/seller/streaming");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  useEffect(() => {
    return () => {
      end();
    };
  }, []);
  const handleJoin = () => {
    setJoined("JOINING");
    join();
  };
  return (
    <div className="container">
      {joined && joined == "JOINED" ? (
        mMeeting.localParticipant.mode == Constants.modes.CONFERENCE ? (
          <SpeakerView />
        ) : mMeeting.localParticipant.mode == Constants.modes.VIEWER ? (
          <></>
        ) : null
      ) : joined && joined == "JOINING" ? (
        <p>Joining the Streaming...</p>
      ) : (
        <div className="flex justify-end">
          <button className="btn btn-primary" type="button" onClick={handleJoin}>
            Ready To Start
          </button>
        </div>
      )}
    </div>
  );
}

const Streaming = () => {
  const { url } = useParams();
  const {
    user: { first_name, last_name },
  } = useSelector((state) => state.auth);
  const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isMobile]);

  const token = import.meta.env.VITE_VIDEOSDK_TOKEN;

  if (!token) {
    return null;
  }

  return (
    <>
      {token ? (
        <MeetingProvider
          token={token}
          config={{
            meetingId: url,
            micEnabled: true,
            webcamEnabled: true,
            name: `${first_name} ${last_name}`,
            mode: Constants.modes.CONFERENCE,
          }}
        >
          <MeetingConsumer>{() => <Container meetingId={url} />}</MeetingConsumer>
        </MeetingProvider>
      ) : null}
    </>
  );
};

export default Streaming;
