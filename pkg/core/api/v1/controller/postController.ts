import { BaseController } from "../../../controller/baseController";
import { Handler, Request, Response } from "express";
import { PostProps } from "../common/";
import { PostDao } from "../dao/postDao";

export class PostController extends BaseController {
  constructor() {
    super();
  }

  public getPostList(): Handler {
    return (req: Request, res: Response) => {
      console.log("returns Post List");
      this.setHeader(res);

      let postlist = Array();

      PostDao.getInstance().selectPosts((datalist: any) => {
        postlist = datalist;
        // console.log(postlist);
        // PostProps가 있는 배열을 전송
        res.send(JSON.stringify(postlist));
      });

      // 반복문으로 배열안에 있는 postProps를 모두 꺼냄?
    };
  }

  public getPostDetail(): Handler {
    // 수정
    return (req: Request, res: Response) => {
      console.log("returns Company Detail" + req.params.post_no);
      this.setHeader(res);

      // 게시물 번호로 정보를 받아와서
      PostDao.getInstance().PostDetail(
        req.params.post_no,
        (post: any, Btag: any, Utag: any, err: Error) => {
          if (err != null) {
            console.log("Can't Login new member" + err);
            res.status(400).send("post not found");
          } else {
            res.send([post, Btag, Utag]);
          }
          // console.log(post);
          // console.log(Btag);
          // console.log(Utag);
          // res.send(JSON.stringify([post, Btag, Utag])); // [{PostProps}, ..], [{}, ..], [{}, ..]
          // 데이터를 전달해 줄 때
        }
      );
    };
  }
}
