import { useContext, useEffect } from "react";
import { NotificationContext } from "../context/notification/notificationContext";

export default function Notification() {
  const { notification, setNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (notification.show) {
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "success" });
      }, 3000);
    }
  }, [notification, setNotification]);

  return (
    notification.show && (
      <div className="absolute bottom-5 left-0 right-0 m-auto w-fit">
        <div className={`rounded-sm p-5 text-white ${notification.type === "success" ? "bg-secondary" : "bg-red-500"}`}>{notification.message}</div>
      </div>
    )
  );
}
