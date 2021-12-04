import { useRouter } from "next/router";
import React from "react";

const Post: React.FC<{}> = () => {
  const router = useRouter();
  return <div>{router.query.id}</div>;
};

export default Post;
