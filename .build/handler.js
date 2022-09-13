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
exports.updatePost = exports.deletePost = exports.createPost = exports.getPostViaId = exports.getAllPosts = void 0;
const connection_1 = require("./db/connection");
const post_1 = require("./models/post/post");
function getAllPosts(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let db = connection_1.default.getInstance();
            yield db.dbConnect([post_1.default]);
            let posts = yield post_1.default.findAll({ raw: true });
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    data: posts,
                }),
            };
            return response;
        }
        catch (error) {
            console.log(error);
            const response = {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({ msg: "Internal Server Error", data: "" }),
            };
            return response;
        }
    });
}
exports.getAllPosts = getAllPosts;
function getPostViaId(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let db = connection_1.default.getInstance();
            yield db.dbConnect([post_1.default]);
            if (event.queryStringParameters == null) {
                return {
                    statusCode: 404,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({
                        data: "Sorry, but you need to pass required parameter [id]",
                    }),
                };
            }
            console.log(JSON.stringify(event.queryStringParameters.id));
            let posts = yield post_1.default.findOne({
                raw: true,
                where: {
                    id: event.queryStringParameters.id,
                },
            });
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    data: posts,
                }),
            };
            return response;
        }
        catch (error) {
            console.log(error);
            const response = {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({ msg: "Internal Server Error", data: "" }),
            };
            return response;
        }
    });
}
exports.getPostViaId = getPostViaId;
function createPost(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let db = connection_1.default.getInstance();
            yield db.dbConnect([post_1.default]);
            const data = {
                name: "rahul",
                email: "rahulsachdev@mail.com",
                phoneNo: "9796786232",
                userType: "buyer",
            };
            const post = yield post_1.default.create(data);
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    data: post,
                    msg: "Data created successfully",
                }),
            };
            return response;
        }
        catch (error) {
            console.log(error);
            const response = {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({ msg: "Internal Server Error", data: "" }),
            };
            return response;
        }
    });
}
exports.createPost = createPost;
function deletePost(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let db = connection_1.default.getInstance();
            yield db.dbConnect([post_1.default]);
            if (event.queryStringParameters == null) {
                return {
                    statusCode: 404,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({
                        data: "",
                        msg: "Sorry, but please pass the required parameter [id]",
                    }),
                };
            }
            const post = yield post_1.default.destroy({
                where: { id: event.queryStringParameters.id },
            });
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    data: post,
                    msg: "Post deleted successfully",
                }),
            };
            return response;
        }
        catch (error) {
            console.log(error);
            const response = {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({ msg: "Internal Server Error", data: "" }),
            };
            return response;
        }
    });
}
exports.deletePost = deletePost;
function updatePost(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let db = connection_1.default.getInstance();
            yield db.dbConnect([post_1.default]);
            console.log(event);
            if (event.queryStringParameters == null ||
                event.queryStringParameters.id == null) {
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({
                        data: "",
                        msg: "Sorry, but please pass the required parameter [id] to update data",
                    }),
                };
            }
            const post = yield post_1.default.update({ name: "updated", email: "updated@gmail.com" }, { where: { id: event.queryStringParameters.id } });
            if (post == null) {
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({
                        msg: "Post Doesn't exist for this id",
                        data: "",
                    }),
                };
            }
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    msg: "Updated data successfully..",
                    data: "",
                }),
            };
        }
        catch (error) {
            console.log(error);
            const response = {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({ msg: "Internal Server Error", data: "" }),
            };
            return response;
        }
    });
}
exports.updatePost = updatePost;
//# sourceMappingURL=handler.js.map