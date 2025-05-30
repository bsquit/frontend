'use client';
// import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useState, useEffect } from 'react';
import ticketsData from '@/data/tickets.json';
import purchasesAdminData from '@/data/purchases-admin.json';
import { Funnel, Ellipsis } from 'lucide-react';
import { SearchBar } from '@/components/search-bar';
import { FilterModal } from '@/components/filter-modal';

const STATUS_OPTIONS = ['Delivered', 'Shipping'];

export default function AdminPurchases() {
  const [token, setToken] = useState(null);
  const [purchasesAdmin, setPurchasesAdmin] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filterState, setFilterState] = useState({ order: 'az', dateOrder: 'newest', status: '' });

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setPurchasesAdmin(purchasesAdminData.purchases);
    setFilteredPurchases(purchasesAdminData.purchases);
  }, []);

  useEffect(() => {
    applyFilters(searchTerm, filterState);
  }, [purchasesAdmin, searchTerm, filterState]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterSave = (filters) => {
    setFilterState(filters);
    setShowFilter(false);
  };

  function applyFilters(search, filters) {
    let data = [...purchasesAdmin];
    // Search
    if (search) {
      data = data.filter(purchase =>
        purchase.product.toLowerCase().includes(search.toLowerCase()) ||
        purchase.status.toLowerCase().includes(search.toLowerCase()) ||
        purchase.date.toLowerCase().includes(search.toLowerCase()) ||
        purchase.buyer.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Status
    if (filters.status) {
      data = data.filter(purchase => purchase.status.toLowerCase() === filters.status.toLowerCase());
    }
    // Order by product
    if (filters.order === 'az') {
      data.sort((a, b) => a.product.localeCompare(b.product));
    } else if (filters.order === 'za') {
      data.sort((a, b) => b.product.localeCompare(a.product));
    }
    // Date order
    if (filters.dateOrder === 'newest') {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (filters.dateOrder === 'oldest') {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setFilteredPurchases(data);
  }

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
        <button onClick={() => setShowFilter(true)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-2xl h-14 p-4 m-4 w-36 flex items-center justify-center gap-2">
          <Funnel className="w-5 h-5" />
          Filter
        </button>
      </div>
      <FilterModal
        open={showFilter}
        onClose={() => setShowFilter(false)}
        onSave={handleFilterSave}
        statusOptions={STATUS_OPTIONS}
        initialOrder={filterState.order}
        initialDate={filterState.dateOrder}
        initialStatus={filterState.status}
      />
      <br/><br/>
      {/* Header */}
      <div className="grid grid-cols-5 bg-gray-200 p-4 font-bold text-xl">
        <div>PRODUCT</div>
        <div>QUANTITY</div>
        <div>STATUS</div>
        <div>DATE</div>
        <div>BUYER</div>
      </div>

      {/* Rows */}
      {filteredPurchases.map((purchase) => (
        <div key={purchase.id} className="grid grid-cols-5 p-4 items-center border-b">
          <div>{purchase.product}</div>
          <div>{purchase.quantity}</div>
          <div>
            <span className={`px-4 py-2 rounded-full border border-black ${getStatusColor(purchase.status)} font-bold text-[12px]`}>
              {purchase.status}
            </span>
          </div>
          <div>{purchase.date}</div>
          <div>{purchase.buyer}</div>
        </div>
      ))}
    </div>

    </>
  );
}
