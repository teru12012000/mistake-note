
import { Button } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

type Props={
  title:string;
  buttontext:string;
  imgsrc:string|undefined;
  click:()=>void;
}
const Loginform:FC<Props> = ({title,buttontext,imgsrc,click}) => {
  
  return (
    <div 
        style={{
          position:"absolute",
          height:"100%",
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
          <h1>{title}</h1>
          {imgsrc?(
            <img
              src={imgsrc}
              height={75}
              width={75}
              alt=""
              style={{
                borderRadius:"50%",
              }}
            />
          ):null}<br/>
          <Button
            variant="text"
            onClick={click}
          >
            {buttontext}
          </Button>
        </div>
      </div>
  );
}

export default Loginform;