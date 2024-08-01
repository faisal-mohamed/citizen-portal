import { unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const handler = async (event, context) => {
  console.log("event", event, context);

  const { idArray, userId, searchMode } = event.arguments;

  try {
    const likeTable = "Likes-jhlqezcjfzdpharuyq6mj7q3ly-staging";
    const savedPostTable = "SavedPost-jhlqezcjfzdpharuyq6mj7q3ly-staging";
    const userLikedSavedResponse = [];

    for (const postId of idArray) {
      let LikeId = null;
      let SaveId = null;

      if (searchMode === "like") {
        const likeParams = {
          TableName: likeTable,
          IndexName: "likesByDate",
          KeyConditionExpression: "sortByDate = :sortByDate",
          FilterExpression:
            "likesLikedById = :userId and postLikesId = :postId",
          ExpressionAttributeValues: {
            ":sortByDate": { S: "sortByDate" },
            ":postId": { S: postId },
            ":userId": { S: userId },
          },
        };
        const likesItems = await getTableData(likeParams);
        LikeId = likesItems.length > 0 ? likesItems[0].id : null;
      } else if (searchMode === "save") {
        const savedParams = {
          TableName: savedPostTable,
          IndexName: "gsi-Post.savedPost",
          KeyConditionExpression: "postSavedPostId = :postId",
          FilterExpression: "savedPostSavedById = :userId",
          ExpressionAttributeValues: {
            ":postId": { S: postId },
            ":userId": { S: userId },
          },
        };
        const savedItems = await getTableData(savedParams);
        SaveId = savedItems.length > 0 ? savedItems[0].id : null;
      } else {
        const likeParams = {
          TableName: likeTable,
          IndexName: "likesByDate",
          KeyConditionExpression: "sortByDate = :sortByDate",
          FilterExpression:
            "likesLikedById = :userId and postLikesId = :postId",
          ExpressionAttributeValues: {
            ":sortByDate": { S: "sortByDate" },
            ":postId": { S: postId },
            ":userId": { S: userId },
          },
        };
        const likesItems = await getTableData(likeParams);
        LikeId = likesItems.length > 0 ? likesItems[0].id : null;

        const savedParams = {
          TableName: savedPostTable,
          IndexName: "gsi-Post.savedPost",
          KeyConditionExpression: "postSavedPostId = :postId",
          FilterExpression: "savedPostSavedById = :userId",
          ExpressionAttributeValues: {
            ":postId": { S: postId },
            ":userId": { S: userId },
          },
        };
        const savedItems = await getTableData(savedParams);
        console.log("savedItems", savedItems);
        SaveId = savedItems.length > 0 ? savedItems[0].id : null;
      }

      userLikedSavedResponse.push({ postId, LikeId, SaveId });
    }

    console.log("user", userLikedSavedResponse);
    return { items: userLikedSavedResponse };
  } catch (err) {
    console.log("error", err);
    return { error: err };
  }
};

async function getTableData(params) {
  const command = new QueryCommand(params);
  const response = await client.send(command);
  const tableItems = response.Items.map((item) => unmarshall(item));
  return tableItems;
}
