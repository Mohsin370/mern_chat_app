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
      <div className="absolute bottom-5 right-0 left-0 w-fit m-auto">
        <div
          className={`p-5 rounded-sm text-white ${
            notification.type === "success" ? "bg-secondary" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      </div>
    )
  );
}
