import { auth, provider } from "@/firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { NextRouter } from "next/router";

export const handleSignUp=(router:NextRouter)=>{
  signInWithPopup(auth,provider);
  router.push("/Home/Homepage");
}