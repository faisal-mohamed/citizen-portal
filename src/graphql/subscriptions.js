/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateMovedDraftPosts = /* GraphQL */ `
  subscription OnCreateMovedDraftPosts(
    $filter: ModelSubscriptionMovedDraftPostsFilterInput
  ) {
    onCreateMovedDraftPosts(filter: $filter) {
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
export const onUpdateMovedDraftPosts = /* GraphQL */ `
  subscription OnUpdateMovedDraftPosts(
    $filter: ModelSubscriptionMovedDraftPostsFilterInput
  ) {
    onUpdateMovedDraftPosts(filter: $filter) {
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
export const onDeleteMovedDraftPosts = /* GraphQL */ `
  subscription OnDeleteMovedDraftPosts(
    $filter: ModelSubscriptionMovedDraftPostsFilterInput
  ) {
    onDeleteMovedDraftPosts(filter: $filter) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
export const onCreateLikes = /* GraphQL */ `
  subscription OnCreateLikes($filter: ModelSubscriptionLikesFilterInput) {
    onCreateLikes(filter: $filter) {
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
export const onUpdateLikes = /* GraphQL */ `
  subscription OnUpdateLikes($filter: ModelSubscriptionLikesFilterInput) {
    onUpdateLikes(filter: $filter) {
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
export const onDeleteLikes = /* GraphQL */ `
  subscription OnDeleteLikes($filter: ModelSubscriptionLikesFilterInput) {
    onDeleteLikes(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateEnquiry = /* GraphQL */ `
  subscription OnCreateEnquiry($filter: ModelSubscriptionEnquiryFilterInput) {
    onCreateEnquiry(filter: $filter) {
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
export const onUpdateEnquiry = /* GraphQL */ `
  subscription OnUpdateEnquiry($filter: ModelSubscriptionEnquiryFilterInput) {
    onUpdateEnquiry(filter: $filter) {
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
export const onDeleteEnquiry = /* GraphQL */ `
  subscription OnDeleteEnquiry($filter: ModelSubscriptionEnquiryFilterInput) {
    onDeleteEnquiry(filter: $filter) {
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
export const onCreateSavedPost = /* GraphQL */ `
  subscription OnCreateSavedPost(
    $filter: ModelSubscriptionSavedPostFilterInput
  ) {
    onCreateSavedPost(filter: $filter) {
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
export const onUpdateSavedPost = /* GraphQL */ `
  subscription OnUpdateSavedPost(
    $filter: ModelSubscriptionSavedPostFilterInput
  ) {
    onUpdateSavedPost(filter: $filter) {
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
export const onDeleteSavedPost = /* GraphQL */ `
  subscription OnDeleteSavedPost(
    $filter: ModelSubscriptionSavedPostFilterInput
  ) {
    onDeleteSavedPost(filter: $filter) {
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
export const onCreateFollow = /* GraphQL */ `
  subscription OnCreateFollow($filter: ModelSubscriptionFollowFilterInput) {
    onCreateFollow(filter: $filter) {
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
export const onUpdateFollow = /* GraphQL */ `
  subscription OnUpdateFollow($filter: ModelSubscriptionFollowFilterInput) {
    onUpdateFollow(filter: $filter) {
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
export const onDeleteFollow = /* GraphQL */ `
  subscription OnDeleteFollow($filter: ModelSubscriptionFollowFilterInput) {
    onDeleteFollow(filter: $filter) {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
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
export const onCreatePostDrafts = /* GraphQL */ `
  subscription OnCreatePostDrafts(
    $filter: ModelSubscriptionPostDraftsFilterInput
  ) {
    onCreatePostDrafts(filter: $filter) {
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
export const onUpdatePostDrafts = /* GraphQL */ `
  subscription OnUpdatePostDrafts(
    $filter: ModelSubscriptionPostDraftsFilterInput
  ) {
    onUpdatePostDrafts(filter: $filter) {
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
export const onDeletePostDrafts = /* GraphQL */ `
  subscription OnDeletePostDrafts(
    $filter: ModelSubscriptionPostDraftsFilterInput
  ) {
    onDeletePostDrafts(filter: $filter) {
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
