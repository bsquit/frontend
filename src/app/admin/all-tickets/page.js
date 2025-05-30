'use client';
import { Funnel, Ellipsis } from 'lucide-react';
import { useState, useEffect } from 'react';
import ticketsAdminData from '@/data/tickets-admin.json'

export default function AllTickets () {

    const [token, setToken] = useState(null);
    const [ticketsAdmin, setTicketsAdmin] = useState([]);
    
    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setTicketsAdmin(ticketsAdminData.tickets);
    }, []);
    
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
    <div className="flex flex-col  w-full">
        <div className="flex items-center">
            <input type="text" className="bg-white w-1/2 h-1/8 border-2 p-4 m-4 rounded-2xl drop-shadow-lg" placeholder="Search..."/>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-2xl h-14 p-4 m-4 w-36 flex items-center justify-center gap-2">
                <Funnel className="w-5 h-5" />
                Filter
            </button>
        </div>

        {/* Header */}
        <div className="grid grid-cols-6 bg-gray-200 p-4 font-bold text-xl">
            <div className="text-center">REQUESTER</div>
            <div className="text-center">SUBJECT</div>
            <div className="text-center">AGENT</div>
            <div className="text-center">STATUS</div>
            <div className="text-center">UPLOADED</div>
        </div>

        {/* Rows */}
                {ticketsAdmin.map((ticket) => (
                    <div key={ticket.id} className="grid grid-cols-6 p-4 items-center border-b hover:bg-gray-50">
                        <div className="text-center">{ticket.requester}</div>
                        <div className="text-center">{ticket.subject}</div>
                        <div className="text-center">{ticket.agent}</div>
                        <div className="text-center">
                            <span className={`px-4 py-2 rounded-full border border-black ${getStatusColor(ticket.status)} font-bold text-[12px]`}>
                                {ticket.status}
                            </span>
                        </div>
                        <div className="text-center">{ticket.uploaded}</div>
                        <div className="flex justify-center items-center"><Ellipsis /></div>
                    </div>
                ))}
    </div>
    )
}

