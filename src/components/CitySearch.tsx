import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Loader2, Search } from "lucide-react";
import { useLocationQuery } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate()
  const { data: locations, isLoading } = useLocationQuery(query);
  const handleSelect = (cityData: string) => {
    const [lat, lon, country, name] = cityData.split('|')
    
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`)    
}

  console.log(locations);
  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search Cites...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities.."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No Cities found</CommandEmpty>
          )}
          <CommandGroup heading="Favorites">
            <CommandItem>Calender</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recent Searches">
            <CommandItem>Calender</CommandItem>
          </CommandGroup>
          <CommandSeparator />

          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {locations.map((location) => {
                return <CommandItem 
                value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                key={`${location.lat}-${location.lon}`}
                onSelect={handleSelect}
                >
                    <span className= "flex items-center">
                        <Search className="mr-2 h-4 w-4"/>
                    {location.name}
                    {location.state && (
                        <span className="text-sm text-muted-foreground">
                            , {location.state}
                        </span>
                    )}
                    
                    {location.country && (
                        <span className="text-sm text-muted-foreground">
                            , {location.country}
                        </span>
                    )}

                    </span>
                    </CommandItem> 
              } )}
              
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
