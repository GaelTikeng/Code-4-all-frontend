import Navbar from '@/components/molecules/navbar';
import { allCode } from '@/components/organisms/codeContent';
import Footer from '@/components/organisms/footer';
import ShoppingCart from '@/components/organisms/shoppingCart';
import React from 'react';

type Props = {}

export default function Cart({ }: Props) {

  return (
    <div className=''>
      <Navbar/>
      <ShoppingCart codeCart={allCode} />
      <Footer/>

    </div>
  )
}