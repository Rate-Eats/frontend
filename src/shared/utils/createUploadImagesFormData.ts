export const createUploadImagesFormData = (images: File[], refId: number, ref: string) => {
  const formData = new FormData();
  formData.append('refId', refId.toString());
  formData.append('field', 'images');
  formData.append('ref', ref);
  images.forEach((file) => formData.append('files', file));
  return formData;
};
