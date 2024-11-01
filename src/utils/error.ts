import { showMessage } from "react-native-flash-message";

export function handleError(e: Error) {
  showMessage({
    // message: e.code,
    message: e.message,
    // description: e.message,
    type: "danger",
  });
}

interface NotificationData {
  type?: string;
  message?: string;
  errors?: Record<string, any>;
}

interface NotificationMessage {
  type: string;
  message: string;
  errors: Record<string, any>;
}

export function notificationMessage(
  data: NotificationData
): NotificationMessage {
  const type = data && data.type ? data.type : "error";
  const message = data && data.message ? data.message : "Fail";
  const errors = data && data.errors ? data.errors : {};

  return {
    type,
    message,
    errors,
  };
}
