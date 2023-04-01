import NotLogin from "@/components/NotLogin";
import SubjectPost from "@/components/Subject_post";
import { imglink, textfield } from "@/data/textfields";
import { auth, db, storage } from "@/firebase/firebase";
import { Button, TextField } from "@mui/material";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const English:NextPage = () => {
  return (
    <>
      <SubjectPost
        subject="English"
        comment="間違えた単語や文法等を記録しよう"
        backlink="/Home/get/English/English_get"
      />
    </>
  );
}

export default English;