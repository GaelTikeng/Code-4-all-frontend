"use client"
import Navbar from '@/components/molecules/navbar';
import Navbar2 from '@/components/molecules/navbar2';
import Footer from '@/components/organisms/footer';
import ShoppingCart from '@/components/organisms/shoppingCart';
import { LOCAL_STORAGE } from '@/utiles/service/storage';
import React, {useState} from 'react';
import { Code, User } from '../../../types';

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
  const [snippets, setSnippets] = React.useState<Code[] | undefined>(
    (): Code[] | undefined => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage = JSON.parse(localStorage.getItem("codeArray") as string) || [];
        if (fromLocalStorage) return fromLocalStorage;
      }
      return undefined;
    }
  )

  return (
    <div className=''>
      {user ? <Navbar2/> : <Navbar/>}
      <ShoppingCart codeCart={snippets} />
      <Footer/>

    </div>
  )
}