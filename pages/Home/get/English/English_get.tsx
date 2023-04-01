import SubjectList from "@/components/Subject_list";
import { NextPage } from "next";
const English_get:NextPage = () => {
  return (
    <>
      <SubjectList
        subject="English"
        godetail="/Home/get/English_detail"
        gopostpage="/Home/post/English"
      />
    </>
  );
}

export default English_get;