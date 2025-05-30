'use client';
// import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useState, useEffect } from 'react';
import ticketsData from '@/data/tickets.json';
import { Funnel, Ellipsis } from 'lucide-react';

export default function Home() {
  const [token, setToken] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setTickets(ticketsData.tickets);
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
    

    <div className="w-full">
      <p>Showing All Tickets</p>
      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-2xl h-14 p-4 m-4 w-36 flex items-center justify-center gap-2">
        <Funnel className="w-5 h-5" />
        Filter
      </button>
            <br/><br/>
      {/* Header */}
      <div className="grid grid-cols-4 bg-gray-200 p-4 font-bold text-xl">
        <div>SUBJECT</div>
        <div>AGENT</div>
        <div>STATUS</div>
        <div>LAST MESSAGE</div>
      </div>

      {/* Rows */}
      {tickets.map((ticket) => (
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
