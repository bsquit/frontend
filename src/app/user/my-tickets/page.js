'use client';
// import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useState, useEffect } from 'react';
import ticketsData from '@/data/tickets.json';
import { Funnel, Ellipsis } from 'lucide-react';
import { SearchBar } from '@/components/search-bar';
import { FilterModal } from '@/components/filter-modal';

const STATUS_OPTIONS = ['Open', 'Closed'];

export default function MyTickets() {
  const [token, setToken] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filterState, setFilterState] = useState({ order: 'az', status: '' });

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setTickets(ticketsData.tickets);
    setFilteredTickets(ticketsData.tickets);
  }, []);

  useEffect(() => {
    applyFilters(searchTerm, filterState);
  }, [tickets, searchTerm, filterState]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterSave = (filters) => {
    setFilterState({ order: filters.order, status: filters.status });
    setShowFilter(false);
  };

  function applyFilters(search, filters) {
    let data = [...tickets];
    // Search
    if (search) {
      data = data.filter(ticket =>
        ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
        ticket.agent.toLowerCase().includes(search.toLowerCase()) ||
        ticket.status.toLowerCase().includes(search.toLowerCase()) ||
        ticket.lastMessage.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Status
    if (filters.status) {
      data = data.filter(ticket => ticket.status.toLowerCase() === filters.status.toLowerCase());
    }
    // Order by subject
    if (filters.order === 'az') {
      data.sort((a, b) => a.subject.localeCompare(b.subject));
    } else if (filters.order === 'za') {
      data.sort((a, b) => b.subject.localeCompare(a.subject));
    }
    setFilteredTickets(data);
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-amber-300';
      case 'closed':
        return 'bg-green-400';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <>
    <div className="w-full">
      <p>Showing All Tickets</p>
      <div className="flex items-center">
        <SearchBar onSearch={handleSearch} placeholder="Search tickets..." />
        <button onClick={() => setShowFilter(true)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-2xl h-14 p-4 m-4 w-36 flex items-center justify-center gap-2">
          <Funnel className="w-5 h-5" />
          Filter
        </button>
      </div>
      <FilterModal
        open={showFilter}
        onClose={() => setShowFilter(false)}
        onSave={handleFilterSave}
        initialOrder={filterState.order}
        initialStatus={filterState.status}
        statusOptions={STATUS_OPTIONS}
        hideDateOrder={true}
      />
      <br/><br/>
      {/* Header */}
      <div className="grid grid-cols-4 bg-gray-200 p-4 font-bold text-xl">
        <div>SUBJECT</div>
        <div>AGENT</div>
        <div>STATUS</div>
        <div>LAST MESSAGE</div>
      </div>
      {/* Rows */}
      {filteredTickets.map((ticket) => (
        <div key={ticket.id} className="grid grid-cols-4 p-4 items-center border-b">
          <div>{ticket.subject}</div>
          <div>{ticket.agent}</div>
          <div>
            <span className={`px-4 py-2 rounded-full border border-black ${getStatusColor(ticket.status)} font-bold text-[12px]`}>
              {ticket.status}
            </span>
          </div>
          <div>{ticket.lastMessage}</div>
        </div>
      ))}
    </div>
    </>
  );
}
