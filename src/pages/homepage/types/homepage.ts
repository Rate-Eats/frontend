import { Image } from '@shared/types/image.ts';

export type Homepage = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  homepage_section_1_header_title: string;
  homepage_section_1_header_subtitle: string;
  homepage_section_2_register_text: string;
  homepage_section_2_register_join_button: string;
  homepage_section_2_register_explore_button: string;
  homepage_section_1_left_image: Image;
  homepage_section_1_middle_image: Image;
  homepage_section_1_right_image: Image;
};
