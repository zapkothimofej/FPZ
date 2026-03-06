"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { RUHRGEBIET_CITIES, BUSINESS_CATEGORIES, STATUS_CONFIG } from "@/lib/constants";
import type { LeadStatus } from "@/types";

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function LeadFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");
  const debouncedSearch = useDebounce(searchValue, 300);
  const isFirstRender = useRef(true);

  const selectedCities = searchParams.get("city")?.split(",").filter(Boolean) ?? [];
  const selectedCategories = searchParams.get("category")?.split(",").filter(Boolean) ?? [];
  const selectedStatuses = (searchParams.get("status")?.split(",").filter(Boolean) ?? []) as LeadStatus[];
  const minScore = Number(searchParams.get("minScore") ?? 0);
  const maxScore = Number(searchParams.get("maxScore") ?? 100);

  const hasActiveFilters =
    selectedCities.length > 0 ||
    selectedCategories.length > 0 ||
    selectedStatuses.length > 0 ||
    minScore > 0 ||
    maxScore < 100 ||
    searchValue.length > 0;

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [searchParams, pathname, router]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    updateParams({
      search: debouncedSearch || null,
    });
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleMultiSelect = useCallback(
    (paramKey: string, value: string, current: string[]) => {
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateParams({
        [paramKey]: next.length > 0 ? next.join(",") : null,
      });
    },
    [updateParams]
  );

  const handleScoreChange = useCallback(
    (values: number[]) => {
      const [min, max] = values;
      updateParams({
        minScore: min !== undefined && min > 0 ? String(min) : null,
        maxScore: max !== undefined && max < 100 ? String(max) : null,
      });
    },
    [updateParams]
  );

  const resetFilters = useCallback(() => {
    setSearchValue("");
    startTransition(() => {
      router.push(pathname);
    });
  }, [pathname, router]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Suchfeld */}
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input
          placeholder="Leads durchsuchen..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-9 bg-zinc-900 border-zinc-800"
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Stadt Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="border-zinc-800 bg-zinc-900">
            Stadt
            {selectedCities.length > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs px-1.5">
                {selectedCities.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Stadt suchen..." />
            <CommandList>
              <CommandEmpty>Keine Stadt gefunden.</CommandEmpty>
              <CommandGroup>
                {RUHRGEBIET_CITIES.map((city) => (
                  <CommandItem
                    key={city.name}
                    onSelect={() => toggleMultiSelect("city", city.name, selectedCities)}
                  >
                    <Checkbox
                      checked={selectedCities.includes(city.name)}
                      className="mr-2"
                    />
                    {city.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Branche Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="border-zinc-800 bg-zinc-900">
            Branche
            {selectedCategories.length > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs px-1.5">
                {selectedCategories.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Branche suchen..." />
            <CommandList>
              <CommandEmpty>Keine Branche gefunden.</CommandEmpty>
              <CommandGroup>
                {BUSINESS_CATEGORIES.map((cat) => (
                  <CommandItem
                    key={cat}
                    onSelect={() => toggleMultiSelect("category", cat, selectedCategories)}
                  >
                    <Checkbox
                      checked={selectedCategories.includes(cat)}
                      className="mr-2"
                    />
                    {cat}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Status Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="border-zinc-800 bg-zinc-900">
            Status
            {selectedStatuses.length > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs px-1.5">
                {selectedStatuses.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {(Object.entries(STATUS_CONFIG) as [LeadStatus, typeof STATUS_CONFIG[LeadStatus]][]).map(
                  ([key, config]) => (
                    <CommandItem
                      key={key}
                      onSelect={() => toggleMultiSelect("status", key, selectedStatuses)}
                    >
                      <Checkbox
                        checked={selectedStatuses.includes(key)}
                        className="mr-2"
                      />
                      <span
                        className={cn(
                          "inline-block h-2 w-2 rounded-full mr-2",
                          config.bgColor
                        )}
                      />
                      {config.label}
                    </CommandItem>
                  )
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Score Range */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="border-zinc-800 bg-zinc-900">
            <SlidersHorizontal className="h-4 w-4 mr-1.5" />
            Score
            {(minScore > 0 || maxScore < 100) && (
              <Badge variant="secondary" className="ml-2 text-xs px-1.5">
                {minScore}–{maxScore}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[260px]" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-300">Score-Bereich</p>
              <p className="text-sm text-zinc-500">
                {minScore} – {maxScore}
              </p>
            </div>
            <Slider
              min={0}
              max={100}
              step={5}
              value={[minScore, maxScore]}
              onValueCommit={handleScoreChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-zinc-600">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Reset */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-zinc-400 hover:text-zinc-200"
        >
          <RotateCcw className="h-4 w-4 mr-1.5" />
          Zurucksetzen
        </Button>
      )}
    </div>
  );
}
