import NotLogin from "@/components/NotLogin";
import { linktype, subjectlink } from "@/data/linkdata";
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
          <div style={{marginTop:100}}>
            <h1>間違いノートアプリ</h1>
            <h2>こんにちは、{auth.currentUser?.email}</h2>
            <div
              style={{marginTop:20,marginBottom:20}}
            >
              {subjectlink.map((item:linktype,index:number)=>(
                <div key={index} style={{marginTop:10}}>
                  <Link href={item.link}>
                    <Button variant="contained">
                      {item.title}
                    </Button>
                  </Link>
                </div>
              ))}

            </div>
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