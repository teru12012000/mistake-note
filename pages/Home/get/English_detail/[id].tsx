import Detail from "@/components/Subject_detail";
import { imglink2, list } from "@/data/subjectdata";
import { auth, db, storage } from "@/firebase/firebase";
import { ArrowBack, BackpackRounded } from "@mui/icons-material";
import { NextPage } from "next";

const EngPage:NextPage = () => {
  return (
    <>
      <Detail
        subject="English"
        backlink="/Home/get/English/English_get"
      />
    </>
      
  );
}

export default EngPage;