'use client';
import { Funnel, Ellipsis } from 'lucide-react';
import { useState, useEffect } from 'react';
import ticketsAdminData from '@/data/tickets-admin.json';
import { SearchBar } from '@/components/search-bar';
import { FilterModal } from '@/components/filter-modal';

const STATUS_OPTIONS = ['Open', 'Closed'];

export default function AllTickets() {
    const [token, setToken] = useState(null);
    const [ticketsAdmin, setTicketsAdmin] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [filterState, setFilterState] = useState({ order: 'az', dateOrder: 'newest', status: '' });

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setTicketsAdmin(ticketsAdminData.tickets);
        setFilteredTickets(ticketsAdminData.tickets);
    }, []);

    useEffect(() => {
        applyFilters(searchTerm, filterState);
    }, [ticketsAdmin, searchTerm, filterState]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilterSave = (filters) => {
        setFilterState(filters);
        setShowFilter(false);
    };

    function applyFilters(search, filters) {
        let data = [...ticketsAdmin];
        // Search
        if (search) {
            data = data.filter(ticket =>
                ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
                ticket.requester.toLowerCase().includes(search.toLowerCase()) ||
                ticket.agent.toLowerCase().includes(search.toLowerCase()) ||
                ticket.status.toLowerCase().includes(search.toLowerCase())
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
        // Date order (assuming uploaded is a date string or timestamp)
        if (filters.dateOrder === 'newest') {
            data.sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded));
        } else if (filters.dateOrder === 'oldest') {
            data.sort((a, b) => new Date(a.uploaded) - new Date(b.uploaded));
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
    <div className="flex flex-col w-full">
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
            statusOptions={STATUS_OPTIONS}
            initialOrder={filterState.order}
            initialDate={filterState.dateOrder}
            initialStatus={filterState.status}
        />
        {/* Header */}
        <div className="grid grid-cols-6 bg-gray-200 p-4 font-bold text-xl">
            <div className="text-center">REQUESTER</div>
            <div className="text-center">SUBJECT</div>
            <div className="text-center">AGENT</div>
            <div className="text-center">STATUS</div>
            <div className="text-center">UPLOADED</div>
        </div>
        {/* Rows */}
        {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="grid grid-cols-6 p-4 items-center border-b">
                <div className="text-center">{ticket.requester}</div>
                <div className="text-center">{ticket.subject}</div>
                <div className="text-center">{ticket.agent}</div>
                <div className="text-center">
                    <span className={`px-4 py-2 rounded-full border border-black ${getStatusColor(ticket.status)} font-bold text-[12px]`}>
                        {ticket.status}
                    </span>
                </div>
                <div className="text-center">{ticket.uploaded}</div>
            </div>
        ))}
    </div>
    );
}

