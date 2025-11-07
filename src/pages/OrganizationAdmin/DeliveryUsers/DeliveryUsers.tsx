import {
  Filter,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Shield,
  ShieldOff,
  Trash2,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useToast } from "../../../hooks/use-toast";
import { deliveryUserService } from "../../../services/deliveryUserService";
import {
  DeliveryUser,
  DeliveryUserFilters,
  DeliveryUserResponse,
  DeliveryUserStats,
} from "../../../types";
import CreateDeliveryUserDialog from "./components/CreateDeliveryUserDialog";
import DeliveryUserDetailsDialog from "./components/DeliveryUserDetailsDialog";
import EditDeliveryUserDialog from "./components/EditDeliveryUserDialog";
import ResetPasswordDialog from "./components/ResetPasswordDialog";

const DeliveryUsers: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<DeliveryUserResponse>({
    success: false,
    message: "",
    data: {
      users: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    },
  });
  const [stats, setStats] = useState<DeliveryUserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<DeliveryUserFilters>({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    vehicleType: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DeliveryUser | null>(null);

  // Load data
  useEffect(() => {
    loadData();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersResponse, statsResponse] = await Promise.all([
        deliveryUserService.getAllDeliveryUsers(filters),
        deliveryUserService.getDeliveryUserStats(),
      ]);
      console.log("usersResponse", usersResponse);
      console.log("statsResponse", statsResponse);

      if (usersResponse.success) {
        setUsers(usersResponse as DeliveryUserResponse);
        if (usersResponse.data?.pagination) {
          setPagination(usersResponse.data.pagination);
        }
      }

      if (statsResponse.success) {
        setStats(statsResponse.data as DeliveryUserStats);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load delivery users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setFilters({ ...filters, search: value, page: 1 });
  };

  const handleStatusFilter = (value: string) => {
    const next = value === "__clear__" ? "" : value;
    setFilters({ ...filters, status: next, page: 1 });
  };

  const handleVehicleTypeFilter = (value: string) => {
    const next = value === "__clear__" ? "" : value;
    setFilters({ ...filters, vehicleType: next, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  const handleCreateSuccess = () => {
    setCreateDialogOpen(false);
    loadData();
    toast({
      title: "Success",
      description: "Delivery user created successfully",
    });
  };

  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
    loadData();
    toast({
      title: "Success",
      description: "Delivery user updated successfully",
    });
  };

  const handleDelete = async (userId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this delivery user?"
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await deliveryUserService.deleteDeliveryUser(userId);
      if (response.success) {
        loadData();
        toast({
          title: "Success",
          description: "Delivery user deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete delivery user",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (
    userId: string,
    status: "active" | "inactive" | "suspended"
  ) => {
    try {
      const response = await deliveryUserService.updateDeliveryUserStatus(
        userId,
        status
      );
      if (response.success) {
        loadData();
        toast({
          title: "Success",
          description: `User ${
            status === "active"
              ? "activated"
              : status === "inactive"
              ? "deactivated"
              : "suspended"
          } successfully`,
        });
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getVehicleTypeBadge = (vehicleType: string) => {
    const colors = {
      bike: "bg-blue-100 text-blue-800",
      motorcycle: "bg-purple-100 text-purple-800",
      car: "bg-green-100 text-green-800",
      van: "bg-orange-100 text-orange-800",
      truck: "bg-red-100 text-red-800",
    };

    return (
      <Badge
        className={
          colors[vehicleType as keyof typeof colors] ||
          "bg-gray-100 text-gray-800"
        }
      >
        {vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Delivery Users</h1>
          <p className="text-gray-600">
            Manage your delivery team and track their activities
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <div className="p-2 rounded-full bg-green-100">
                <User className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.activeUsers}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online</CardTitle>
              <div className="p-2 rounded-full bg-blue-100">
                <User className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.onlineUsers}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspended</CardTitle>
              <div className="p-2 rounded-full bg-red-100">
                <ShieldOff className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.suspendedUsers}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.vehicleType || undefined}
              onValueChange={handleVehicleTypeFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Vehicle Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__clear__">Clear filter</SelectItem>
                <SelectItem value="bike">Bike</SelectItem>
                <SelectItem value="motorcycle">Motorcycle</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
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

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Vehicle Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data?.users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      {getVehicleTypeBadge(user.vehicleType)}
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : "Never"}
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setDetailsDialogOpen(true);
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setResetPasswordDialogOpen(true);
                            }}
                          >
                            Reset Password
                          </DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(user._id, "inactive")
                              }
                              className="text-orange-600"
                            >
                              <ShieldOff className="w-4 h-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : user.status === "inactive" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(user._id, "active")
                              }
                              className="text-green-600"
                            >
                              <Shield className="w-4 h-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(user._id, "active")
                              }
                              className="text-green-600"
                            >
                              <Shield className="w-4 h-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDelete(user._id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
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
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateDeliveryUserDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={handleCreateSuccess}
      />

      {selectedUser && (
        <>
          <EditDeliveryUserDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            user={selectedUser}
            onSuccess={handleEditSuccess}
          />

          <DeliveryUserDetailsDialog
            open={detailsDialogOpen}
            onOpenChange={setDetailsDialogOpen}
            user={selectedUser}
          />

          <ResetPasswordDialog
            open={resetPasswordDialogOpen}
            onOpenChange={setResetPasswordDialogOpen}
            user={selectedUser}
            onSuccess={() => {
              setResetPasswordDialogOpen(false);
              setSelectedUser(null);
              toast({
                title: "Success",
                description: "Password reset successfully",
              });
            }}
          />
        </>
      )}
    </div>
  );
};

export default DeliveryUsers;
