import { CheckCircle2, XCircle, X } from "lucide-react";
import { motion } from "framer-motion";

type ToastType = "success" | "error";

interface CustomToastProps {
  type: ToastType;
  title: string;
  message?: string;
  onClose?: () => void;
}

const CustomToast = ({ type, title, message, onClose }: CustomToastProps) => {
  const isSuccess = type === "success";

  return (
    <motion.div
      // Entrance Animation
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative flex items-center gap-3 w-[350px] p-3 rounded-xl border
        ${
          isSuccess
            ? "bg-emerald-50 border-emerald-200/50"
            : "bg-red-50 border-red-200/50"
        }
      `}
    >
      {/* Icon Section with Pulse */}
      <div>
        {isSuccess ? (
          <CheckCircle2
            className="text-emerald-600"
            size={22}
            strokeWidth={2.5}
          />
        ) : (
          <XCircle className="text-red-600" size={28} strokeWidth={2.5} />
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 pr-4">
        <h4
          className={`font-bold text-[15px] tracking-tight ${isSuccess ? "text-emerald-900" : "text-red-900"}`}
        >
          {title}
        </h4>
        {message && (
          <p className="text-[13px] text-slate-800 leading-snug">
            {message}
          </p>
        )}
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <X size={16} />
        </button>
      )}
    </motion.div>
  );
};

export default CustomToast;
