import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

import { useAppContext } from '../context/StateContext';
import { runFirework } from '../lib/utils';

const success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useAppContext();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFirework();

    }, [])

  return (
    <div className='success-wrapper'>
        <div className="success">
            <p className="icon">
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your order!</h2>
            <p className="email-msg">Check your email inbox for the receipt.</p>
            <p className="description">
                If you have question, please email
                <a className='email' href="mailto:order@example.com">
                    mailto:order@example.com
                </a>
            </p>
            <Link href='/'>
                <button type='button' className='btn'>
                    Continu Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default success