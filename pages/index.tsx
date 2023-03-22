import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Loginform from '@/components/Loginform'
import {useAuthState} from "react-firebase-hooks/auth"
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/firebase";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [user]=useAuthState(auth);
  const handleSignUp=()=>{
    signInWithPopup(auth,provider);
  }
  const handleSignOut=()=>{
    auth.signOut();
  }
  return (
    <>
      <Head>
        <title>間違いノート作成</title>
        <meta name="description" content="間違えた問題を解きなおすためのアプリです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user?(
          <Loginform
            title={auth.currentUser?.displayName as string}
            buttontext='サインアウト'
            imgsrc={auth.currentUser?.photoURL as string}
            click={handleSignOut}
          />
        
      ):(
        
        <Loginform
        title="サインアップ"
        buttontext='Googleでログイン'
        imgsrc={undefined}
        click={handleSignUp}
      />
      )}
      
    </>
  )
}
