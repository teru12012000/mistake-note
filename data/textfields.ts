import { Dispatch, SetStateAction } from "react";

export type textfield={
  title:string;
  setPassage:Dispatch<SetStateAction<string>>;
  imglink:imglink[],
  setImg:Dispatch<SetStateAction<imglink[]>>;
  buttontitle:string,
}

export type imglink={
  file:File;
  name:string;
}