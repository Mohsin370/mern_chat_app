import { useContext, useEffect } from "react";
import { NotificationContext } from "../context/notification/notificationContext";

export default function Notification() {
  const { notification, setNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (notification.show) {
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" });
      }, 3000);
    }
  }, [notification, setNotification]);

  return (
    notification.show && (
      <div className="absolute top-5 right-5">
        <div className=" bg-secondary p-5 rounded-sm text-white">
          {notification.message}
        </div>
      </div>
    )
  );
}
