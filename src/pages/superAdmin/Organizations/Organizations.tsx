import {
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  Trash2,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { toast } from "../../../hooks/use-toast";
import { RootState } from "../../../store";
import {
  useActivateOrganizationMutation,
  useCreateOrganizationMutation,
  useDeleteOrganizationMutation,
  useGetOrganizationsQuery,
  useSuspendOrganizationMutation,
  useUpdateOrganizationMutation,
} from "../../../store/slices/organization/organizationApi";
import {
  setFilters,
  setPagination,
} from "../../../store/slices/organization/organizationSlice";
import {
  CreateOrganizationRequest,
  Organization,
} from "../../../types/organization.types";
import CreateOrganizationDialog from "./components/CreateOrganizationDialog";
import EditOrganizationDialog from "./components/EditOrganizationDialog";
import OrganizationDetailsDialog from "./components/OrganizationDetailsDialog";
import UpdateSubscriptionDialog from "./components/UpdateSubscriptionDialog";

const Organizations: React.FC = () => {
  const dispatch = useDispatch();
  const { filters, pagination } = useSelector(
    (state: RootState) => state.organization
  );

  // State for dialogs
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);

  // API queries and mutations
  const {
    data: organizationsData,
    isLoading,
    error,
    refetch,
  } = useGetOrganizationsQuery({
    page: pagination.page,
    limit: pagination.limit,
    search: filters.search,
    status: filters.status,
    packageType: filters.packageType,
  });

  const [createOrganization, { isLoading: isCreating }] =
    useCreateOrganizationMutation();
  const [updateOrganization, { isLoading: isUpdating }] =
    useUpdateOrganizationMutation();
  const [deleteOrganization, { isLoading: isDeleting }] =
    useDeleteOrganizationMutation();
  const [suspendOrganization] = useSuspendOrganizationMutation();
  const [activateOrganization] = useActivateOrganizationMutation();

  const organizations = (organizationsData?.data as Organization[]) || [];
  const paginationInfo = organizationsData?.pagination;

  // Debug logging
  console.log(
    "Organizations component - organizationsData:",
    organizationsData
  );
  console.log("Organizations component - isLoading:", isLoading);
  console.log("Organizations component - error:", error);
  console.log("Organizations component - organizations:", organizations);
  console.log("Organizations component - paginationInfo:", paginationInfo);

  const handleSearch = (value: string) => {
    dispatch(setFilters({ search: value }));
    dispatch(setPagination({ page: 1 }));
  };

  const handleStatusFilter = (value: string) => {
    dispatch(setFilters({ status: value === "all" ? "" : value }));
    dispatch(setPagination({ page: 1 }));
  };

  const handlePackageFilter = (value: string) => {
    dispatch(setFilters({ packageType: value === "all" ? "" : value }));
    dispatch(setPagination({ page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage }));
  };

  const handleCreateOrganization = async (data: CreateOrganizationRequest) => {
    try {
      const res = await createOrganization(data).unwrap();
      console.log("🔑 Create organization response:", res);
      toast({
        title: "Success",
        description: "Organization created successfully",
      });
      setCreateDialogOpen(false);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to create organization",
        variant: "destructive",
      });
    }
  };

  const handleUpdateOrganization = async (data: Partial<Organization>) => {
    if (!selectedOrganization) return;

    try {
      await updateOrganization({
        organizationId: selectedOrganization._id,
        data,
      }).unwrap();
      toast({
        title: "Success",
        description: "Organization updated successfully",
      });
      setEditDialogOpen(false);
      setSelectedOrganization(null);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to update organization",
        variant: "destructive",
      });
    }
  };

  const handleDeleteOrganization = async () => {
    if (!selectedOrganization) return;

    try {
      await deleteOrganization(selectedOrganization._id).unwrap();
      toast({
        title: "Success",
        description: "Organization deleted successfully",
      });
      setDeleteDialogOpen(false);
      setSelectedOrganization(null);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to delete organization",
        variant: "destructive",
      });
    }
  };

  const handleSuspendOrganization = async (organization: Organization) => {
    try {
      await suspendOrganization(organization._id).unwrap();
      toast({
        title: "Success",
        description: "Organization suspended successfully",
      });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to suspend organization",
        variant: "destructive",
      });
    }
  };

  const handleActivateOrganization = async (organization: Organization) => {
    try {
      await activateOrganization(organization._id).unwrap();
      toast({
        title: "Success",
        description: "Organization activated successfully",
      });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to activate organization",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPackageColor = (packageType: string) => {
    switch (packageType) {
      case "platinum":
        return "bg-purple-100 text-purple-800";
      case "premium":
        return "bg-blue-100 text-blue-800";
      case "basic":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading organizations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600">Failed to load organizations</p>
          <p className="text-sm text-gray-500 mt-1">
            Error:{" "}
            {(error as any)?.data?.message ||
              (error as any)?.message ||
              "Unknown error"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Status: {(error as any)?.status || "Unknown"}
          </p>
          <Button onClick={() => refetch()} className="mt-2">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Check if there are no organizations
  if (organizations.length === 0 && !isLoading && !error) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
            <p className="text-gray-600">
              Manage all organizations and their subscriptions
            </p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Organization
          </Button>
        </div>

        {/* Empty State */}
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No organizations found
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by creating your first organization.
            </p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Organization
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
          <p className="text-gray-600">
            Manage all organizations and their subscriptions
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Organization
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Organizations
                </p>
                <p className="text-2xl font-bold">
                  {paginationInfo?.total || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Play className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold">
                  {
                    organizations.filter((org) => org.status === "active")
                      .length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Pause className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Suspended</p>
                <p className="text-2xl font-bold">
                  {
                    organizations.filter((org) => org.status === "suspended")
                      .length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">
                  {organizations.reduce(
                    (sum, org) => sum + (org.currentUsers || 0),
                    0
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organizations Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>All Organizations</CardTitle>
              <CardDescription>
                A list of all organizations in the system
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search organizations..."
                  className="pl-8 w-full sm:w-64"
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <Select
                value={filters.status || "all"}
                onValueChange={handleStatusFilter}
              >
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.packageType || "all"}
                onValueChange={handlePackageFilter}
              >
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Packages</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organizations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="text-gray-500">
                        <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No organizations found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  organizations.map((org) => (
                    <TableRow key={org._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Building2 className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{org.name}</p>
                            <p className="text-sm text-gray-500">
                              {org.companyName}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{org.email}</p>
                          {org.phone && (
                            <p className="text-sm text-gray-500">{org.phone}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(org.status)}>
                          {org.status.charAt(0).toUpperCase() +
                            org.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>
                            {org.currentUsers || 0} / {org.maxUsers}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${Math.min(
                                  ((org.currentUsers || 0) / org.maxUsers) *
                                    100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPackageColor(org.packageType)}>
                          {org.packageType.charAt(0).toUpperCase() +
                            org.packageType.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDate(org.subscriptionEndDate)}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(org.createdAt)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrganization(org);
                                setDetailsDialogOpen(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrganization(org);
                                setEditDialogOpen(true);
                              }}
                            >
                              <Settings className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrganization(org);
                                setSubscriptionDialogOpen(true);
                              }}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              Update Subscription
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {org.status === "active" ? (
                              <DropdownMenuItem
                                onClick={() => handleSuspendOrganization(org)}
                                className="text-red-600"
                              >
                                <Pause className="mr-2 h-4 w-4" />
                                Suspend
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleActivateOrganization(org)}
                                className="text-green-600"
                              >
                                <Play className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrganization(org);
                                setDeleteDialogOpen(true);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {paginationInfo && paginationInfo.pages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-700">
                Showing {(paginationInfo.page - 1) * paginationInfo.limit + 1}{" "}
                to{" "}
                {Math.min(
                  paginationInfo.page * paginationInfo.limit,
                  paginationInfo.total
                )}{" "}
                of {paginationInfo.total} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(paginationInfo.page - 1)}
                  disabled={paginationInfo.page <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm">
                  Page {paginationInfo.page} of {paginationInfo.pages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(paginationInfo.page + 1)}
                  disabled={paginationInfo.page >= paginationInfo.pages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateOrganizationDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateOrganization}
        isLoading={isCreating}
      />

      <EditOrganizationDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        organization={selectedOrganization}
        onSubmit={handleUpdateOrganization}
        isLoading={isUpdating}
      />

      <OrganizationDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        organization={selectedOrganization}
      />

      <UpdateSubscriptionDialog
        open={subscriptionDialogOpen}
        onOpenChange={setSubscriptionDialogOpen}
        organization={selectedOrganization}
        onSuccess={() => {
          setSubscriptionDialogOpen(false);
          refetch();
        }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Organization</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedOrganization?.name}"?
              This action cannot be undone. All associated data will be
              permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteOrganization}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Organizations;
