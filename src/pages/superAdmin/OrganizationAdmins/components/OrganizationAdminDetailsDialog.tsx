import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { OrganizationAdmin } from "../../../../types/organizationAdmin.types";

interface OrganizationAdminDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: OrganizationAdmin;
}

const OrganizationAdminDetailsDialog: React.FC<
  OrganizationAdminDetailsDialogProps
> = ({ open, onOpenChange, admin }) => {
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

  const getPermissionBadge = (hasPermission: boolean) => {
    return hasPermission ? (
      <Badge className="bg-green-100 text-green-800">Yes</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">No</Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Organization Admin Details</DialogTitle>
          <DialogDescription>
            View detailed information about the organization administrator.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Name
                  </label>
                  <p className="text-sm">{admin.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-sm">{admin.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Organization
                  </label>
                  <p className="text-sm">
                    {admin.organizationId?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <div className="mt-1">{getStatusBadge(admin.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Last Login
                  </label>
                  <p className="text-sm">
                    {admin.lastLogin
                      ? new Date(admin.lastLogin).toLocaleString()
                      : "Never"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Created By
                  </label>
                  <p className="text-sm">{admin.createdBy?.name || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Manage Users</span>
                  {getPermissionBadge(admin.permissions.canManageUsers)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">View Reports</span>
                  {getPermissionBadge(admin.permissions.canViewReports)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Manage Settings</span>
                  {getPermissionBadge(admin.permissions.canManageSettings)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">View Analytics</span>
                  {getPermissionBadge(admin.permissions.canViewAnalytics)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Manage Delivery Users</span>
                  {getPermissionBadge(admin.permissions.canManageDeliveryUsers)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">View Live Tracking</span>
                  {getPermissionBadge(admin.permissions.canViewLiveTracking)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle>Timestamps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Created At
                  </label>
                  <p className="text-sm">
                    {new Date(admin.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Updated At
                  </label>
                  <p className="text-sm">
                    {new Date(admin.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationAdminDetailsDialog;
