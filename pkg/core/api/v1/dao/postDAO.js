"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDao = void 0;
const baseDao_1 = require("../../../DAO/baseDao");
class PostDao extends baseDao_1.BaseDao {
    constructor() {
        super();
    }
    static getInstance() {
        // 인스턴스 설정
        if (!PostDao.instance) {
            // PostDao가 없다면
            console.log("Create PostDao Instance...");
            PostDao.instance = new PostDao();
        }
        return PostDao.instance;
    }
    selectPosts(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const qry = `SELECT * , (SELECT count("express_kind") FROM "Express" WHERE  "P".post_no = "Express".post_no AND  express_kind= 'like') AS like_count, 
        (SELECT count("express_kind") FROM "Express" WHERE  "P".post_no = "Express".post_no AND  express_kind= 'usefull') AS useful_count 
        FROM "Post" AS "P"
        `;
            const pool = this.getPool();
            let data = Array();
            try {
                pool.connect((err, client, release) => {
                    if (err)
                        return err;
                    client.query(qry, (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err)
                            console.log(err);
                        const list = result.rows;
                        // 1 row = 1 PostProps
                        for (var i = 0; i < list.length; i++) {
                            let post = {
                                post_no: list[i].post_no,
                                post_content: list[i].post_content,
                                post_view_count: list[i].post_view_count,
                                post_kind: list[i].post_kind,
                                post_written_date: list[i].post_written_date,
                                post_weather: list[i].post_weather,
                                post_title: list[i].post_title,
                                post_like_count: list[i].like_count,
                                post_useful_count: list[i].useful_count,
                                mem_no: list[i].mem_no,
                            };
                            // console.log(post);
                            data.push(post);
                        }
                        client.release();
                        callback(data);
                    }));
                });
            }
            catch (e) {
                console.log("Dao err" + e);
            }
        });
    }
    PostDetail(post_no, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const qry = `SELECT * , 
        (SELECT count("express_kind") FROM "Express" WHERE  "P".post_no = "Express".post_no AND  express_kind= 'like') AS like_count, 
        (SELECT count("express_kind") FROM "Express" WHERE  "P".post_no = "Express".post_no AND  express_kind= 'usefull') AS useful_count,
        (SELECT count("express_kind") FROM "Express" WHERE  "P".post_no = "Express".post_no AND  express_kind= 'dislike') AS dislike_count 
                FROM "Post" AS "P" WHERE post_no = 1;
        `;
            const qry_Btag = `select * from "Post_Basic_tag" full join "Basic_tag" on "Post_Basic_tag".basic_tag_no = "Basic_tag".basic_tag_no where post_no =$1;`;
            const qry_Utag = `select * from "Post_User_tag" full join "User_tag" on "Post_User_tag".User_tag_no = "User_tag".User_tag where post_no = $1`;
            const pool = this.getPool();
            try {
                pool.connect((err, client, relaese) => {
                    if (err)
                        return err;
                    client.query(qry, [post_no], (err, result) => {
                        if (err) {
                            console.log("Can't exec query!" + err);
                            callback(null, err);
                            return;
                        }
                        var data = result.rows;
                        var Btag = Array(); // 기본태그와 사용자태그를 담을 배열
                        var Utag = Array();
                        var post = {
                            post_no: data[0].post_no,
                            post_content: data[0].post_content,
                            post_view_count: data[0].post_view_count,
                            post_kind: data[0].post_kind,
                            post_written_date: data[0].post_written_date,
                            post_weather: data[0].post_weather,
                            post_title: data[0].post_title,
                            post_like_count: data[0].like_count,
                            post_useful_count: data[0].useful_count,
                            post_dislike_count: data[0].dislike_count,
                            mem_no: data[0].mem_no,
                        };
                        client.query(qry_Btag, [post_no], (err, result1) => {
                            // 기본태그 구하기
                            if (err) {
                                console.log("Can't BTAG exec query!" + err);
                                callback(null, err);
                                return;
                            }
                            var qr = result1.rows;
                            for (var i = 0; i < qr.length; i++) {
                                var taginfo = {
                                    tagname: qr[i].basic_tag_name,
                                    tagno: qr[i].basic_tag_no,
                                };
                                // console.log(taginfo);
                                Btag.push(taginfo);
                            }
                            client.query(qry_Utag, [post_no], (err, result2) => {
                                // 사용자태그 구하기
                                if (err) {
                                    console.log("Can't UTAG exec query!" + err);
                                    callback(null, err);
                                    return;
                                }
                                var q1r = result2.rows;
                                for (var i = 0; i < qr.length; i++) {
                                    var taginfo = {
                                        tagname: q1r[i].user_tag_name,
                                        tagno: q1r[i].user_tag,
                                    };
                                    // console.log("사용자태그 +" + taginfo);
                                    Utag.push(taginfo);
                                }
                                callback(post, Btag, Utag);
                            });
                        });
                    });
                });
            }
            catch (e) {
                console.log("Dao insertPost err" + e);
            }
        });
    }
}
exports.PostDao = PostDao;
