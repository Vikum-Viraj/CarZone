import React from 'react';
import { notFound } from 'next/navigation';
import { getAdmin } from '@/actions/admin';
import Header from '@/components/header';
import SideBar from './_components/SideBar';

const AdminLayout = async ({ children }) => {
  try {
    const admin = await getAdmin();
    
    if (!admin) {
      return notFound();
    }

    return (
      <div className="h-full">
        <Header isAdminPage={true} />
        <div className='flex h-full w-56 flex-col top-20 fixed inset-y-0 z-50'>
          <SideBar/>
        </div>
        <main className='md:pl-56 pt-[80px] h-full'>{children}</main>
      </div>
    );
  } catch (error) {
    return notFound();
  }
};

export default AdminLayout;