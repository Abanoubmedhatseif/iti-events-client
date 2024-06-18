import { useParams } from "react-router-dom";

function CategoryDetails() {
  const { categoryId } = useParams();

  return (
    <div>
      <h1>Category Details</h1>
      <p>ID: {categoryId}</p>
    </div>
  );
}

export default CategoryDetails;
