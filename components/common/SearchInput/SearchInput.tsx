'use client';

import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';

interface SearchInputProps {
  value: string;
  onSearchChange: (query: string) => void;
  debounceMs?: number;
  placeholder?: string;
}

export function SearchInput({ value, onSearchChange, debounceMs = 500, placeholder = 'Search...' }: SearchInputProps) {
  const [searchInput, setSearchInput] = useState<string>(value);
  const debouncedSearchTerm = useDebounce<string>(searchInput, debounceMs);

  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  return (
    <div className="relative w-full rounded-lg bg-white">
      <Input
        placeholder={placeholder}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="py-6 pr-12"
        autoComplete="new-password"
        aria-autocomplete="none"
        inputMode="search"
        autoCorrect="off"
        spellCheck={false}
      />

      <SearchIcon className="absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2 text-primary" />
    </div>
  );
}
