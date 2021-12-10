import { BaseController } from "../../../controller/baseController";
import { Handler, Request, Response } from "express";
import { PostProps } from "../common/" 

export class PostController extends BaseController {
  constructor() {
    super();
  }

  
  public getPostDetail(): Handler {
    return (req: Request, res: Response) => {
      console.log("returns Company Detail" + req.params.post_no);
        
      let data:PostProps = {
        post_no: parseInt(req.params.post_no),
        post_content: "게시글 컨텐츠",
        post_view_count: 10,
        post_kind: "옷",
        post_written_date: "2021-10-11", 
        post_weather: "맑음 67% 7도",
        post_title: "게시글 제목",
        post_like_count: 11,
        post_useful_count: 12,
        mem_no: 0,
      }

      res.send(JSON.stringify(data))
    }
  }

}
