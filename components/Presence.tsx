import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Badge, cn } from './ui';
import { MapPin, Clock, Building2, Home, Building } from 'lucide-react';
import { AttendanceRecord } from '../types';

interface PresenceProps {
  onCheckIn: (record: Partial<AttendanceRecord>) => void;
  lastRecord?: AttendanceRecord;
}

export const Presence: React.FC<PresenceProps> = ({ onCheckIn, lastRecord }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationType, setLocationType] = useState<'Head Office' | 'Branch' | 'WFH'>('Head Office');
  const [branchName, setBranchName] = useState('');
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if already checked in today based on lastRecord props or local state simulation
  useEffect(() => {
     if(lastRecord && lastRecord.date === new Date().toISOString().split('T')[0] && !lastRecord.checkOut) {
         setCheckedIn(true);
     }
  }, [lastRecord]);


  const getLocation = () => {
    setLoading(true);
    setGeoError(null);
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoading(false);
      },
      (error) => {
        setGeoError("Unable to retrieve location. Please allow permission.");
        setLoading(false);
      }
    );
  };

  const handleCheckIn = () => {
    if (!geoLocation && locationType !== 'WFH') {
      // Force geolocation for Office
      getLocation();
      if(!geoLocation) return; // Wait for location
    }

    const record: Partial<AttendanceRecord> = {
        date: new Date().toISOString().split('T')[0],
        checkIn: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        locationType: locationType,
        locationName: locationType === 'Branch' ? branchName : undefined,
        status: currentTime.getHours() > 9 ? 'Late' : 'Present'
    };
    onCheckIn(record);
    setCheckedIn(true);
  };

  const handleCheckOut = () => {
      // Logic for checkout (update existing record)
      setCheckedIn(false); // Reset for demo purposes or switch state
      alert("Checked out successfully at " + currentTime.toLocaleTimeString());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
      <h1 className="text-3xl font-bold tracking-tight">Daily Presence</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="md:col-span-1 border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Current Time
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="text-6xl font-bold tabular-nums tracking-tighter text-primary">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-xl text-muted-foreground mt-2 font-medium">
              {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="mt-6">
                {checkedIn ? (
                    <Badge variant="success" className="text-base px-4 py-1">Currently Working</Badge>
                ) : (
                    <Badge variant="secondary" className="text-base px-4 py-1">Not Checked In</Badge>
                )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Check-In Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {!checkedIn ? (
                 <>
                    <div className="space-y-2">
                    <label className="text-sm font-medium">Location Type</label>
                    <div className="grid grid-cols-3 gap-2">
                        <Button
                            variant={locationType === 'Head Office' ? 'default' : 'outline'}
                            className="flex flex-col h-20 gap-2"
                            onClick={() => setLocationType('Head Office')}
                        >
                            <Building2 className="w-6 h-6" />
                            <span className="text-xs">Head Office</span>
                        </Button>
                        <Button
                            variant={locationType === 'Branch' ? 'default' : 'outline'}
                            className="flex flex-col h-20 gap-2"
                            onClick={() => setLocationType('Branch')}
                        >
                            <Building className="w-6 h-6" />
                            <span className="text-xs">Branch</span>
                        </Button>
                        <Button
                            variant={locationType === 'WFH' ? 'default' : 'outline'}
                            className="flex flex-col h-20 gap-2"
                            onClick={() => setLocationType('WFH')}
                        >
                            <Home className="w-6 h-6" />
                            <span className="text-xs">WFH</span>
                        </Button>
                    </div>
                    </div>

                    {locationType === 'Branch' && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Branch Name</label>
                            <input
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Enter Branch Name"
                                value={branchName}
                                onChange={(e) => setBranchName(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="pt-4">
                        {geoError && <p className="text-red-500 text-sm mb-2">{geoError}</p>}
                        {geoLocation && <p className="text-green-600 text-sm mb-2">Location acquired: {geoLocation.lat.toFixed(4)}, {geoLocation.lng.toFixed(4)}</p>}

                        <Button
                            className="w-full h-12 text-lg"
                            onClick={geoLocation || locationType === 'WFH' ? handleCheckIn : getLocation}
                            disabled={loading}
                        >
                            {loading ? "Getting Location..." : (geoLocation || locationType === 'WFH') ? "Confirm Check In" : "Get Location & Check In"}
                        </Button>
                    </div>
                 </>
             ) : (
                 <div className="flex flex-col items-center justify-center h-full space-y-4 pt-4">
                     <div className="text-center">
                         <p className="text-muted-foreground">You checked in at</p>
                         <p className="text-2xl font-bold">{lastRecord?.checkIn || "09:00 AM"}</p>
                         <p className="text-sm text-muted-foreground mt-1">Location: {lastRecord?.locationType}</p>
                     </div>
                     <Button variant="destructive" className="w-full" onClick={handleCheckOut}>Check Out</Button>
                 </div>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
