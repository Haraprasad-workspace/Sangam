import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_BASE;
  const googleauth = `${base_url}/auth/google`;

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${base_url}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // Auto-login -> session cookie will be set
        navigate("/home");
      } else {
        alert("error: Wrong Credentials or maybe Server Error ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-cover bg-center bg-[url(./src/assets/sangam_background.jpg)] w-full h-screen flex font-oswald flex-col">
      <div className="Register-box flex flex-col w-fit h-auto m-auto p-5  md:p-7 rounded-md border-2">
        <p className="text-2xl md:text-3xl font-bold m-auto">Register</p>
        <div className="register-form flex flex-col p-5 mt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="md:text-xl text-xs">
            
            {/* Email input */}
            <input
              type="email"
              placeholder="Enter your email Id"
              {...register("email", { required: "Email is required" })}
              className="w-full bg-transparent px-2 py-3 mb-3 rounded-md border-2 border-black font-semibold"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            {/* name input  */}

            <input
              type="text"
              placeholder="Enter your name "
              {...register("name", { required: "name is required" })}
              className="w-full bg-transparent px-2 py-3 mb-3 rounded-md border-2 border-black font-semibold"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}


            {/* Password input */}
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              className="w-full bg-transparent px-2 py-3 mb-3 rounded-md border-2 border-black font-semibold"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (val) => val === watch("password") || "Passwords do not match",
              })}
              className="w-full bg-transparent px-2 py-3 mb-3 rounded-md border-2 border-black font-semibold"
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

            {/* Submit button */}
            <div className="submit-bttn flex flex-col">
              <input
                type="submit"
                value="Register"
                className="bg-orange-400 mt-3 font-bold px-3 py-2 w-fit m-auto rounded-md cursor-pointer"
              />
              <p className="text-center font-bold mt-4 mb-2">OR</p>
            </div>

            {/* Google Sign up */}
            <div className="google_signin flex flex-col justify-center">
              <p className="text-center font-bold text-xs md:text-xl mb-2">Sign Up with Google</p>
              <a href={googleauth}>
                <img
                  src="./src/assets/google_icon.svg"
                  alt="Google signup"
                  className="rounded-full w-5 md:w-8 m-auto"
                />
              </a>
            </div>

            {/* Already have account */}
            <div className="flex flex-col justify-center mt-5 mb-2 px-5 py-4">
              <p className="m-auto text-xs md:text-xl">
                Already have an account?{" "}
                <span className="text-blue-500">
                  <a href="/login">Login here</a>
                </span>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
