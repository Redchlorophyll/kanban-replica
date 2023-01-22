import React, { useState } from "react";

import Head from "next/head";
import Router from "next/router";
import userAPI from "services/user";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Home() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submitForm = async (type: "login" | "signup") => {
    try {
      let data;
      if (type === "login") {
        data = await userAPI().signIn(loginForm);
      } else {
        data = await userAPI().signUp(signUpForm);
      }
      document.cookie = `user.token=${data.auth_token}`;
      Router.push("v1/kanban");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="w-full h-[100vh] overflow-hidden bg-slate-100 flex justify-center pt-[140px]">
          <div className="w-[360px] p-5 bg-white shadow-[0_4px_4px_rgba(0,0,0,0.08)] mr-5">
            <div className="font-bold text-lg pb-2">Login</div>
            <div className="pb-3">
              <Input
                label="email"
                value={loginForm.email}
                onChange={(val: string) => {
                  setLoginForm({ ...loginForm, email: val });
                }}
              />
            </div>
            <div className="pb-5">
              <Input
                label="password"
                value={loginForm.password}
                onChange={(val: string) => {
                  setLoginForm({ ...loginForm, password: val });
                }}
              />
            </div>
            <div className="flex justify-center">
              <Button onClick={async () => await submitForm("login")}>
                Login
              </Button>
            </div>
          </div>
          <div className="mr-5 flex">
            <span className="translate-y-[170px]">OR</span>
          </div>
          <div className="w-[360px] p-5 bg-white shadow-[0_4px_4px_rgba(0,0,0,0.08)]">
            <div className="font-bold text-lg pb-2">Create Account & Login</div>
            <div className="pb-2">
              <Input
                label="name"
                value={signUpForm.name}
                onChange={(val: string) => {
                  setSignUpForm({ ...signUpForm, name: val });
                }}
              />
            </div>
            <div className="pb-2">
              <Input
                label="email"
                value={signUpForm.email}
                onChange={(val: string) => {
                  setSignUpForm({ ...signUpForm, email: val });
                }}
              />
            </div>
            <div className="pb-2">
              <Input
                label="password"
                value={signUpForm.password}
                onChange={(val: string) => {
                  setSignUpForm({ ...signUpForm, password: val });
                }}
              />
            </div>
            <div className="pb-2">
              <Input
                label="password confirmation"
                value={signUpForm.password_confirmation}
                onChange={(val: string) => {
                  setSignUpForm({ ...signUpForm, password_confirmation: val });
                }}
              />
            </div>
            <div className="flex justify-center">
              <Button onClick={async () => await submitForm("signup")}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
