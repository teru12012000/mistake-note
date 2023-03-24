import NotLogin from "@/components/NotLogin";
import { auth } from "@/firebase/firebase";
import { Button } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const Homepage:NextPage = () => {
  const [user]=useAuthState(auth);
  const router=useRouter();
  const handleSignOut=()=>{
    auth.signOut();
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>{user?(`${auth.currentUser?.email}さんのページ`):("ログインしてや！！！")}</title>
        <meta name="description" content="最初のページです" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          textAlign:"center",
        }}
      >
        {user?(
          <div>
            <h1>こんにちは、{auth.currentUser?.email}</h1>
            <Button
              variant="contained"
              onClick={()=>handleSignOut()}
            >
              サインアウト
            </Button>
          </div>
        ):(
          <NotLogin/>
        )}
      </div>
    </>
  );
}

export default Homepage;