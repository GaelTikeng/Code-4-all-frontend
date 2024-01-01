"use client"
import Navbar from '@/components/molecules/navbar';
import Navbar2 from '@/components/molecules/navbar2';
import { allCode } from '@/components/organisms/codeContent';
import Footer from '@/components/organisms/footer';
import ShoppingCart from '@/components/organisms/shoppingCart';
import { LOCAL_STORAGE } from '@/utiles/service/storage';
import React, {useState} from 'react';
import { User } from '../../../types';

type Props = {}

export default function Cart({ }: Props) {
  const [user, setUser] = useState<User | null>(
    (): User | null => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage =
          JSON.parse(localStorage.getItem("userObject") as string) || {};
        if (fromLocalStorage) return fromLocalStorage;
      }
      return null;
    }
  )

  return (
    <div className=''>
      {user ? <Navbar2/> : <Navbar/>}
      <ShoppingCart codeCart={allCode} />
      <Footer/>

    </div>
  )
}