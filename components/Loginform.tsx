import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import Image from "next/image";
import { FC, useState, MouseEvent, SetStateAction, Dispatch, ChangeEvent } from "react";

type Props={
  title:string;
  buttontext:string;
  buttontext2:string;
  email:string;
  password:string;
  setEmail:Dispatch<SetStateAction<string>>;
  setPassword:Dispatch<SetStateAction<string>>;
  click:()=>void;
  click2:()=>Promise<void>;
}
const Loginform:FC<Props> = ({
  title,
  buttontext,
  buttontext2,
  email,
  password,
  setEmail,
  setPassword,
  click,
  click2
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handlechangepassword=(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
    setPassword(e.currentTarget.value);
  }
  const handlechangeemail=(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
    setEmail(e.currentTarget.value);
  }
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
          <TextField
            id="name"
            label="Email Address"
            type="email"
            variant="outlined"
            onChange={(e)=>handlechangeemail(e)}
          /><br/>
          <FormControl variant="outlined" style={{marginTop:40}}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <Input
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e)=>handlechangepassword(e)}
            />
          </FormControl><br/>
          <Button 
            variant="contained"
            style={{marginTop:20}}
            onClick={click2}
          >
            {buttontext2}
          </Button><br/>
          
          <Button
            variant="text"
            onClick={click}
            style={{marginTop:50}}
          >
            {buttontext}
          </Button>
        </div>
      </div>
  );
}

export default Loginform;