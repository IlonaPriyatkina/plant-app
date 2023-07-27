import React, { useState, useEffect } from 'react';
import { Grid, Pagination } from "@mui/material";
import { getPlants } from '../../services';
import { TextField, createTheme, ThemeProvider } from "@material-ui/core";
import GoodsItem from './GoodsItem';
import shopGalleryStyles from './shop_gallery_style.module.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
    }
  },
});

const Gallery = (props) => {
  const [goods, setGoods] = useState([]);
  const { addToOrder } = props;
  const [filteredList, setFilteredList] = useState([]);
  const [noMatch, setNoMatch] = useState(false);
  const [page, setPage] = useState(1); 
  const itemsPerPage = 6; 

  const filterBySearch = (event) => {
    const query = event.target.value.toLowerCase();
    const sortedGoods = [...goods].sort((a, b) => a.Categories.localeCompare(b.Categories));
    const updatedList = sortedGoods.filter((item) => {
      if (item.Categories && typeof item.Categories === 'string') {
        return item.Categories.toLowerCase().includes(query);
      }
      return false;
    });
    setFilteredList(query === '' ? sortedGoods.slice(0, itemsPerPage) : updatedList);
    const isMatching = updatedList.length > 0;
    setNoMatch(!isMatching);
  };

  useEffect(() => {
    getPlants()
      .then(res => res.data.map(plant => ({
        ...plant,
        price: Math.floor(Math.random() * 50) + 1,
        plantDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
      })))
      .then(res => {
        setGoods(res);
        setFilteredList(res.slice(0, itemsPerPage));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage; 
    setFilteredList(goods.slice(startIndex, startIndex + itemsPerPage)); 
  }, [page, goods]); 

  const handlePageChange = (event, value) => {
    setPage(value); 
  };

  return (
    <div className={shopGalleryStyles.shop_gallery_container}>
      <div className={shopGalleryStyles.textFiled_container}>
        <ThemeProvider theme={theme}>
          <TextField
            label='search'
            variant="standard"
            fullWidth
            type='search'
            onChange={filterBySearch}
            sx={{
              mb: "1.5rem",
            }}
          />
        </ThemeProvider>
        {noMatch && <p>This name is not in the catalog</p>}
      </div>
      <Grid container spacing={2}>
        {filteredList.map((item) => (
          <GoodsItem key={item.id} plant={item} addToOrder={addToOrder} />
        ))}
      </Grid>
      <div className={shopGalleryStyles.pagination}>
        <Pagination count={Math.ceil(goods.length / itemsPerPage)} page={page} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Gallery;