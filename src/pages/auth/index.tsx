import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useLoginMutation } from "../../store/features/userSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../store/features/authSlice";

const initialState = { username: "", email: "", password: "" };

const AuthPage = () => {
  const logo =
    "https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg";

  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setForm({ username: "", password: "", email: ""});
  };

  const { userInfo } = useAppSelector((state)=> state.auth)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();


  useEffect(()=> {
    if (userInfo){
      navigate('/')
    }
  }, [navigate, userInfo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ ...form}).unwrap();
      dispatch(setCredentials(res))
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className=" bg-slate-900 text-white border border-slate-600 p-8 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <img
            src={logo}
            alt="Tokopedia Logo"
            className="w-30 h-auto mx-auto mb-4"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4">
        {isSignup ? " Daftar": " Masuk"}
        </h2>
        <form onSubmit={handleSubmit} >


          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-normal text-slate-300"
            >
              Username
            </label>
            <Input
              onChange={handleChange}
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 w-full bg-slate-800 border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Your username"
            />
          </div>

          {isSignup && (
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-normal text-slate-300"
              >
                Email
              </label>
              <Input
                onChange={handleChange}
                type="text"
                id="email"
                name="email"
                className="mt-1 p-2 w-full bg-slate-800 border rounded-md focus:ring focus:ring-indigo-200"
                placeholder="Your email"
              />
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-normal text-slate-300"
            >
              Password
            </label>
            <Input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full bg-slate-800 border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Your password"
            />
          </div>
          <Button
            type="submit"
            variant={isSignup? `primary` : `outline`}
            className=" px-4 py-2 rounded-md"
          >
            {isSignup ? " Daftar": " Masuk"}
          </Button>
          <p className=" text-slate-300 mt-4">
            {isSignup ? "Sudah punya akun ?" : "Belum punya akun ?"}
            <span onClick={switchMode} className=" text-green-600 font-medium">
              {isSignup ? " Masuk": " Daftar"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
