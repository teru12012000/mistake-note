import NotLogin from "@/components/NotLogin";
import { imglink, textfield } from "@/data/textfields";
import { auth, db, storage } from "@/firebase/firebase";
import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton, Link, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
type Props={
  subject:string;
  comment:string;
  backlink:string;
}
const SubjectPost:FC<Props> = ({subject,comment,backlink}) => {
  const [user]=useAuthState(auth);
  const router=useRouter();
  const [question,setQuestion]=useState<string>("");
  const [deffanswer,setDeffanswer]=useState<string>("");
  const [realanswer,setRealanswer]=useState<string>("");
  const [other,setOther]=useState<string>("");
  const [questionimg,setQuestionimg]=useState<imglink[]>([]);
  const [deffanswerimg,setDeffanswerimg]=useState<imglink[]>([]);
  const [realanswerimg,setRealanswerimg]=useState<imglink[]>([]);
  const [otherimg,setOtherimg]=useState<imglink[]>([]);
  const textfields:textfield[]=[
    {
      title:"問題",
      setPassage:setQuestion,
      imglink:questionimg,
      setImg:setQuestionimg,
      buttontitle:"問題の図などの画像"
    },{
      title:"間違えた回答",
      setPassage:setDeffanswer,
      imglink:deffanswerimg,
      setImg:setDeffanswerimg,
      buttontitle:"回答の図など"
    },
    {
      title:"正解",
      setPassage:setRealanswer,
      imglink:realanswerimg,
      setImg:setRealanswerimg,
      buttontitle:"正解の図など"
    },
    {
      title:"覚え方や解説",
      setPassage:setOther,
      imglink:otherimg,
      setImg:setOtherimg,
      buttontitle:"解説の図など"
    }
  ];
  const handleChange=(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,setPassega: Dispatch<SetStateAction<string>>)=>{
    setPassega(e.currentTarget.value);
  }
  const handlechangeimg=(e: ChangeEvent<HTMLInputElement>,setimg: Dispatch<SetStateAction<imglink[]>>,link:imglink[])=>{
    const files:File=e.target.files?.[0] as File;
    const value:string=e.target.files?.[0].name as string;
    setimg([...link,{file:files,name:value} as imglink]);
  }
  const handledeleteItem=(item:string,img: imglink[],setImg: Dispatch<SetStateAction<imglink[]>>)=>{
    const newItem:imglink[]=img.filter((i)=>i.name!==item);
    setImg(newItem);
  }
  const handleClick=async()=>{
    if(!(question||questionimg)||!(realanswer||realanswerimg)){
      alert("問題と正解くらいは書いておいてよ！")
    }else{
      const email:string=auth.currentUser?.email as string;
      const correctname:string=`${email}_${subject}`;
      const postData=collection(db,correctname);   
      const questionlink:string[]=questionimg.map((item:imglink)=>item.name);
      const deffanswerlink:string[]=deffanswerimg.map((item:imglink)=>item.name);
      const realanswerlink:string[]=realanswerimg.map((item:imglink)=>item.name);
      const otherlink:string[]=otherimg.map((item:imglink)=>item.name);
      const timestamp=new Date();
      try{
        const res=await addDoc(postData,{
          question:question,
          questionlink:questionlink,
          deffanswer:deffanswer,
          deffanswerlink:deffanswerlink,
          realanswer:realanswer,
          realanswerlink:realanswerlink,
          other:other,
          otherlink:otherlink,
          timestamp:timestamp,
        });
        Promise.all([
          ...questionimg?.map((item,index)=>{
            const storageRef=ref(storage,`${correctname}/question/${res.id}/${item.name}`);
            return uploadBytes(storageRef,item.file)
          }),
          ...deffanswerimg?.map((item,index)=>{
            const storageRef=ref(storage,`${correctname}/deffanswer/${res.id}/${item.name}`);
            return uploadBytes(storageRef,item.file)
          }),
          ...realanswerimg?.map((item,index)=>{
            const storageRef=ref(storage,`${correctname}/realanswer/${res.id}/${item.name}`);
            return uploadBytes(storageRef,item.file)
          }),
          ...otherimg?.map((item,index)=>{
            const storageRef=ref(storage,`${correctname}/other/${res.id}/${item.name}`);
            return uploadBytes(storageRef,item.file)
          })
        ]).then(()=>{
          alert("All files uploaded successfully.");
          // すべてのアップロードが完了したらページをリロードする
          router.push(backlink);
        }).catch(error=>{
          console.error(error);
        });
      }catch(e){
        alert(`ERROR:${e}`);
      }
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
        <div
          style={{
            textAlign:"start",
            margin:10,
          }}
        >
          <Link href={backlink}>
            <IconButton 
              color="primary" 
              aria-label="goback" 
              component="label"
            >
              <ArrowBack sx={{width:50,height:50}}/>
            </IconButton>
          </Link>
        </div>
        {user?(
          <div>
            <h1>{subject}</h1>
            <p>{comment}</p>
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
                    {item.imglink[0]?(
                      <div 
                        style={{
                          display:"flex",
                        }}
                      >
                        {item.imglink.map((str:imglink,ind:number)=>(
                          <Button  
                            key={ind}
                            style={{
                              marginRight:5,
                            }}
                            variant="text"
                            onClick={()=>handledeleteItem(str.name,item.imglink,item.setImg)}
                          >
                            {str.name}
                          </Button>
                        ))}
                      </div>
                    ):(
                      <p>画像がありません</p>
                    )}
                    <Button variant="contained" color="primary" component="label">
                      {item.buttontitle}
                      <input type="file"
                        accept=".png, .jpeg, .jpg"
                        style={{ display: "none" }} 
                        onChange={(e)=>handlechangeimg(e,item.setImg,item.imglink)}
                      />
                    </Button>
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

export default SubjectPost;