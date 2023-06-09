import NotLogin from "@/components/NotLogin";
import { imglink2, list } from "@/data/subjectdata";
import { auth, db, storage } from "@/firebase/firebase";
import { Button, Card, CardMedia } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
type Props={
  subject:string;
  godetail:string;
  gopostpage:string;
}
const SubjectList:FC<Props> = ({subject,godetail,gopostpage}) => {
  const [user]=useAuthState(auth);
  const [defflist,setDefflist]=useState<list[]>([]);
  const [imgurl,setImgurl]=useState<imglink2[]>([]);
  useEffect(()=>{
    if(user){
      const collectName:string=`${auth.currentUser?.email}_${subject}`;
      const postData=collection(db,collectName);
      onSnapshot(query(postData, orderBy("timestamp", "asc")),(post)=>{
        const newData:list[]=post.docs.map((doc)=>({...doc.data(),id:doc.id} as list));
        const fixednewData:list[]=newData.slice().reverse();
        setDefflist(fixednewData);
      })
    }
  },[user])
  useEffect(()=>{
    const collectName:string=`${auth.currentUser?.email}_${subject}`;
    if(defflist){
      Promise.all(
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
          return imgdata;
        })
      ).then((newimgurl:imglink2[])=>{
        setImgurl(newimgurl)
      })
      
    }
  },[defflist])
  return (
    <div>
      {user?(
        <>
          <div style={{marginTop:"50px"}}>
            <h1 style={{textAlign:"center"}}>English</h1>
          </div>
      {defflist[0]?(
        <>
          {defflist.map((item:list,index:number)=>(
            <div 
              key={index}
              style={{
                width:"50%",
                margin:"10px auto"
              }}
            >
              <Link 
                href={`${godetail}/${item.id}`} 
                style={{
                  textDecoration:"none",
                }}>
                <Card>
                  <h2>question</h2>
                  <h3>{item.question}</h3>
                    {imgurl?(
                      <>
                        {imgurl[index]?.questionlink.map((i:string,n:number)=>(
                          <CardMedia
                            key={n}
                            component="img"
                            image={i}
                            alt="Paella dish"
                            style={{
                              width:"150px",
                              display:"inline-block",
                              marginRight:"5px",
                            }}
                          />
                        ))}
                      </>
                    ):null}
                  <h2>answer</h2>
                  <h3>{item.realanswer}</h3>
                  {imgurl[index]?.realanswerlink.map((i:string,num:number)=>(
                    <CardMedia
                      key={num}
                      component="img"
                      image={i}
                      alt="picture"
                      style={{
                        width:"150px",
                        display:"inline-block",
                        marginRight:"5px",
                      }}
                    />
                  ))}
                </Card>
              </Link>
            </div>
          ))}
          <Link 
            href={gopostpage}
            style={{
              position:"fixed",
              bottom:"5%",
              right:"5%",
            }}
          >
            <Button 
              variant="contained"
              style={{
                borderRadius:"50%",
              }}
              sx={{
                width:60,
                height:60,
              }}
            >
              <AddCircleOutlineRoundedIcon
                sx={{width:30,height:30}}
              />
            </Button>
          </Link>
        </>
      ):(
        <p>まだ投稿はなし</p>
      )}
        </>
      ):(
        <NotLogin/>
      )}
    </div>
  );
}

export default SubjectList;