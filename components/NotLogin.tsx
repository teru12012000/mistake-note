import { Button } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

const NotLogin:FC = () => {
  return (
    <div>
      <h1>ログインしてないぞ！出直して来い！！！！！！</h1>
      <Link href="/">
        <Button
          variant="contained"
        >
          最初のページへ
        </Button>
      </Link>
    </div>

  );
}

export default NotLogin;