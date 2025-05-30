'use client';
// import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useState, useEffect } from 'react';
import ticketsData from '@/data/tickets.json';
import purchasesData from '@/data/purchases.json';
import { Funnel, Ellipsis } from 'lucide-react';
import { SearchBar } from '@/components/search-bar';

export default function Purchases() {
  const [token, setToken] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setPurchases(purchasesData.purchases);
    setFilteredPurchases(purchasesData.purchases);
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = purchases.filter(purchase => 
      purchase.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPurchases(filtered);
  };

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
      <div className="flex items-center">
        <SearchBar onSearch={handleSearch} placeholder="Search purchases..." />
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-2xl h-14 p-4 m-4 w-36 flex items-center justify-center gap-2">
          <Funnel className="w-5 h-5" />
          Filter
        </button>
      </div>
      <br/><br/>
      {/* Header */}
      <div className="grid grid-cols-4 bg-gray-200 p-4 font-bold text-xl">
        <div>PRODUCT</div>
        <div>QUANTITY</div>
        <div>STATUS</div>
        <div>DATE</div>
      </div>

      {/* Rows */}
      {filteredPurchases.map((purchase) => (
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
