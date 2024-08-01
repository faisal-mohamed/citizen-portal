/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createMovedDraftPosts = /* GraphQL */ `
  mutation CreateMovedDraftPosts(
    $input: CreateMovedDraftPostsInput!
    $condition: ModelMovedDraftPostsConditionInput
  ) {
    createMovedDraftPosts(input: $input, condition: $condition) {
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
export const updateMovedDraftPosts = /* GraphQL */ `
  mutation UpdateMovedDraftPosts(
    $input: UpdateMovedDraftPostsInput!
    $condition: ModelMovedDraftPostsConditionInput
  ) {
    updateMovedDraftPosts(input: $input, condition: $condition) {
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
export const deleteMovedDraftPosts = /* GraphQL */ `
  mutation DeleteMovedDraftPosts(
    $input: DeleteMovedDraftPostsInput!
    $condition: ModelMovedDraftPostsConditionInput
  ) {
    deleteMovedDraftPosts(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createLikes = /* GraphQL */ `
  mutation CreateLikes(
    $input: CreateLikesInput!
    $condition: ModelLikesConditionInput
  ) {
    createLikes(input: $input, condition: $condition) {
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
export const updateLikes = /* GraphQL */ `
  mutation UpdateLikes(
    $input: UpdateLikesInput!
    $condition: ModelLikesConditionInput
  ) {
    updateLikes(input: $input, condition: $condition) {
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
export const deleteLikes = /* GraphQL */ `
  mutation DeleteLikes(
    $input: DeleteLikesInput!
    $condition: ModelLikesConditionInput
  ) {
    deleteLikes(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createEnquiry = /* GraphQL */ `
  mutation CreateEnquiry(
    $input: CreateEnquiryInput!
    $condition: ModelEnquiryConditionInput
  ) {
    createEnquiry(input: $input, condition: $condition) {
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
export const updateEnquiry = /* GraphQL */ `
  mutation UpdateEnquiry(
    $input: UpdateEnquiryInput!
    $condition: ModelEnquiryConditionInput
  ) {
    updateEnquiry(input: $input, condition: $condition) {
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
export const deleteEnquiry = /* GraphQL */ `
  mutation DeleteEnquiry(
    $input: DeleteEnquiryInput!
    $condition: ModelEnquiryConditionInput
  ) {
    deleteEnquiry(input: $input, condition: $condition) {
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
export const createSavedPost = /* GraphQL */ `
  mutation CreateSavedPost(
    $input: CreateSavedPostInput!
    $condition: ModelSavedPostConditionInput
  ) {
    createSavedPost(input: $input, condition: $condition) {
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
export const updateSavedPost = /* GraphQL */ `
  mutation UpdateSavedPost(
    $input: UpdateSavedPostInput!
    $condition: ModelSavedPostConditionInput
  ) {
    updateSavedPost(input: $input, condition: $condition) {
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
export const deleteSavedPost = /* GraphQL */ `
  mutation DeleteSavedPost(
    $input: DeleteSavedPostInput!
    $condition: ModelSavedPostConditionInput
  ) {
    deleteSavedPost(input: $input, condition: $condition) {
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
export const createFollow = /* GraphQL */ `
  mutation CreateFollow(
    $input: CreateFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    createFollow(input: $input, condition: $condition) {
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
export const updateFollow = /* GraphQL */ `
  mutation UpdateFollow(
    $input: UpdateFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    updateFollow(input: $input, condition: $condition) {
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
export const deleteFollow = /* GraphQL */ `
  mutation DeleteFollow(
    $input: DeleteFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    deleteFollow(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createPostDrafts = /* GraphQL */ `
  mutation CreatePostDrafts(
    $input: CreatePostDraftsInput!
    $condition: ModelPostDraftsConditionInput
  ) {
    createPostDrafts(input: $input, condition: $condition) {
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
export const updatePostDrafts = /* GraphQL */ `
  mutation UpdatePostDrafts(
    $input: UpdatePostDraftsInput!
    $condition: ModelPostDraftsConditionInput
  ) {
    updatePostDrafts(input: $input, condition: $condition) {
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
export const deletePostDrafts = /* GraphQL */ `
  mutation DeletePostDrafts(
    $input: DeletePostDraftsInput!
    $condition: ModelPostDraftsConditionInput
  ) {
    deletePostDrafts(input: $input, condition: $condition) {
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
