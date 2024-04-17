import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearNotification } from '@/store/notification-slice/notification-slice';
import { getNotifications } from '@/store/notification-slice/notification-slice-selector';
import { ToastOptions, toast } from 'react-toastify';

export default function Notification(): JSX.Element {
  const notifications = useAppSelector(getNotifications);
  const dispatch = useAppDispatch();

  const renderNotification = () => {
    notifications.forEach((notification) => {
      const toastOptions: ToastOptions = {
        autoClose: notification.duration || 4000,
        toastId: notification.id,
        onClose: () => dispatch(clearNotification(notification.id)),
      };

      if (toast.isActive(notification.id)) {
        return;
      }

      switch (notification.type) {
        case 'error':
          toast.error(notification.message, toastOptions);
          break;
        case 'success':
          toast.success(notification.message, toastOptions);
          break;
        case 'info':
          toast.info(notification.message, toastOptions);
          break;
        case 'warning':
          toast.warn(notification.message, toastOptions);
          break;
        default:
          return null;
      }
    });
  };

  return <>{renderNotification()}</>;
}
