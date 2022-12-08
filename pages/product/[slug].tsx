import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from "../../components";

import { client, urlFor } from "../../lib/client";

const ProductDetail = ( {products, product}: any ) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0)

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
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity</h3>
                        <p className="quantity-desc">
                            <span className="minus" >
                                <AiOutlineMinus />
                            </span>
                            <span className="num" >
                                0
                            </span>
                            <span className="plus" >
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart">
                            Add to Cart
                        </button>
                        <button type="button" className="buy-now">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
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