import { useForm } from "react-hook-form";
import type { LoginPayload } from "../../types/auth.types";
import { useLogin } from "../../hooks/useAuth";
import type { AxiosError } from "axios";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register: login,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginPayload>();

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginPayload) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (err: AxiosError<{ message: string }>) => {
        setError("email", {
          message: err.response?.data?.message || "Login failed",
        });
      },
    });
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg shadow-purple-200 overflow-hidden border border-purple-200">
        {/* Header Section */}
        <div className="bg-purple-700 p-6 text-center text-white">
          <h2 className="text-3xl font-extrabold">Login in Your Account</h2>
          <p className="text-purple-50 mt-2">Join us today and get started</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-600 ml-1">
              Email
            </label>

            <div className="relative mt-1">
              <Mail
                className="absolute left-3 top-3.5 text-purple-600"
                size={19}
              />
              <input
                {...login("email", {
                  required: "Email required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="karan@test.com"
                className={`w-full pl-10 p-2.5 rounded-lg border outline-none transition-all duration-200 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-300"
                }`}
              />
            </div>

            {errors.email && (
              <p className="text-xs text-red-500 ml-1 mt-1 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-600 ml-1">
              Password
            </label>

            <div className="relative mt-1">
              <Lock
                className="absolute left-3 top-3.5 text-purple-600"
                size={19}
              />
              <input
                type="password"
                {...login("password", {
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="••••••••"
                className={`w-full pl-10 p-2.5 rounded-lg border outline-none transition-all duration-200 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-300"
                }`}
              />
            </div>

            {errors.password && (
              <p className="text-xs text-red-500 ml-1 mt-1 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={isPending}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl shadow-md shadow-purple-200 transform transition-all active:scale-95 disabled:opacity-70 mt-4"
          >
            {isPending ? "Logining in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-purple-600 font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
