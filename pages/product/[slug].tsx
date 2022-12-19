import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from "../../components";
import { useAppContext } from '../../context/StateContext';
import { client, urlFor } from "../../lib/client";

const ProductDetail = ( {products, product}: any ) => {
    const { image, name, details, price } = product;
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
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useAppContext();

    const handleBuyNow = () => {
        onAdd(product, qty);
    
        setShowCart(true);
    }

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[index]).toString()} alt={name} className="product-detail-image"  />
                    </div>
                    <div className="small-images-container">
                        {image?.map((item: any, i: number) => (
                            <img 
                             src={urlFor(item).toString()}
                             alt={name}
                             key={i}
                             className={i === index ? 'small-image selected-image' : 'small-image'}
                             onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                    </div>
                    <p>(20)</p>
                    <h4>特徴: </h4>
                    <p>{details}</p>
                    <p className="price">{priceStr.length > 2 ? `${customPrice}00円` : `${customPrice}00円`}</p>
                    <div className="quantity">
                        <h3>数量</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decQty} >
                                <AiOutlineMinus />
                            </span>
                            <span className="num" >
                                {qty}
                            </span>
                            <span className="plus" onClick={incQty} >
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>
                            カートに入れる
                        </button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>
                            今すぐ購入
                        </button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>おすすめの商品</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item: any) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }    
    }
    `;
    const products = await client.fetch(query);

    const paths = products.map((product: any) => ({
        params: {
            slug: product.slug.current
        }
    }))
    // console.log(paths);

    return {
        paths,
        fallback: 'blocking'
    }
}

// クエリパラメータが入ってくる
export const getStaticProps = async ({ params: { slug } }: any) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

//   console.log(product);

  return {
    props: { products, product }
  }
  
  }

export default ProductDetail