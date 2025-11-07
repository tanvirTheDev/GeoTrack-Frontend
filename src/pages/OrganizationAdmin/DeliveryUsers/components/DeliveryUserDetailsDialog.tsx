import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeliveryUser } from "@/types";
import { Calendar, Mail, MapPin, Phone, Shield, User } from "lucide-react";
import React from "react";

interface DeliveryUserDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: DeliveryUser;
}

const DeliveryUserDetailsDialog: React.FC<DeliveryUserDetailsDialogProps> = ({
  open,
  onOpenChange,
  user,
}) => {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Delivery User Details
          </DialogTitle>
          <DialogDescription>
            Complete information about the delivery user
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Name</span>
                </div>
                <p className="text-sm text-gray-600">{user.name}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Status</span>
                </div>
                <div>{getStatusBadge(user.status)}</div>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vehicle Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium">Vehicle Type</span>
                <div>{getVehicleTypeBadge(user.vehicleType)}</div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">License Number</span>
                <p className="text-sm text-gray-600">{user.licenseNumber}</p>
              </div>
            </div>
          </div>

          {/* Location Information */}
          {user.lastLocation && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Last Known Location</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Address</span>
                </div>
                <p className="text-sm text-gray-600">
                  {user.lastLocation.address}
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                  <div>Lat: {user.lastLocation.latitude.toFixed(6)}</div>
                  <div>Lng: {user.lastLocation.longitude.toFixed(6)}</div>
                </div>
                <div className="text-xs text-gray-500">
                  Last updated:{" "}
                  {new Date(user.lastLocation.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Created</span>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Last Login</span>
                </div>
                <p className="text-sm text-gray-600">
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleDateString()
                    : "Never"}
                </p>
              </div>
            </div>
          </div>

          {/* Organization Information */}
          {user.organizationId && typeof user.organizationId === "object" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Organization</h3>
              <div className="space-y-2">
                <span className="text-sm font-medium">Organization Name</span>
                <p className="text-sm text-gray-600">
                  {user.organizationId.name}
                </p>
                {user.organizationId.companyName && (
                  <p className="text-sm text-gray-500">
                    {user.organizationId.companyName}
                  </p>
                )}
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

export default DeliveryUserDetailsDialog;
