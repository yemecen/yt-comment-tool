const apiKey = process.env.REACT_APP_API_TOKEN;

const getOnePageComment = (videoId, pageToken) => {
  const url = [
    'https://www.googleapis.com/youtube/v3/commentThreads?',
    'part=snippet',
    'maxResults=100',
    `videoId=${videoId}`,
    `key=${apiKey}`,
    `pageToken=${pageToken}`,
  ].join('&');

   fetch(url)
    .then(result => result.json())
    .then((data) => {
      return data;
    });
}

const getAllPagesComments = (videoId, pageToken) => {

  return getOnePageComment(videoId, pageToken)
    .then((result) => {
      console.log(result.pageInfo);
      const comments = result.items;

      if (!result.nextPageToken) return comments;

      return getAllPagesComments(videoId, result.nextPageToken)
        .then(restOfVideoIds => comments.concat(restOfVideoIds));
    });
};

export { getAllPagesComments };
