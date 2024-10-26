export const createNewImagesFormData = (images: File[], reviewId: number) => {
  const formData = new FormData();
  formData.append('refId', reviewId.toString());
  formData.append('field', 'images');
  formData.append('ref', 'api::review.review');
  formData.append('alternativeText', 'api::review.review');
  images.forEach((file) => formData.append('files', file));
  return formData;
};
