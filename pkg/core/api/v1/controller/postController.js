"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const baseController_1 = require("../../../controller/baseController");
const postDAO_1 = require("../dao/postDAO");
class PostController extends baseController_1.BaseController {
    constructor() {
        super();
    }
    getPostList() {
        return (req, res) => {
            console.log("returns Post List");
            this.setHeader(res);
            let postlist = Array();
            postDAO_1.PostDao.getInstance().selectPosts((datalist) => {
                postlist = datalist;
                // console.log(postlist);
                // PostProps가 있는 배열을 전송
                res.send(JSON.stringify(postlist));
            });
            // 반복문으로 배열안에 있는 postProps를 모두 꺼냄?
        };
    }
    getPostDetail() {
        // 수정
        return (req, res) => {
            console.log("returns Company Detail" + req.params.post_no);
            this.setHeader(res);
            // 게시물 번호로 정보를 받아와서
            postDAO_1.PostDao.getInstance().PostDetail(req.params.post_no, (post, Btag, Utag) => {
                // console.log(post);
                // console.log(Btag);
                // console.log(Utag);
                // res.send(JSON.stringify([post, Btag, Utag])); // [{PostProps}, ..], [{}, ..], [{}, ..]
                // 데이터를 전달해 줄 때
                res.send([post, Btag, Utag]);
            });
        };
    }
}
exports.PostController = PostController;
