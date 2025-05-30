'use client';
import ticketsAdminData from '@/data/tickets-admin.json'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {

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
        <>
        
        <div className="bg-gray-100 min-h-screen p-6 w-full flex flex-col items-center">
            <h2 className="font-bold text-4xl mb-4">SUMMARY</h2>
            <div className="bg-white w-1/4 h-1/4 flex items-center justify-center rounded-2xl drop-shadow-md"> {/** Open Tickets Div */}
                <div className="text-center text-4xl">
                    <span className="font-bold">4</span>
                    <br />
                    <span className="text-2xl">OPEN TICKETS</span>
                </div>
            </div>
            <div className="my-16"> {/**Recently Added Tickets Div */}
                <h className="flex flex-col font-bold text-2xl">Recently Added Tickets</h>
            </div>
            <div className="bg-white w-3/4 rounded-2xl drop-shadow-md overflow-hidden"> {/** Container */}
                {/* Header */}
                <div className="w-full grid grid-cols-5 gap-4 p-4 font-bold text-xl bg-gray-50">
                    <div className="text-center">REQUESTER</div>
                    <div className="text-center">SUBJECT</div>
                    <div className="text-center">AGENT</div>
                    <div className="text-center">STATUS</div>
                    <div className="text-center">UPLOADED</div>
                </div>
                <hr className="h-px bg-gray-200 border-0" />
                {/* Rows */}
                {ticketsAdmin.map((ticket) => (
                    <div key={ticket.id} className="grid grid-cols-5 p-4 items-center border-b hover:bg-gray-50">
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
        </div>

        </>
    )
}