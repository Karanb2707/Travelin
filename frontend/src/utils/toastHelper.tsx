import toast from "react-hot-toast";
import CustomToast from "../components/reusable/CustomToast";

export const showSuccessToast = (title: string, message?: string) => {
  toast.custom(
    () => <CustomToast type="success" title={title} message={message} />,
    {
      duration: 2000,
      position: "top-right",
    },
  );
};

export const showErrorToast = (title: string, message?: string) => {
  toast.custom(
    () => <CustomToast type="error" title={title} message={message} />,
    {
      duration: 2000,
      position: "top-right",
    },
  );
};
