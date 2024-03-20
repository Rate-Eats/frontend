export const createCommentObject = (text: string, reviewId: string, userId: number) => {
  return {
    text: text,
    review: {
      disconnect: [],
      connect: [
        {
          id: Number(reviewId),
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
          id: userId,
          position: {
            end: true,
          },
        },
      ],
    },
  };
};
