import { imglink2, list } from "@/data/subjectdata";
import { imglink } from "@/data/textfields";
import { auth, db, storage } from "@/firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
const English_get:NextPage = () => {
  const [user]=useAuthState(auth);
  const [defflist,setDefflist]=useState<list[]>([]);
  const [imgurl,setImgurl]=useState<imglink2[]>([]);
  useEffect(()=>{
    if(user){
      const collectName:string=`${auth.currentUser?.email}_English`;
      const postData=collection(db,collectName);
      onSnapshot(postData,(post)=>{
        setDefflist(post.docs.map((doc)=>({...doc.data(),id:doc.id} as list)));
      })
    }
  },[user])
  useEffect(()=>{
    const collectName:string=`${auth.currentUser?.email}_English`;
    const newimgurl:imglink2[]=[];
    if(defflist){
      defflist.map(async(item:list,index:number)=>{
        const questionurl:Promise<string>[]=item.questionlink.map((str:string,index:number)=>getDownloadURL(ref(storage,`${collectName}/question/${item.id}/${str}`))) as Promise<string>[];
        const strquestion:string[]=await Promise.all(questionurl);
        const deffanswerurl:Promise<string>[]=item.deffanswerlink.map((str:string,index:number)=>getDownloadURL(ref(storage,`${collectName}/deffanswer/${item.id}/${str}`))) as Promise<string>[];
        const strdeff:string[]=await Promise.all(deffanswerurl);
        const realanswerurl:Promise<string>[]=item.realanswerlink.map((str:string,index:number)=>getDownloadURL(ref(storage,`${collectName}/realanswer/${item.id}/${str}`))) as Promise<string>[];
        const strreal:string[]=await Promise.all(realanswerurl);
        const otherurl:Promise<string>[]=item.otherlink.map((str:string,index:number)=>getDownloadURL(ref(storage,`${collectName}/other/${item.id}/${str}`))) as Promise<string>[];
        const strothre:string[]=await Promise.all(otherurl);
        const imgdata:imglink2={
          questionlink:strquestion,
          deffanswerlink:strdeff,
          realanswerlink:strreal,
          otherlink:strothre,
        }
        newimgurl.push(imgdata);
      })
      setImgurl(newimgurl);
    }
  },[defflist])
  return (
    <div>
      <h1>English</h1>
      {defflist?(
        <>
          {defflist.map((item:list,index:number)=>(
            <div key={index}>
              <h2>question:{item.question}</h2>
                {imgurl[index]?.questionlink.map((i:string,num:number)=>(
                  <figure key={num}>
                    <img src={i} alt="" />
                  </figure>
                ))}
              <h3>answer:{item.realanswer}</h3>
            </div>
          ))}
          {imgurl.map((item:imglink2,index:number)=>(
            <div key={index}>
              {item.questionlink.map((i:string,ind:number)=>(
                <div key={i}>
                  <p>{String(i)}</p>
                </div>
              ))}
            </div>
          ))}
        </>
      ):(
        <p>まだ投稿はなし</p>
      )}
    </div>
  );
}

export default English_get;