import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const Product = ({ product: {image, name, slug, price} }: any) => {
  const priceStr = price.toString()
  let customPrice;
  if(priceStr.length === 3) {
    const frontPrice = priceStr.slice(0, 2);
    const backPrice = priceStr.slice(2);
    customPrice = `${frontPrice},${backPrice}`;
  } else {
    const frontPrice = priceStr.slice(0, 1);
    const backPrice = priceStr.slice(1);
    customPrice = `${frontPrice},${backPrice}`;
  }

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img 
            src={urlFor(image && image[0]).toString()} 
            alt={name} 
            width={250} 
            height={250} 
            className="product-image"  
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>
            {priceStr.length > 2 ? `${customPrice}00円` : `${customPrice}00円`}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Product