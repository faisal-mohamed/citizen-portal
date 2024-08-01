export const customListComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        commentedBy {
          firstName
          image
        }
        post {
          id
          title
          s3Url
          thumbnailUrl
        }
        content
        createdAt
        updatedAt
        commentCommentedById
      }
      nextToken
    }
  }
`;
export const customCommentsByPostIDAndCreatedAt = /* GraphQL */ `
  query CommentsByPostIDAndCreatedAt(
    $postID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByPostIDAndCreatedAt(
      postID: $postID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postID
        commentedBy {
          firstName
          image
        }
        content
        createdAt
        updatedAt
        commentCommentedById
      }
      nextToken
    }
  }
`;
//List posts
export const customPostsByDate = /* GraphQL */ `
  query PostsByDate(
    $sortByDate: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByDate(
      sortByDate: $sortByDate
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        s3Url
        thumbnailUrl
        description
        tags
        postedBy {
          id
          image
          firstName
          email
        }
        likesCount
        commentsCount
        sortByDate
        trending
        createdAt
        updatedAt
        userSavedPostsId
        postCategoryId
        postPostedById
      }
      nextToken
    }
  }
`;

export const customPostsByLikes = /* GraphQL */ `
  query PostsByLikes(
    $trending: String!
    $likesCount: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByLikes(
      trending: $trending
      likesCount: $likesCount
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        s3Url
        thumbnailUrl
        description
        tags
        likesCount
        commentsCount
        postedBy {
          id
          image
          firstName
          email
        }
        sortByDate
        trending
        createdAt
        updatedAt
        userSavedPostsId
        postCategoryId
        postPostedById
      }
      nextToken
    }
  }
`;

export const customListLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sortByDate
        post {
          title
          s3Url
          thumbnailUrl
          createdAt
          postPostedById
          likesCount
          commentsCount
        }
        postedBy {
          id
          firstName
          lastName
          image
        }
        LikedBy {
          id
          firstName
          lastName
          image
        }
        Liked
        createdAt
        updatedAt
        postLikesId
        likesPostedById
        likesLikedById
      }
      nextToken
    }
  }
`;
export const customListSavedPosts = /* GraphQL */ `
  query ListSavedPosts(
    $filter: ModelSavedPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post {
          id
          title
          s3Url
          thumbnailUrl
          description
          tags
          likesCount
          commentsCount
          createdAt
          updatedAt
          postPostedById
          postedBy {
            id
            firstName
            image
          }
        }
      }
      nextToken
    }
  }
`;

export const customListFollows = /* GraphQL */ `
  query ListFollows(
    $filter: ModelFollowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        followedBy {
          city
          country
          jobTitle
          firstName
          id
          image
          followersCount
          followingCount
        }
        following {
          city
          country
          jobTitle
          firstName
          id
          image
          followersCount
          followingCount
        }
        followFollowedById
        followFollowingId
      }
      nextToken
    }
  }
`;

export const customListTrendingPosts = /* GraphQL */ `
  query ListTrendingPosts($limit: Int, $nextToken: String) {
    listTrendingPosts(limit: $limit, nextToken: $nextToken) {
      items {
        post {
          id
          title
          thumbnailUrl
          likesCount
          commentsCount
        }
        postedBy {
          id
          firstName
          image
        }
      }
      nextToken
    }
  }
`;
