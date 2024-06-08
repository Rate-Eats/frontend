interface Icon {
  data: {
    attributes: {
      url: string;
      name: string;
    };
  };
}

interface CategoryAttributes {
  name: string;
  value: string;
  icon: Icon;
}

export interface Category {
  attributes: CategoryAttributes;
}
