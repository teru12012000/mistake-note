import Loginform from "@/components/Loginform";
import { handleSignUp } from "@/data/function";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Signup:NextPage = () => {
  const router=useRouter();
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const handlesigupclick=async()=>{
    if(!email||!password){
      alert("入力してないですよーーーー")
    }else{
      try {
        await createUserWithEmailAndPassword(auth,email, password);
        router.push("/Home/Homepage");
      } catch (error) {
        alert(`Error signing in with email and password:${error}`);
      }
    }
  }
  return (
    <>
      <Head>
        <title>新規ログイン</title>
        <meta name="description" content="サインアップのページです" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Loginform
        title="新規登録"
        buttontext="Googleで新規登録"
        buttontext2="新規登録！"
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        click={()=>handleSignUp(router)}
        click2={handlesigupclick}
      />
    </>
  );
}

export default Signup;