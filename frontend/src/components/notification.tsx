import { useContext } from "react";
import { NotificationContext } from "../context/notification/notificationContext";

export default function Notification() {
  const { notification, setNotification } = useContext(NotificationContext);
  if (notification.show) {
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  }
  return (
    notification.show && (
      <div className="absolute top-5 right-5">
        <div className=" bg-secondary p-5 rounded-sm text-white">{notification.message}</div>
      </div>
    )
  );
}
