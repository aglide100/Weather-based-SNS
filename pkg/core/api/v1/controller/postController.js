"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const baseController_1 = require("../../../controller/baseController");
const postDao_1 = require("../dao/postDao");
class PostController extends baseController_1.BaseController {
    constructor() {
        super();
    }
    getPostList() {
        return (req, res) => {
            console.log("returns Post List");
            this.setHeader(res);
            let postlist = Array();
            postDao_1.PostDao.getInstance().selectPosts((datalist) => {
                postlist = datalist;
                // console.log(postlist);
                // PostProps가 있는 배열을 전송
                res.send(JSON.stringify(postlist));
            });
            // 반복문으로 배열안에 있는 postProps를 모두 꺼냄?
            // let data: PostProps = {
            //   post_no: parseInt(req.params.post_no),
            //   post_content: "게시글 컨텐츠",
            //   post_view_count: 10,
            //   post_kind: "옷",
            //   post_written_date: "2021-10-11",
            //   post_weather: "맑음 67% 7도",
            //   post_title: "게시글 제목",
            //   post_like_count: 11,
            //   post_useful_count: 12,
            //   mem_no: 0,
            // };
            // let postArray = new Array();
            // for (var i = 0; i < 10; i++) {
            //   let temp = data;
            //   temp.post_no = i;
            //   postArray.push(temp);
            // }
            // res.send(JSON.stringify(postArray));
        };
    }
    getPostDetail() {
        return (req, res) => {
            console.log("returns Company Detail" + req.params.post_no);
            this.setHeader(res);
            // 게시물 번호로 정보를 받아와서 
            postDao_1.PostDao.getInstance().PostDetail(req.params.post_no, (post, Btag, Utag) => {
                // console.log(post);
                // console.log(Btag);
                // console.log(Utag);
                res.send(JSON.stringify([post, Btag, Utag]));
                // 데이터를 전달해 줄 때
                // res.send(오브젝트/배열)
            });
        };
    }
}
exports.PostController = PostController;
