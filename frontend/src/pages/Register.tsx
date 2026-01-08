import { useForm } from "react-hook-form";

type RegisterForm = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setError("email", { message: "Email already exists" });
        return;
      }

      alert("Registered successfully");
    } catch {
      setError("root", { message: "Server error, please try again later" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Create Account ✈️
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            {...register("fullName", { required: "Full Name is required" })}
          />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>

          <input
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            {...register("email", { required: "Email is required" })}
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input
            placeholder="Phone"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            {...register("phone", { required: "Phone is required" })}
          />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            {...register("password", { required: "Password is required" })}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            {...register("confirmPassword", { required: "Confirm password" })}
          />
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>

          <p className="text-red-500 text-sm text-center">
            {errors.root?.message}
          </p>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition shadow-md"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <span className="text-orange-500 font-semibold cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
