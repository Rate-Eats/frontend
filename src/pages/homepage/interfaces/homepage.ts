export interface HomepageData {
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
  homepage_section_1_left_image: HomepageImageData;
  homepage_section_1_middle_image: HomepageImageData;
  homepage_section_1_right_image: HomepageImageData;
}

export interface HomepageImageData {
  id: number;
  name: string;
  alternativeText: null | string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  documentId: string;
  publishedAt: string;
}
