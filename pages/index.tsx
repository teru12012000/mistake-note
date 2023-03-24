import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useAuthState} from "react-firebase-hooks/auth"
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/firebase";

import Link from 'next/link'
import { Button } from '@mui/material'
import { homepage, linktype } from '@/data/linkdata';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>間違いノート作成</title>
        <meta name="description" content="間違えた問題を解きなおすためのアプリです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          position:"absolute",
          height:"100vh",
          width:"100%",
          textAlign:"center",
        }}
      >
        <div
          style={{
            position:"relative",
            top:"50%",
            transform:"translateX(-50%),translateY(-50%)"
          }}
        >
          <h1>さぁ！はじめよう！</h1>
          {homepage.map((item:linktype,index:number)=>(
            <div key={index}>
              <Link href={item.link} target={item.target} style={{textDecoration:"none"}}>
                <Button variant="contained" style={{margin:10}}>
                  {item.title}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
