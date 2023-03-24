import NotLogin from "@/components/NotLogin";
import { textfield } from "@/data/textfields";
import { auth, db } from "@/firebase/firebase";
import { async } from "@firebase/util";
import { Button, TextField } from "@mui/material";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const English:NextPage = () => {
  const [user]=useAuthState(auth);
  const [uid,setUid]=useState<string|null|undefined>(auth.currentUser?.email);
  const [subject,setSubject]=useState<string>("英語");
  const [question,setQuestion]=useState<string>("");
  const [deffanswer,setDeffanswer]=useState<string>("");
  const [realanswer,setRealanswer]=useState<string>("");
  const [other,setOther]=useState<string>("");
  
  const textfields:textfield[]=[
    {
      title:"問題",
      setPassage:setQuestion,
    },{
      title:"間違えた解答",
      setPassage:setDeffanswer,
    },
    {
      title:"正解",
      setPassage:setRealanswer,
    },
    {
      title:"覚え方や解説",
      setPassage:setOther,
    }
  ];
  const handleChange=(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,setPassega: Dispatch<SetStateAction<string>>)=>{
    setPassega(e.currentTarget.value);
  }

  const handleClick=async()=>{
    if(!question||!realanswer){
      alert("書いてない部分があるよ")
    }else{
      const email:string=auth.currentUser?.email as string;
      const subject:string="English";
      const correctname:string=`${email}_${subject}`;
      
      const postData=collection(db,correctname);
      
      const res=await addDoc(postData,{
        question:question,
        deffanswer:deffanswer,
        realanswer:realanswer,
        other:other
      });
      alert(res.id);
    }
  }
  
  return (
    <>
      <Head>
        <title>{subject}</title>
        <meta name="description" content={`${subject}のページです`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{textAlign:"center"}}>
        {user?(
          <div>
            <h1>英語</h1>
            <p>間違えた単語や文法や訳を記録しておこう！</p>
            <div
              style={{
                marginTop:30,
                width:"75%",
                margin:"auto",
              }}
            >
              <div
                style={{textAlign:"start"}}
              >
                <p>Subject:{subject}</p>
                {textfields.map((item:textfield,index:number)=>(
                  <div style={{marginTop:10}} key={index}>
                    <TextField
                      id="outlined-multiline-static"
                      label={item.title}
                      multiline
                      sx={{width:"100%"}}
                      rows={10}
                      onChange={(e)=>handleChange(e,item.setPassage)}
                    />
                  </div>
                ))}
                <div style={{textAlign:"center",marginTop:10}}>
                  <Button 
                    variant="contained"
                    onClick={()=>handleClick()}
                  >
                    登録
                  </Button>
                </div>
              </div>

            </div>
          </div>
        ):(
          <NotLogin/>
        )}
      </div>
    </>
  );
}

export default English;