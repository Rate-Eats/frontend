interface CategoryDisplayProps {
  category: {
    value: string;
    label: string;
  };
  onCategoryChange: (category: { value: string }) => void;
}

const CategoryDisplay = ({ category, onCategoryChange }: CategoryDisplayProps) => (
  <div
    key={category.label}
    className="rounded-sm bg-[#F0F0F0] p-1.5 text-[#6E7072] transition hover:bg-gray-200"
    onClick={(e) => {
      e.preventDefault();
      onCategoryChange(category);
    }}
  >
    {category.label}
  </div>
);

export default CategoryDisplay;
