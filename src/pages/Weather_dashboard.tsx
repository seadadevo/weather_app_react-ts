import Weather_Skeleton from "@/components/loading-skeletor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geoLocation";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import React from "react";

const WeatherDashboard = () => {
  const {
    coordinate,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();
  console.log(coordinate);

  const handleRefresh = () => {
    getLocation();
    if (coordinate) {
      // return
    }
  };

  if (locationLoading) {
    return <Weather_Skeleton />;
  }
  if (locationError) {
    console.log("Location Error:", locationError);
    return (
      <Alert variant="destructive">
        <AlertTitle>
          <AlertTriangle className="h-4 w-4" />
          Location Error
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinate) {
    console.log("Location Error:", locationError);
    return (
      <Alert variant="destructive">
        <AlertTitle>
          <AlertTriangle className="h-4 w-4" />
          Location Required
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={"outline"} size={"icon"} onClick={handleRefresh}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Current and Hourlt Weather */}
    </div>
  );
};

export default WeatherDashboard;
