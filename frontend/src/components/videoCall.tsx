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
      console.log("Local stream obtained:", stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Show local stream for debugging
      }
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
      console.log("Tracks added to peer connection:", stream.getTracks());

      pc.addEventListener("icecandidate", event => {
        if (event.candidate) {
          console.log("Sending ICE candidate:", event.candidate);
          socket.emit("sendIceCandidateToSignalingServer", {
            iceCandidate: event.candidate,
            receiverSocketId: onlineUsers.find(user => user.userId === activeConversation.receiver)?.socketId,
          });
        }
      });

      pc.addEventListener("track", event => {
        console.log("Received remote tracksssssssss:", event.streams[0]);
        event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
        console.log("helo::::::::::::::::::::::::");
        
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
      console.log("Sending offer:", offer);
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
    console.log("Received offer:", data.offer);
    const stream = await getStream();
    const pc = peerConnection || createPeerConnection(stream);
    if (!pc) return;

    try {
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      console.log("Sending answer:", answer);
      socket.emit("sendAnswerToSignalingServer", {
        answer,
        receiverSocketId: onlineUsers.find(user => user.userId === activeConversation.receiver)?.socketId,
      });
    } catch (error) {
      console.error("Error handling received offer:", error);
    }
  };

  const handleReceiveAnswer = async (data: any) => {
    console.log("Received answer:", data.answer);
    const pc = peerConnection;
    if (!pc) return;

    try {
      console.log("Received answer:", data.answer);
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
    <div className="w-dvh absolute w-100 z-20 left-0 right-0 ml-auto mr-auto flex items-center">
      <video controls ref={videoRef} autoPlay playsInline></video>
    </div>
  );
};

export default VideoCall;
