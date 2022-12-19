import React from 'react';
// import { fileURLToPath } from 'url';
import { client } from '../lib/client';

import { Product, FooterBanner, HeroBanner } from '../components'

// type PRODUCT = {
//   // details: string,
//   // images:[{
//   //   _key: string,
//   //   _type: string
//   // }],
//   // name: string,
//   // price: number,
//   // slug: any,
// }


const Home = ({ products, bannerData }: any) => {
  // console.log(products);
  // console.log(bannerData);
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className='products-heading '>
        <h2>ベストセラー商品</h2>
        <p>最高の音質をあなたに</p>
      </div>

      <div className='products-container'>
        {
          products?.map((product: any) => (
            <Product  key={product._id} product={product}/>
          ))
        }
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return { props: { products, bannerData } }

}

export default Home;