import {
  Edit,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Shield,
  ShieldOff,
  Trash2,
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
import { organizationAdminService } from "../../../services/organizationAdminService";
import { organizationService } from "../../../services/organizationService";
import { Organization } from "../../../types/organization.types";
import {
  OrganizationAdmin,
  OrganizationAdminFilters,
  OrganizationAdminStats,
} from "../../../types/organizationAdmin.types";
import CreateOrganizationAdminDialog from "./components/CreateOrganizationAdminDialog";
import EditOrganizationAdminDialog from "./components/EditOrganizationAdminDialog";
import OrganizationAdminDetailsDialog from "./components/OrganizationAdminDetailsDialog";
import ResetPasswordDialog from "./components/ResetPasswordDialog";
import UpdatePermissionsDialog from "./components/UpdatePermissionsDialog";

const OrganizationAdmins: React.FC = () => {
  const { toast } = useToast();
  const [admins, setAdmins] = useState<OrganizationAdmin[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [stats, setStats] = useState<OrganizationAdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<OrganizationAdminFilters>({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    organizationId: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [updatePermissionsDialogOpen, setUpdatePermissionsDialogOpen] =
    useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<OrganizationAdmin | null>(
    null
  );

  // Load data
  useEffect(() => {
    loadData();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    try {
      setLoading(true);
      const [adminsResponse, organizationsResponse, statsResponse] =
        await Promise.all([
          organizationAdminService.getAllOrganizationAdmins(filters),
          organizationService.getAllOrganizations(),
          organizationAdminService.getOrganizationAdminStats(),
        ]);

      if (adminsResponse.success) {
        setAdmins(adminsResponse.data as OrganizationAdmin[]);
        setPagination(adminsResponse.pagination || pagination);
      }

      if (organizationsResponse) {
        const orgs = Array.isArray(organizationsResponse)
          ? organizationsResponse
          : ((organizationsResponse as any)?.data as Organization[]) || [];
        setOrganizations(orgs);
      }

      if (statsResponse.success) {
        setStats(statsResponse.data as OrganizationAdminStats);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load organization admins",
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

  const handleOrganizationFilter = (value: string) => {
    const next = value === "__clear__" ? "" : value;
    setFilters({ ...filters, organizationId: next, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  const handleCreateSuccess = () => {
    setCreateDialogOpen(false);
    loadData();
    toast({
      title: "Success",
      description: "Organization admin created successfully",
    });
  };

  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    setSelectedAdmin(null);
    loadData();
    toast({
      title: "Success",
      description: "Organization admin updated successfully",
    });
  };

  const handleDelete = async (adminId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this organization admin?"
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await organizationAdminService.deleteOrganizationAdmin(
        adminId
      );
      if (response.success) {
        loadData();
        toast({
          title: "Success",
          description: "Organization admin deleted successfully",
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
        description: "Failed to delete organization admin",
        variant: "destructive",
      });
    }
  };

  const handleSuspend = async (adminId: string) => {
    try {
      const response = await organizationAdminService.suspendOrganizationAdmin(
        adminId
      );
      if (response.success) {
        loadData();
        toast({
          title: "Success",
          description: "Organization admin suspended successfully",
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
        description: "Failed to suspend organization admin",
        variant: "destructive",
      });
    }
  };

  const handleActivate = async (adminId: string) => {
    try {
      const response = await organizationAdminService.activateOrganizationAdmin(
        adminId
      );
      if (response.success) {
        loadData();
        toast({
          title: "Success",
          description: "Organization admin activated successfully",
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
        description: "Failed to activate organization admin",
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Organization Admins</h1>
          <p className="text-gray-600">Manage organization administrators</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Admin
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Admins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAdmins}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.activeAdmins}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {stats.inactiveAdmins}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.suspendedAdmins}
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
                placeholder="Search admins..."
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
              value={filters.organizationId || undefined}
              onValueChange={handleOrganizationFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Organizations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__clear__">Clear filter</SelectItem>
                {organizations.map((org) => (
                  <SelectItem key={org._id} value={org._id}>
                    {org.name}
                  </SelectItem>
                ))}
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

      {/* Admins Table */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Admins</CardTitle>
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
                  <TableHead>Organization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin._id}>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.organizationId?.name || "N/A"}</TableCell>
                    <TableCell>{getStatusBadge(admin.status)}</TableCell>
                    <TableCell>
                      {admin.lastLogin
                        ? new Date(admin.lastLogin).toLocaleDateString()
                        : "Never"}
                    </TableCell>
                    <TableCell>
                      {new Date(admin.createdAt).toLocaleDateString()}
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
                              setSelectedAdmin(admin);
                              setDetailsDialogOpen(true);
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedAdmin(admin);
                              setEditDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedAdmin(admin);
                              setResetPasswordDialogOpen(true);
                            }}
                          >
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedAdmin(admin);
                              setUpdatePermissionsDialogOpen(true);
                            }}
                          >
                            Update Permissions
                          </DropdownMenuItem>
                          {admin.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() => handleSuspend(admin._id)}
                              className="text-orange-600"
                            >
                              <ShieldOff className="w-4 h-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleActivate(admin._id)}
                              className="text-green-600"
                            >
                              <Shield className="w-4 h-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDelete(admin._id)}
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
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateOrganizationAdminDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={handleCreateSuccess}
      />

      {selectedAdmin && (
        <>
          <EditOrganizationAdminDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            admin={selectedAdmin}
            onSuccess={handleEditSuccess}
          />

          <OrganizationAdminDetailsDialog
            open={detailsDialogOpen}
            onOpenChange={setDetailsDialogOpen}
            admin={selectedAdmin}
          />

          <ResetPasswordDialog
            open={resetPasswordDialogOpen}
            onOpenChange={setResetPasswordDialogOpen}
            admin={selectedAdmin}
            onSuccess={() => {
              setResetPasswordDialogOpen(false);
              setSelectedAdmin(null);
              toast({
                title: "Success",
                description: "Password reset successfully",
              });
            }}
          />

          <UpdatePermissionsDialog
            open={updatePermissionsDialogOpen}
            onOpenChange={setUpdatePermissionsDialogOpen}
            admin={selectedAdmin}
            onSuccess={() => {
              setUpdatePermissionsDialogOpen(false);
              setSelectedAdmin(null);
              loadData();
              toast({
                title: "Success",
                description: "Permissions updated successfully",
              });
            }}
          />
        </>
      )}
    </div>
  );
};

export default OrganizationAdmins;
