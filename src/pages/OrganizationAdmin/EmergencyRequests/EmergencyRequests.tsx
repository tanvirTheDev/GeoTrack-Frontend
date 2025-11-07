import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { trackingService } from "@/services/trackingService";
import { EmergencyRequest, TrackingFilters } from "@/types";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const EmergencyRequests: React.FC = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<TrackingFilters>({
    status: "pending",
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    loadData();
    // Set up auto-refresh every 30 seconds for emergency requests
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await trackingService.getEmergencyRequests(filters);

      if (response.success) {
        setRequests(response.data.requests as EmergencyRequest[]);
        setPagination(response.data.pagination || pagination);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load emergency requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilter = (value: string) => {
    const next =
      value === "__clear__"
        ? "pending"
        : (value as "pending" | "acknowledged" | "resolved");
    setFilters({ ...filters, status: next, page: 1 });
  };

  const handleAcknowledge = async (requestId: string) => {
    try {
      const response = await trackingService.acknowledgeEmergencyRequest(
        requestId
      );
      if (response.success) {
        loadData();
        toast({
          title: "Success",
          description: "Emergency request acknowledged",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to acknowledge request",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to acknowledge request",
        variant: "destructive",
      });
    }
  };

  const handleResolve = async (requestId: string) => {
    try {
      const response = await trackingService.resolveEmergencyRequest(requestId);
      if (response.success) {
        loadData();
        toast({
          title: "Success",
          description: "Emergency request resolved",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to resolve request",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resolve request",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-red-100 text-red-800">Pending</Badge>;
      case "acknowledged":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Acknowledged</Badge>
        );
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "acknowledged":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Emergency Requests
          </h1>
          <p className="text-gray-600">
            Monitor and respond to emergency requests from delivery users
          </p>
        </div>
        <Button onClick={loadData} disabled={loading}>
          <Search className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search requests..." className="pl-10" />
            </div>
            <Select
              value={filters.status || undefined}
              onValueChange={handleStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__clear__">Clear filter</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.limit?.toString()}
              onValueChange={(value) =>
                setFilters({ ...filters, limit: parseInt(value), page: 1 })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="25">25 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Requests */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Emergency Requests</CardTitle>
              <CardDescription>
                A list of all emergency requests from your delivery team
              </CardDescription>
            </div>
            <div className="text-sm text-gray-500">
              {requests.length} request{requests.length !== 1 ? "s" : ""}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No emergency requests found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request._id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(request.status)}
                      <div>
                        <span className="font-medium">
                          Request #{request._id.slice(-6)}
                        </span>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusBadge(request.status)}
                          {getPriorityBadge(request.priority)}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatTimeAgo(request.createdAt)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    {/* <div>
                      <span className="text-sm font-medium">User:</span>
                      <p className="text-sm text-gray-600">
                        {request.userId} ({request.userId.email!})
                      </p>
                    </div> */}
                    <div>
                      <span className="text-sm font-medium">Location:</span>
                      <p className="text-sm text-gray-600">
                        {request.location.latitude.toFixed(6)},{" "}
                        {request.location.longitude.toFixed(6)}
                      </p>
                    </div>
                  </div>

                  {request.message && (
                    <div className="mb-3">
                      <span className="text-sm font-medium">Message:</span>
                      <p className="text-sm text-gray-600 mt-1">
                        {request.message}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 mb-3">
                    <div>
                      <span className="font-medium">Coordinates:</span>
                      <p>
                        {request.location.latitude.toFixed(6)},{" "}
                        {request.location.longitude.toFixed(6)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>
                      <p>{new Date(request.createdAt).toLocaleString()}</p>
                    </div>
                    {request.acknowledgedAt && (
                      <div>
                        <span className="font-medium">Acknowledged:</span>
                        <p>
                          {new Date(request.acknowledgedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {request.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => handleAcknowledge(request._id)}
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        Acknowledge
                      </Button>
                    )}
                    {request.status === "acknowledged" && (
                      <Button
                        size="sm"
                        onClick={() => handleResolve(request._id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Resolve
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total} results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setFilters({ ...filters, page: pagination.page - 1 })
                  }
                  disabled={pagination.page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setFilters({ ...filters, page: pagination.page + 1 })
                  }
                  disabled={pagination.page === pagination.pages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyRequests;
