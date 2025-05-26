'use client';
// import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useState, useEffect } from 'react';
import ticketsData from '@/data/tickets.json';
import purchasesData from '@/data/purchases.json';

export default function Home() {
  const [token, setToken] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setPurchases(purchasesData.purchases);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'shipping':
        return 'bg-amber-300';
      case 'delivered':
        return 'bg-green-400';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <>
    

    <div className="w-full">
      <p>Showing All Purchases</p>
      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              {/**icon**/}Filter
            </button>
            <br/><br/>
      {/* Header */}
      <div className="grid grid-cols-4 bg-gray-200 p-4 font-bold text-xl">
        <div>PRODUCT</div>
        <div>QUANTITY</div>
        <div>STATUS</div>
        <div>DATE</div>
      </div>

      {/* Rows */}
      {purchases.map((purchase) => (
        <div key={purchase.id} className="grid grid-cols-4 p-4 items-center border-b">
          <div>{purchase.product}</div>
          <div>{purchase.quantity}</div>
          <div>
            <span className={`px-4 py-2 rounded-full border border-black ${getStatusColor(purchase.status)} font-bold text-[12px]`}>
              {purchase.status}
            </span>
          </div>
          <div>{purchase.date}</div>
        </div>
      ))}
    </div>

    </>
  );
}
