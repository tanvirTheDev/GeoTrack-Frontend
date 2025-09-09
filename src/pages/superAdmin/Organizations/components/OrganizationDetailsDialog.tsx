import { Building2, Calendar, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Separator } from "../../../../components/ui/separator";
import { Organization } from "../../../../types/organization.types";

interface OrganizationDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization: Organization | null;
}

const OrganizationDetailsDialog: React.FC<OrganizationDetailsDialogProps> = ({
  open,
  onOpenChange,
  organization,
}) => {
  if (!organization) return null;

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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isSubscriptionExpired = () => {
    return new Date(organization.subscriptionEndDate) < new Date();
  };

  const getDaysUntilExpiry = () => {
    const today = new Date();
    const expiryDate = new Date(organization.subscriptionEndDate);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Organization Details
          </DialogTitle>
          <DialogDescription>
            Complete information about {organization.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">{organization.name}</h2>
              <p className="text-gray-600">{organization.companyName}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={getStatusColor(organization.status)}>
                {organization.status.charAt(0).toUpperCase() +
                  organization.status.slice(1)}
              </Badge>
              <Badge className={getPackageColor(organization.packageType)}>
                {organization.packageType.charAt(0).toUpperCase() +
                  organization.packageType.slice(1)}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{organization.email}</p>
                </div>
              </div>
              {organization.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{organization.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Address Information */}
          {organization.address && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Address</h3>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                <div className="space-y-1">
                  {organization.address.street && (
                    <p className="font-medium">{organization.address.street}</p>
                  )}
                  <div className="text-sm text-gray-600">
                    {[
                      organization.address.city,
                      organization.address.state,
                      organization.address.country,
                      organization.address.zipCode,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Subscription Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subscription Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Package Type</p>
                <Badge className={getPackageColor(organization.packageType)}>
                  {organization.packageType.charAt(0).toUpperCase() +
                    organization.packageType.slice(1)}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">User Limit</p>
                <p className="font-medium">{organization.maxUsers} users</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Current Users</p>
                <p className="font-medium">
                  {organization.currentUsers || 0} users
                </p>
              </div>
            </div>

            {/* User Usage Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>User Usage</span>
                <span>
                  {organization.currentUsers || 0} / {organization.maxUsers}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    (organization.currentUsers || 0) / organization.maxUsers >
                    0.8
                      ? "bg-red-500"
                      : (organization.currentUsers || 0) /
                          organization.maxUsers >
                        0.6
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      ((organization.currentUsers || 0) /
                        organization.maxUsers) *
                        100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Subscription Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Subscription Start</p>
                  <p className="font-medium">
                    {formatDate(organization.subscriptionStartDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Subscription End</p>
                  <p className="font-medium">
                    {formatDate(organization.subscriptionEndDate)}
                  </p>
                  {isSubscriptionExpired() ? (
                    <p className="text-sm text-red-600">Expired</p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {getDaysUntilExpiry()} days remaining
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* System Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Organization ID</p>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                  {organization._id}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Status</p>
                <Badge className={getStatusColor(organization.status)}>
                  {organization.status.charAt(0).toUpperCase() +
                    organization.status.slice(1)}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Created At</p>
                <p className="font-medium">
                  {formatDateTime(organization.createdAt)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium">
                  {formatDateTime(organization.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Subscription Status Alert */}
          {isSubscriptionExpired() && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-800">
                    Subscription Expired
                  </p>
                  <p className="text-sm text-red-600">
                    This organization's subscription has expired. Please update
                    the subscription to restore access.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isSubscriptionExpired() && getDaysUntilExpiry() <= 7 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">
                    Subscription Expiring Soon
                  </p>
                  <p className="text-sm text-yellow-600">
                    This organization's subscription will expire in{" "}
                    {getDaysUntilExpiry()} days.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationDetailsDialog;
