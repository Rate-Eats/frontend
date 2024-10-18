export const createCommentObject = (text: string, reviewId: string, userId: string) => {
  return {
    text: text,
    review: {
      disconnect: [],
      connect: [
        {
          documentId: reviewId,
          position: {
            end: true,
          },
        },
      ],
    },
    users: {
      disconnect: [],
      connect: [
        {
          documentId: userId,
          position: {
            end: true,
          },
        },
      ],
    },
  };
};
