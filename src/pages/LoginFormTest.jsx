import { useState } from "react";
import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "../ui/Input";
import FormRowVertical from "../ui/FormRowVertical";

import SpinnerMini from "../ui/SpinnerMini";
import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


async function loginApi({ email, password }) {
  const res = await fetch( "http://localhost:8000/login", {
    mode: "no-cors",
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    credentials: "include",
  });
  const { data, error } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("login failed!");
  }

  // document.cookie = `token=${data?.token}; path=/; secure; HttpOnly`;
  console.log(data);
  return data;
}

function useLogin() {
  // const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      // navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Provided email or password are incorrect.");
    },
  });

  return { login, isLoading };
}

function LoginFormTest() {
  const [email, setEmail] = useState("atefe@dfgdfg.com");
  const [password, setPassword] = useState("12345Aa@12345");
  const { login, isLoading } = useLogin();

  async function handleSayHi() {

    const res = await fetch("http://localhost:8000/api/sayhi", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });
    const { data } = await res.json();
    console.log(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large" disabled={isLoading}>
            {!isLoading ? "Login" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </Form>
      <button onClick={ handleSayHi}>Call say hi</button>
    </>
  );
}

export default LoginFormTest;
