import { Dispatch, SetStateAction } from "react";

export type textfield={
  title:string;
  setPassage:Dispatch<SetStateAction<string>>;
}