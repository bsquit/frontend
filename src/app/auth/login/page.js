"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";

export default function LoginPage() {
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        console.log("Login successful:", data);
        router.push("/tickets");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <nav className="w-full flex items-center justify-between px-8 py-4 fixed top-0 bg-transparent z-10">
        <div className="flex items-center gap-2">
          <img src="/LOGO.png" alt="logo" className="w-12 h-auto" />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold">
          LC SIGN
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/auth/login")}
            className="px-6 py-2 rounded-full font-medium bg-gray-400 hover:bg-gray-500 transition-all duration-300 ease-in-out"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/auth/register")}
            className="px-6 py-2 rounded-full font-medium bg-white/60 hover:bg-gray-300 transition-all duration-300 ease-in-out"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <div className="flex justify-center items-center flex-1">
        <div className="w-[512px]">
          <form
            onSubmit={handleLoginSubmit}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
            <span className="text-sm flex justify-center mb-4">
              Don't have an account?
              <button
                type="button"
                onClick={() => router.push("/auth/register")}
                className="ml-1 text-black font-medium underline"
              >
                Sign Up
              </button>
            </span>

            <div className="relative w-full mb-4">
              <BiEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="w-full bg-gray-100 border border-gray-300 rounded-full py-3 pl-12 pr-4"
              />
            </div>

            <div className="relative w-full mb-4">
              <BiLockAlt className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                className="w-full bg-gray-100 border border-gray-300 rounded-full py-3 pl-12 pr-4"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-300 hover:bg-gray-400 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out"
            >
              Sign In
            </button>

            <div className="text-xs text-center mt-4">
              <input type="checkbox" className="mr-2" />
              I agree to the{" "}
              <a href="#" className="underline">
                Terms & Conditions
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
