import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SearchBar({ onSearch, placeholder = "Search..." }) {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-1/2">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
        className="pl-10 bg-white border-2 p-4 rounded-2xl drop-shadow-lg"
      />
    </div>
  );
} 