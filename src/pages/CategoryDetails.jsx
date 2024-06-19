import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';
import { fetchCategoryDetails } from '../store/categories/categoryDetailsSlice';
import CategoryCard from '../components/CategoryCard';


function CategoryDetails() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { category, loading, error } = useSelector(state => state.categoryDetails);

  useEffect(() => {
    dispatch(fetchCategoryDetails(categoryId)); 
  }, [dispatch, categoryId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" component="div" style={{ marginLeft: '16px' }}>Loading...</Typography>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!category) {
    return <div>Category not found.</div>;
  }

  return (
    <Container>
      <CategoryCard
              id={category.id}
              name={category.name}
              desc={category.desc}
              image={category.image}
            />

    </Container>
  );
}

export default CategoryDetails;
