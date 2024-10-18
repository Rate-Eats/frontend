interface Icon {
  height: number;
  width: number;
  url: string;
  name: string;
  formats:Formats
}


export interface Category {
  name: string;
  value: string;
  icon: Icon;
}

export interface FormatAttributes {
  name: string,
  hash: string,
  ext: string,
  mime: string,
  path: string,
  width: number,
  height: number,
  size: number,
  sizeInBytes: number,
  url: string
}

export interface Formats {
  thumbnail: FormatAttributes,
  small:FormatAttributes,
  medium:FormatAttributes,
  large:FormatAttributes,
}
