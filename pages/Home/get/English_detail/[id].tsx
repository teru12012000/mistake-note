import { imglink2, list } from "@/data/subjectdata";
import { auth, db, storage } from "@/firebase/firebase";
import { Box } from "@mui/material";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
const EngPage:NextPage = () => {
  const router=useRouter();
  const pageid:string=router.query.id as string;
  const [data,setData]=useState<list|undefined>(undefined);
  const [imgurl,setImgurl]=useState<imglink2|undefined>();
  const setImg=async(collectName:string)=>{
    const questionurl:Promise<string>[]=data?.questionlink.map((str:string,index:number)=>getDownloadURL(ref(storage,`${collectName}/question/${pageid}/${str}`))) as Promise<string>[];
        const strquestion:string[]=await Promise.all(questionurl);
        const deffanswerurl:Promise<string>[]=data?.deffanswerlink.map((str:string,index:number)=>getDownloadURL(ref(storage,`${collectName}/deffanswer/${pageid}/${str}`))) as Promise<string>[];
        const strdeff:string[]=await Promise.all(deffanswerurl);
        const realanswerurl:Promise<string>[]=data?.realanswerlink.map((str:string,index:number)=>getDownloadURL(ref(storage,`${collectName}/realanswer/${pageid}/${str}`))) as Promise<string>[];
        const strreal:string[]=await Promise.all(realanswerurl);
        const otherurl:Promise<string>[]=data?.otherlink.map((str:string,index:number)=>getDownloadURL(ref(storage,`${collectName}/other/${pageid}/${str}`))) as Promise<string>[];
        const strothre:string[]=await Promise.all(otherurl);
        const imgdata:imglink2={
          questionlink:strquestion,
          deffanswerlink:strdeff,
          realanswerlink:strreal,
          otherlink:strothre,
        }
        setImgurl(imgdata);
  }
  useEffect(()=>{
    const collectName:string=`${auth.currentUser?.email}_English`;
    const userDocRef = doc(db, collectName, pageid);
    onSnapshot(userDocRef, (doc) => {
      setData({...doc.data(),id:doc.id}as list)
    });
  },[pageid])
  useEffect(()=>{
    const collectName:string=`${auth.currentUser?.email}_English`;
    if(data){
      setImg(collectName);
    }
  },[data])
  return (
    <>
      <Head>
        <title>間違いの詳細</title>
        <meta name="description" content={`間違いの詳細のページです`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          width:"75%",
          margin:"30px auto",
          border:"1px solid black",
        }}
      >
      <h3>問題</h3>
        <p>{data?.question}</p>
        {imgurl?.questionlink.map((item:string,index:number)=>(
          <figure key={index}>
            <img src={item} alt="" />
          </figure>
        ))}
        <h3>間違えた答え</h3>
        <p>{data?.deffanswer}</p>
        {imgurl?.deffanswerlink.map((item:string,index:number)=>(
          <figure key={index}>
            <img src={item} alt="" />
          </figure>
        ))}
        <h3>本当の答え</h3>
        <p>{data?.realanswer}</p>
        {imgurl?.realanswerlink.map((item:string,index:number)=>(
          <figure key={index}>
            <img src={item} alt="" />
          </figure>
        ))}
        <h3>解説</h3>
        <p>{data?.other}</p>
        {imgurl?.otherlink.map((item:string,index:number)=>(
          <figure key={index}>
            <img src={item} alt="" />
          </figure>
        ))}
      </Box>
    </>
  );
}

export default EngPage;