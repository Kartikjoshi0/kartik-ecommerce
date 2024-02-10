import React, { useEffect, useState } from "react";
import './Home.scss'
import Hero from '../../components/hero/Hero'
import Category from '../../components/category/Category'
import Product from '../../components/product/Product';
import { useSelector } from "react-redux";
import {axiosClient } from '../../utils/axiosCLient'
function Home() {
  const categories = useSelector((state) => state.categoryReducer.categories);



  // const[categories,setCategories]=useState(null);
  const[topProducts,setTopProducts]=useState(null);
  async function fetchData(){
    const categoryRespone=await axiosClient.get('/categories?populate=image');
    const topProductResponse=await axiosClient.get('/products?filters[isTopPick][$eq]=true&populate=image');
    // setCategories(categoryRespone.data.data);
    setTopProducts(topProductResponse.data.data);
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className='Home'>
      <Hero />
      <section className='collection container'>
        <div className='info'>
          <h2 className='heading'> Shop By Categories</h2>
          <p className='subheading'>dfdskjsdgvjfsk</p>
        </div>
        <div className='content'>
          {categories?.map(category=> <Category key={category.id} category={category}/>)}

        </div>
      </section>

      <section className='collection container'>
        <div className='info'>
          <h2 className='heading'> Our Top Picks</h2>
          <p className='subheading'>dfdskjsdgvjfsk</p>
        </div>
        <div className='content'>
          {topProducts?.map(product=> <Product key={product.id} product={product}/>)}
        </div>
      </section>
    </div>
  )
}

export default Home