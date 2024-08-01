import { unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});


export const dateProvider = (date) => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - date);
    const sevenDaysAgoISOString = sevenDaysAgo.toISOString();
    return sevenDaysAgoISOString;
};


export const getTableData = async (params) => {
    const command = new QueryCommand(params);
    const response = await client.send(command);
    const tableItems = response.Items.map((item) => unmarshall(item));
    return tableItems;
};
