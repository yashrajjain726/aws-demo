import { APIGatewayProxyEvent } from "aws-lambda";
import Connection from "./db/connection";
import Post from "./models/post/post";

export async function getAllPosts(event: APIGatewayProxyEvent) {
  try {
    let db = Connection.getInstance();
    await db.dbConnect([Post]);
    let posts = await Post.findAll({ raw: true });
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
  } catch (error) {
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
}

export async function getPostViaId(event: APIGatewayProxyEvent) {
  try {
    let db = Connection.getInstance();
    await db.dbConnect([Post]);
    if (event.queryStringParameters == null) {
      return {
        statusCode: 400,
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
    let posts = await Post.findOne({
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
  } catch (error) {
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
}

export async function createPost(event: APIGatewayProxyEvent) {
  try {
    let db = Connection.getInstance();
    await db.dbConnect([Post]);
    const data = {
      name: "rahul",
      email: "rahulsachdev@mail.com",
      phoneNo: "9796786232",
      userType: "buyer",
    };
    const post = await Post.create(data);
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
  } catch (error) {
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
}
export async function deletePost(event: APIGatewayProxyEvent) {
  try {
    let db = Connection.getInstance();
    await db.dbConnect([Post]);

    if (event.queryStringParameters == null) {
      return {
        statusCode: 400,
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

    const post = await Post.destroy({
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
  } catch (error) {
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
}

export async function updatePost(event: APIGatewayProxyEvent) {
  try {
    let db = Connection.getInstance();
    await db.dbConnect([Post]);
    console.log(event);
    if (
      event.queryStringParameters == null ||
      event.queryStringParameters.id == null
    ) {
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
    const post = await Post.update(
      { name: "updated", email: "updated@gmail.com" },
      { where: { id: event.queryStringParameters.id } }
    );
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
  } catch (error) {
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
}
