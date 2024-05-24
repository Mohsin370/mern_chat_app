import { useContext, useEffect, useRef } from "react";
import { NotificationContext } from "../context/notification/notificationContext";

// interface propsType {
//   videoStream: MediaStream;
// }

const VideoCall = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setNotification } = useContext(NotificationContext);

  const openMediaDevices = async (constraints: MediaStreamConstraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
  };

  const getStream = () => {
    try {
      let stream = openMediaDevices({ video: true, audio: true });
      stream.catch(() => {
        setNotification({ message: "Permission request denied!", type: "error", show: true });
      });
      return stream;
    } catch (error) {
      setNotification({ message: "Permission request denied!", type: "error", show: true });
      console.error("Error accessing media devices.", error);
    }
  };

  const createPeerConnection = async () => {
    let peerConfiguration = {
      iceServers: [
        {
          urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
        },
      ],
    };
    try {
      const peerConnection = await new RTCPeerConnection(peerConfiguration);
      console.log(peerConnection);
    } catch (error) {
      console.log(error);
    }
  };

  const makeCall = async () => {
    try {
      const localStream = await getStream();
      if (videoRef.current && localStream) {
        videoRef.current.srcObject = localStream;
      }
      createPeerConnection();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    makeCall();
  }, []);

  return (
    <div className="w-dvh absolute h-dvh">
      <video controls ref={videoRef}></video>
    </div>
  );
};

export default VideoCall;
