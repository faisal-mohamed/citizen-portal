/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listTrendingPosts = /* GraphQL */ `
  query ListTrendingPosts($limit: Int, $nextToken: String) {
    listTrendingPosts(limit: $limit, nextToken: $nextToken) {
      items {
        id
        sortByDate
        Liked
        createdAt
        updatedAt
        postLikesId
        movedDraftPostsLikesId
        userLikedPostsId
        likesPostedById
        likesLikedById
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const checkUserLikedSavedPosts = /* GraphQL */ `
  query CheckUserLikedSavedPosts(
    $userId: String!
    $idArray: [String!]!
    $searchMode: searchMode!
  ) {
    checkUserLikedSavedPosts(
      userId: $userId
      idArray: $idArray
      searchMode: $searchMode
    ) {
      items {
        postId
        LikeId
        SaveId
        __typename
      }
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      s3Url
      thumbnailUrl
      description
      tags
      category {
        id
        name
        image
        description
        createdAt
        updatedAt
        __typename
      }
      comments {
        nextToken
        __typename
      }
      likes {
        nextToken
        __typename
      }
      postedBy {
        id
        firstName
        lastName
        email
        phone
        cognitoId
        image
        city
        country
        website
        company
        jobTitle
        experience
        role
        bio
        socialMediaProfiles
        followingCount
        followersCount
        createdAt
        updatedAt
        __typename
      }
      enquiry {
        nextToken
        __typename
      }
      savedPost {
        nextToken
        __typename
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
      __typename
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        s3Url
        thumbnailUrl
        description
        tags
        likesCount
        commentsCount
        sortByDate
        trending
        createdAt
        updatedAt
        userSavedPostsId
        postCategoryId
        postPostedById
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMovedDraftPosts = /* GraphQL */ `
  query GetMovedDraftPosts($id: ID!) {
    getMovedDraftPosts(id: $id) {
      id
      title
      s3Url
      thumbnailUrl
      description
      tags
      category {
        id
        name
        image
        description
        createdAt
        updatedAt
        __typename
      }
      comments {
        nextToken
        __typename
      }
      likes {
        nextToken
        __typename
      }
      postedBy {
        id
        firstName
        lastName
        email
        phone
        cognitoId
        image
        city
        country
        website
        company
        jobTitle
        experience
        role
        bio
        socialMediaProfiles
        followingCount
        followersCount
        createdAt
        updatedAt
        __typename
      }
      likesCount
      commentsCount
      createdAt
      updatedAt
      movedDraftPostsCategoryId
      movedDraftPostsPostedById
      __typename
    }
  }
`;
export const listMovedDraftPosts = /* GraphQL */ `
  query ListMovedDraftPosts(
    $filter: ModelMovedDraftPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovedDraftPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        movedDraftPostsCategoryId
        movedDraftPostsPostedById
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postID
      post {
        id
        title
        s3Url
        thumbnailUrl
        description
        tags
        likesCount
        commentsCount
        sortByDate
        trending
        createdAt
        updatedAt
        userSavedPostsId
        postCategoryId
        postPostedById
        __typename
      }
      content
      commentedBy {
        id
        firstName
        lastName
        email
        phone
        cognitoId
        image
        city
        country
        website
        company
        jobTitle
        experience
        role
        bio
        socialMediaProfiles
        followingCount
        followersCount
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      userCommentedPostsId
      commentPostId
      commentCommentedById
      __typename
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        content
        createdAt
        updatedAt
        userCommentedPostsId
        commentPostId
        commentCommentedById
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLikes = /* GraphQL */ `
  query GetLikes($id: ID!) {
    getLikes(id: $id) {
      id
      sortByDate
      post {
        id
        title
        s3Url
        thumbnailUrl
        description
        tags
        likesCount
        commentsCount
        sortByDate
        trending
        createdAt
        updatedAt
        userSavedPostsId
        postCategoryId
        postPostedById
        __typename
      }
      postedBy {
        id
        firstName
        lastName
        email
        phone
        cognitoId
        image
        city
        country
        website
        company
        jobTitle
        experience
        role
        bio
        socialMediaProfiles
        followingCount
        followersCount
        createdAt
        updatedAt
        __typename
      }
      Liked
      LikedBy {
        id
        firstName
        lastName
        email
        phone
        cognitoId
        image
        city
        country
        website
        company
        jobTitle
        experience
        role
        bio
        socialMediaProfiles
        followingCount
        followersCount
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      postLikesId
      movedDraftPostsLikesId
      userLikedPostsId
      likesPostedById
      likesLikedById
      __typename
    }
  }
`;
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sortByDate
        Liked
        createdAt
        updatedAt
        postLikesId
        movedDraftPostsLikesId
        userLikedPostsId
        likesPostedById
        likesLikedById
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      email
      phone
      cognitoId
      image
      city
      country
      website
      company
      jobTitle
      experience
      role
      bio
      likedPosts {
        nextToken
        __typename
      }
      savedPosts {
        nextToken
        __typename
      }
      commentedPosts {
        nextToken
        __typename
      }
      socialMediaProfiles
      followingCount
      followersCount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        phone
        cognitoId
        image
        city
        country
        website
        company
        jobTitle
        experience
        role
        bio
        socialMediaProfiles
        followingCount
        followersCount
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEnquiry = /* GraphQL */ `
  query GetEnquiry($id: ID!) {
    getEnquiry(id: $id) {
      id
      message
      enquiredById {
        id
        firstName
        lastName
        email
        phone
        cognitoId
        image
        city
        country
        website
        company
        jobTitle
        experience
        role
        bio
        socialMediaProfiles
        followingCount
        followersCount
        createdAt
        updatedAt
        __typename
      }
      postId {
        id
        title
        s3Url
        thumbnailUrl
        description
        tags
        likesCount
        commentsCount
        sortByDate
        trending
        createdAt
        updatedAt
        userSavedPostsId
        postCategoryId
        postPostedById
        __typename
      }
      hireInterest
      createdAt
      updatedAt
      postEnquiryId
      enquiryEnquiredByIdId
      __typename
    }
  }
`;
export const listEnquiries = /* GraphQL */ `
  query ListEnquiries(
    $filter: ModelEnquiryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnquiries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        hireInterest
        createdAt
        updatedAt
        postEnquiryId
        enquiryEnquiredByIdId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSavedPost = /* GraphQL */ `
  query GetSavedPost($id: ID!) {
    getSavedPost(id: $id) {
      id
      savedBy {
        id
        firstName
        lastName
        email
        phone
        cognitoId
        image
        city
        country
        website
        company
        jobTitle
        experience
        role
        bio
        socialMediaProfiles
        followingCount
        followersCount
        createdAt
        updatedAt
        __typename
      }
      post {
        id
        title
        s3Url
        thumbnailUrl
        description
        tags
        likesCount
        commentsCount
        sortByDate
        trending
        createdAt
        updatedAt
        userSavedPostsId
        postCategoryId
        postPostedById
        __typename
      }
      createdAt
      updatedAt
      postSavedPostId
      savedPostSavedById
      __typename
    }
  }
`;
export const listSavedPosts = /* GraphQL */ `
  query ListSavedPosts(
    $filter: ModelSavedPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        postSavedPostId
        savedPostSavedById
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFollow = /* GraphQL */ `
  query GetFollow($id: ID!) {
    getFollow(id: $id) {
      id
      followedBy {
        id
        firstName
        lastName
        email
        phone
        cognitoId
        image
        city
        country
        website
        company
        jobTitle
        experience
        role
        bio
        socialMediaProfiles
        followingCount
        followersCount
        createdAt
        updatedAt
        __typename
      }
      following {
        id
        firstName
        lastName
        email
        phone
        cognitoId
        image
        city
        country
        website
        company
        jobTitle
        experience
        role
        bio
        socialMediaProfiles
        followingCount
        followersCount
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      followFollowedById
      followFollowingId
      __typename
    }
  }
`;
export const listFollows = /* GraphQL */ `
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
        followFollowedById
        followFollowingId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      image
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPostDrafts = /* GraphQL */ `
  query GetPostDrafts($id: ID!) {
    getPostDrafts(id: $id) {
      id
      title
      s3Url
      thumbnailUrl
      description
      tags
      category {
        id
        name
        image
        description
        createdAt
        updatedAt
        __typename
      }
      createBy {
        id
        firstName
        lastName
        email
        phone
        cognitoId
        image
        city
        country
        website
        company
        jobTitle
        experience
        role
        bio
        socialMediaProfiles
        followingCount
        followersCount
        createdAt
        updatedAt
        __typename
      }
      sortByDate
      createdAt
      updatedAt
      postDraftsCategoryId
      postDraftsCreateById
      __typename
    }
  }
`;
export const listPostDrafts = /* GraphQL */ `
  query ListPostDrafts(
    $filter: ModelPostDraftsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostDrafts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        s3Url
        thumbnailUrl
        description
        tags
        sortByDate
        createdAt
        updatedAt
        postDraftsCategoryId
        postDraftsCreateById
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const postsByDate = /* GraphQL */ `
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
        likesCount
        commentsCount
        sortByDate
        trending
        createdAt
        updatedAt
        userSavedPostsId
        postCategoryId
        postPostedById
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const postsByLikes = /* GraphQL */ `
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
        sortByDate
        trending
        createdAt
        updatedAt
        userSavedPostsId
        postCategoryId
        postPostedById
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByPostIDAndCreatedAt = /* GraphQL */ `
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
        content
        createdAt
        updatedAt
        userCommentedPostsId
        commentPostId
        commentCommentedById
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const likesByDate = /* GraphQL */ `
  query LikesByDate(
    $sortByDate: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLikesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likesByDate(
      sortByDate: $sortByDate
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sortByDate
        Liked
        createdAt
        updatedAt
        postLikesId
        movedDraftPostsLikesId
        userLikedPostsId
        likesPostedById
        likesLikedById
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const savedByDate = /* GraphQL */ `
  query SavedByDate(
    $sortByDate: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostDraftsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    savedByDate(
      sortByDate: $sortByDate
      updatedAt: $updatedAt
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
        sortByDate
        createdAt
        updatedAt
        postDraftsCategoryId
        postDraftsCreateById
        __typename
      }
      nextToken
      __typename
    }
  }
`;
