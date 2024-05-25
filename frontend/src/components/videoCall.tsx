import { useContext, useEffect, useRef, useState } from "react";
import { NotificationContext } from "../context/notification/notificationContext";
import socket from "../config/socketConfig";
import { ChatContext } from "../context/chat/chatContext";
import { AuthContext } from "../context/auth/authContext";

const VideoCall = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setNotification } = useContext(NotificationContext);
  const { activeConversation, onlineUsers } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const remoteStream = useRef(new MediaStream()).current;

  const openMediaDevices = async (constraints: MediaStreamConstraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
  };

  const getStream = async () => {
    try {
      const stream = await openMediaDevices({ video: true, audio: true });
      setLocalStream(stream); // Set localStream state
      return stream;
    } catch (error) {
      setNotification({ message: "Permission request denied!", type: "error", show: true });
      console.error("Error accessing media devices.", error);
      return null;
    }
  };

  const createPeerConnection = (stream: MediaStream | null) => {
    if (!stream) return null;

    const peerConfiguration = {
      iceServers: [
        { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] },
      ],
    };

    try {
      const pc = new RTCPeerConnection(peerConfiguration);
      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      pc.addEventListener("icecandidate", event => {
        if (event.candidate) {
          socket.emit("sendIceCandidateToSignalingServer", {
            iceCandidate: event.candidate,
            receiverSocketId: onlineUsers.find(user => user.userId === activeConversation.receiver)?.socketId,
          });
        }
      });

      pc.addEventListener("track", event => {
        event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
        if (videoRef.current) {
          videoRef.current.srcObject = remoteStream;
        }
      });

      setPeerConnection(pc);
      return pc;
    } catch (error) {
      console.error("Error creating RTCPeerConnection:", error);
      return null;
    }
  };

  const makeCall = async () => {
    const stream = await getStream();
    if (!stream) return;

    const pc = createPeerConnection(stream);
    if (!pc) return;

    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("sendOfferToSignalingServer", {
        offer,
        receiverSocketId: onlineUsers.find(user => user.userId === activeConversation.receiver)?.socketId,
        senderId: user.id,
      });
    } catch (error) {
      console.error("Error making call:", error);
    }
  };

  const handleReceiveOffer = async (data: any) => {
    const stream = localStream;
    const pc = peerConnection || createPeerConnection(stream);
    if (!pc) return;

    try {
      await pc.setRemoteDescription(data.offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("sendAnswerToSignalingServer", {
        answer,
        receiverSocketId: onlineUsers.find(user => user.userId === activeConversation.receiver)?.socketId,
      });
    } catch (error) {
      console.error("Error handling received offer:", error);
    }
  };

  const handleReceiveAnswer = async (data: any) => {
    const pc = peerConnection;
    if (!pc) return;

    try {
      await pc.setRemoteDescription(data.answer);
    } catch (error) {
      console.error("Error handling received answer:", error);
    }
  };

  useEffect(() => {
    makeCall();

    socket.on("receiveOfferFromSignalingServer", handleReceiveOffer);
    socket.on("receiveAnswerFromSignalingServer", handleReceiveAnswer);

    return () => {
      socket.off("receiveOfferFromSignalingServer", handleReceiveOffer);
      socket.off("receiveAnswerFromSignalingServer", handleReceiveAnswer);
    };
  }, [activeConversation, onlineUsers]); // Ensure proper cleanup

  return (
    <div className="w-dvh absolute h-dvh">
      <video controls ref={videoRef} autoPlay playsInline></video>
    </div>
  );
};

export default VideoCall;
