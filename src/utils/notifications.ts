import { toast } from "react-toastify";

const toastConfig = {
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};

/**
 * Show Success Message
 * @param msg
 */
export const showSuccessMsg = (msg: string): void => {
  toast.success(msg, toastConfig);
};

/**
 * Show Error Message
 * @param msg
 */
export const showErrorMsg = (
  msg: string = "Something went wrong. Please try again later.",
): void => {
  toast.error(msg, toastConfig);
};

/**
 * Show Warn Message
 * @param msg
 */
export const showWarnMsg = (msg: string): void => {
  toast.warn(msg, toastConfig);
};

/**
 * Show Info Message
 * @param msg
 */
export const showInfoMsg = (msg: string): void => {
  toast.info(msg, toastConfig);
};
