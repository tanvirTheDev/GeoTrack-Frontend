import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { trackingService } from "@/services/trackingService";
import { TrackingData, UserTrackingStats } from "@/types";
import { AlertTriangle, Clock, MapPin, RefreshCw, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

const LiveTracking: React.FC = () => {
  const { toast } = useToast();
  const [activeLocations, setActiveLocations] = useState<TrackingData[]>([]);
  const [stats, setStats] = useState<UserTrackingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      setRefreshing(true);
      const [locationsResponse, statsResponse] = await Promise.all([
        trackingService.getActiveLocations(),
        trackingService.getTrackingStats(),
      ]);

      if (locationsResponse.success) {
        setActiveLocations(locationsResponse.data as TrackingData[]);
      }

      if (statsResponse.success) {
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tracking data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-500";
      case "emergency":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "emergency":
        return <Badge className="bg-red-100 text-red-800">Emergency</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Tracking</h1>
          <p className="text-gray-600">Loading tracking data...</p>
        </div>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Tracking</h1>
          <p className="text-gray-600">
            Monitor real-time locations of your delivery team
          </p>
        </div>
        <Button onClick={loadData} disabled={refreshing}>
          <RefreshCw
            className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLocations}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Locations
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLocations}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Emergency Requests
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* <div className="text-2xl font-bold text-red-600">
                {stats}
              </div> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Response Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageSpeed}km/h</div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Map</CardTitle>
            <CardDescription>
              Real-time tracking of all active delivery users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Map integration will be implemented here
                </p>
                <p className="text-sm text-gray-400">
                  Google Maps / Leaflet integration
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {activeLocations.length} active locations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Currently tracking users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeLocations.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No active users found
                </p>
              ) : (
                activeLocations.map((location) => (
                  <div
                    key={location._id}
                    className="flex items-center space-x-3"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        location.isActive ? "active" : "inactive"
                      )} ${location.isActive ? "animate-pulse" : ""}`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        {/* <p className="font-medium">User {location.userId.toString()}</p>
                        {getStatusBadge(
                          location.isActive ? "active" : "inactive"
                        )} */}
                      </div>
                      <p className="text-sm text-gray-500">
                        {location.location.latitude.toFixed(6)},{" "}
                        {location.location.longitude.toFixed(6)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatTimeAgo(location.location.timestamp)}
                      </p>
                      {location.batteryLevel && (
                        <div className="flex items-center mt-1">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                            <div
                              className={`h-1.5 rounded-full ${
                                location.batteryLevel > 20
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${location.batteryLevel}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {location.batteryLevel}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location Details Table */}
      {activeLocations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
            <CardDescription>
              Detailed information about all tracked locations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeLocations.map((location) => (
                <div key={location._id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${getStatusColor(
                          location.isActive ? "active" : "inactive"
                        )}`}
                      ></div>
                      {/* <span className="font-medium">
                        User {location.userId}
                      </span> */}
                      {getStatusBadge(
                        location.isActive ? "active" : "inactive"
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatTimeAgo(location.location.timestamp)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Address:</span>
                      <p className="text-gray-600">
                        {location.location.latitude.toFixed(6)},{" "}
                        {location.location.longitude.toFixed(6)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Coordinates:</span>
                      <p className="text-gray-600">
                        {location.location.latitude.toFixed(6)},{" "}
                        {location.location.longitude.toFixed(6)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Accuracy:</span>
                      <p className="text-gray-600">
                        {location.location.accuracy
                          ? `${location.location.accuracy}m`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  {location.location.speed && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Speed:</span>
                      <span className="text-gray-600 ml-2">
                        {location.location.speed} km/h
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LiveTracking;
