// import { dateProvider,getTableData } from "./helpers.mjs"




// export const handler = async (event, context) => {
//   console.log("event", event, context);
//   // const { limit, nextToken } = event.arguments;
//   const sevenDaysAgoISOString = dateProvider(7);

//   try {
//     const queryExpression = {
//       TableName: "Likes-jhlqezcjfzdpharuyq6mj7q3ly-staging",
//       IndexName: "likesByDate",
//       KeyConditionExpression: 'sortByDate = :sortByDate and createdAt > :createdAt',
//       ExpressionAttributeValues: {
//         ':sortByDate': { S: "sortByDate" },
//         ':createdAt': { S: sevenDaysAgoISOString }
//       },
//       ScanIndexForward: false
//     }

//     const tableItems = await getTableData(queryExpression);

//     // const  sortedTableItems = groupByPostId(tableItems, Number(nextToken), limit)
//         const  sortedTableItems = groupByPostId(tableItems)

//     console.log('table===>', sortedTableItems)
//     return sortedTableItems;
//   }
//   catch (err) {
//     console.log("error", err)
//     return { error: err }
//   }
// }




// function groupByPostId(tableItems) {
//   const uniqueRecords = [];

//   tableItems.forEach((record) => {
//     const { postLikesId } = record;

//     const existingRecordIndex = uniqueRecords.findIndex(
//       (r) => r.postLikesId === postLikesId
//     );

//     if (existingRecordIndex !== -1) {
//       uniqueRecords[existingRecordIndex].count++;
//     }
//     else {
//       uniqueRecords.push({ ...record, count: 1 });
//     }
//   });

//   uniqueRecords.sort((a, b) => b.count - a.count);

//   // let paginatedItems = uniqueRecords.slice(startIndex, startIndex + limit);
//   // console.log('sta===>', startIndex, limit, uniqueRecords.length)
//   // let nextToken = uniqueRecords.length < startIndex + limit ? "trendComplete" : startIndex + limit;
//   return {
//     items: uniqueRecords,
//     nextToken: 'trendComplete'
//   };
// }

import { dateProvider,getTableData } from "./helpers.mjs"




export const handler = async (event, context) => {
  console.log("event", event, context);
  // const { limit, nextToken } = event.arguments;
  const sevenDaysAgoISOString = dateProvider(7);

  try {
    const queryExpression = {
      TableName: "Likes-5sv6ll4rsfdeze36ts46sqpf3i-dev",
      IndexName: "likesByDate",
      KeyConditionExpression: 'sortByDate = :sortByDate and createdAt > :createdAt',
      ExpressionAttributeValues: {
        ':sortByDate': { S: "sortByDate" },
        ':createdAt': { S: sevenDaysAgoISOString }
      },
      ScanIndexForward: false
    }

    const tableItems = await getTableData(queryExpression);

    // const  sortedTableItems = groupByPostId(tableItems, Number(nextToken), limit)
        const  sortedTableItems = groupByPostId(tableItems)

    console.log('table===>', sortedTableItems)
    return sortedTableItems;
  }
  catch (err) {
    console.log("error", err)
    return { error: err }
  }
}




function groupByPostId(tableItems) {
  const uniqueRecords = [];

  tableItems.forEach((record) => {
    const { postLikesId } = record;

    const existingRecordIndex = uniqueRecords.findIndex(
      (r) => r.postLikesId === postLikesId
    );

    if (existingRecordIndex !== -1) {
      uniqueRecords[existingRecordIndex].count++;
    }
    else {
      uniqueRecords.push({ ...record, count: 1 });
    }
  });

  uniqueRecords.sort((a, b) => b.count - a.count);

  // let paginatedItems = uniqueRecords.slice(startIndex, startIndex + limit);
  // console.log('sta===>', startIndex, limit, uniqueRecords.length)
  // let nextToken = uniqueRecords.length < startIndex + limit ? "trendComplete" : startIndex + limit;
  return {
    items: uniqueRecords,
    nextToken: 'trendComplete'
  };
}

