import React, { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

export function FilterModal({
  open,
  onClose,
  onSave,
  statusOptions = [],
  initialOrder = 'az',
  initialDate = 'newest',
  initialStatus = '',
  hideDateOrder = false,
}) {
  const [order, setOrder] = useState(initialOrder);
  const [dateOrder, setDateOrder] = useState(initialDate);
  const [status, setStatus] = useState(initialStatus);

  React.useEffect(() => {
    setOrder(initialOrder);
    setDateOrder(initialDate);
    setStatus(initialStatus);
  }, [open, initialOrder, initialDate, initialStatus]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl p-8 min-w-[350px] relative flex flex-col items-center">
        <button className="absolute top-4 left-4" onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center mb-6">
          <SlidersHorizontal className="w-8 h-8 mb-1" />
          <span className="text-xl font-semibold">Filter</span>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div>
            <div className="font-medium mb-2">Order by</div>
            <div className="flex gap-6">
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2">
                  <input type="radio" name="order" checked={order === 'az'} onChange={() => setOrder('az')} />
                  A - Z
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="order" checked={order === 'za'} onChange={() => setOrder('za')} />
                  Z - A
                </label>
              </div>
              {!hideDateOrder && (
                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="dateOrder" checked={dateOrder === 'newest'} onChange={() => setDateOrder('newest')} />
                    Newest
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="dateOrder" checked={dateOrder === 'oldest'} onChange={() => setDateOrder('oldest')} />
                    Oldest
                  </label>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="font-medium mb-2">Status</div>
            <select
              className="border rounded-md px-3 py-2 w-full"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="">All</option>
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="mt-8 px-6 py-2 rounded-full font-medium bg-orange-300 hover:bg-orange-400 text-white transition-all duration-300 ease-in-out shadow"
          onClick={() => onSave({ order, dateOrder, status })}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
} 