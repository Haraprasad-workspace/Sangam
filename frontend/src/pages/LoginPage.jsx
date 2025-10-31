import React from "react";
import { useForm } from "react-hook-form";
import BackgroundVideo from "../components/BackgroundVideo";
import { Navigate, useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_BASE;
  const googleauth = `${base_url}/auth/google`;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onsubmit = async (data) => {
    try {
      const res = await fetch(`${base_url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // no need to store token in localStorage
        let result = await res.json();
        console.log(result);
        navigate('/home')
      }
      else {
        alert("error: Wrong Credentials or maybe Server Error ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-cover bg-center bg-[url(/assets/sangam_background.jpg)] w-full  font-oswald min-h-screen flex flex-col">
      <div className="login-box flex flex-col w-fit h-auto m-auto p-5 md:p-7 rounded-md border-2">
        <p className="text-2xl md:text-3xl font-bold m-auto">Login</p>
        <div className="login-form flex flex-col p-5 mt-5">
          <form onSubmit={handleSubmit(onsubmit)} className="md:text-xl text-xs">
            
            {/* Email input */}
            <input
              type="email"
              placeholder="Enter your email Id"
              {...register("email", { required: "Email is required" })}
              className="w-full bg-transparent px-2 py-3  mb-3 rounded-md border-2 border-black font-semibold"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            {/* Password input */}
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              className="w-full bg-transparent px-2 py-3 mb-3 rounded-md border-2 border-black font-semibold"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            {/* Submit button */}
            <div className="submit-bttn flex flex-col">
              <input
                type="submit"
                value="Sign in"
                className="bg-orange-400 mt-3 font-bold px-3 py-2 w-fit m-auto rounded-md cursor-pointer"
              />
              <p className="text-center font-bold mt-4 mb-2">OR</p>
            </div>

            {/* Google Sign in */}
            <div className="google_signin flex flex-col justify-center">
              <p className="text-center font-bold mb-2">Sign in with Google</p>
              <a href={googleauth}>
                <img
                  src="/assets/google_icon.svg"
                  alt="Google sign in"
                  className="rounded-full w-6 md:w-8 m-auto"
                />
              </a>
            </div>

            {/* Register link */}
            <div className="flex flex-col justify-center mt-5 mb-2 px-5 py-4">
              <p className="m-auto text-xs md:text-xl">
                Do not have an account?{" "}
                <span className="text-blue-500">
                  <a href="/register">Register here</a>
                </span>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
