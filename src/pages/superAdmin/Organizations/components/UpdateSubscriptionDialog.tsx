import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { toast } from "../../../../hooks/use-toast";
import {
  UpdateSubscriptionFormData,
  updateSubscriptionSchema,
} from "../../../../schemas/organization.schemas";
import { useUpdateSubscriptionMutation } from "../../../../store/slices/organization/organizationApi";
import { Organization } from "../../../../types/organization.types";

interface UpdateSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization: Organization | null;
  onSuccess: () => void;
}

const UpdateSubscriptionDialog: React.FC<UpdateSubscriptionDialogProps> = ({
  open,
  onOpenChange,
  organization,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<UpdateSubscriptionFormData>({
    resolver: zodResolver(updateSubscriptionSchema),
    defaultValues: {
      packageType: "basic",
      maxUsers: 10,
      endDate: "",
    },
  });

  const [updateSubscription, { isLoading }] = useUpdateSubscriptionMutation();

  useEffect(() => {
    if (organization) {
      reset({
        packageType: organization.packageType,
        maxUsers: organization.maxUsers,
        endDate: organization.subscriptionEndDate.split("T")[0], // Convert to YYYY-MM-DD format
      });
    }
  }, [organization, reset]);

  const handleFormSubmit = async (data: UpdateSubscriptionFormData) => {
    if (!organization) return;

    try {
      await updateSubscription({
        organizationId: organization._id,
        data: {
          packageType: data.packageType,
          maxUsers: data.maxUsers,
          endDate: data.endDate,
        },
      }).unwrap();

      toast({
        title: "Success",
        description: "Subscription updated successfully",
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to update subscription",
        variant: "destructive",
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      reset();
    }
    onOpenChange(open);
  };

  const getPackageInfo = (packageType: string) => {
    switch (packageType) {
      case "basic":
        return {
          name: "Basic",
          description: "Essential features for small teams",
          color: "text-gray-600",
          features: ["Up to 10 users", "Basic tracking", "Email support"],
        };
      case "premium":
        return {
          name: "Premium",
          description: "Advanced features for growing businesses",
          color: "text-blue-600",
          features: [
            "Up to 50 users",
            "Advanced tracking",
            "Priority support",
            "Analytics",
          ],
        };
      case "platinum":
        return {
          name: "Platinum",
          description: "Full features for enterprise organizations",
          color: "text-purple-600",
          features: [
            "Unlimited users",
            "Full tracking suite",
            "24/7 support",
            "Advanced analytics",
            "Custom integrations",
          ],
        };
      default:
        return {
          name: "Basic",
          description: "Essential features for small teams",
          color: "text-gray-600",
          features: ["Up to 10 users", "Basic tracking", "Email support"],
        };
    }
  };

  if (!organization) return null;

  const packageInfo = getPackageInfo(watch("packageType"));

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Subscription</DialogTitle>
          <DialogDescription>
            Update subscription details for {organization.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Current Subscription Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              Current Subscription
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Package:</span>
                <span className="ml-2 font-medium capitalize">
                  {organization.packageType}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Max Users:</span>
                <span className="ml-2 font-medium">
                  {organization.maxUsers}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Current Users:</span>
                <span className="ml-2 font-medium">
                  {organization.currentUsers || 0}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Expires:</span>
                <span className="ml-2 font-medium">
                  {new Date(
                    organization.subscriptionEndDate
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* New Subscription Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="packageType">
                Package Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={watch("packageType")}
                onValueChange={(value) =>
                  setValue(
                    "packageType",
                    value as "basic" | "premium" | "platinum"
                  )
                }
              >
                <SelectTrigger
                  className={errors.packageType ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select package type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
              {errors.packageType && (
                <p className="text-sm text-red-500">
                  {errors.packageType.message}
                </p>
              )}
            </div>

            {/* Package Info Display */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className={`font-medium ${packageInfo.color}`}>
                {packageInfo.name}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {packageInfo.description}
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                {packageInfo.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxUsers">
                Maximum Users <span className="text-red-500">*</span>
              </Label>
              <Input
                id="maxUsers"
                type="number"
                min="1"
                {...register("maxUsers", { valueAsNumber: true })}
                className={errors.maxUsers ? "border-red-500" : ""}
              />
              {errors.maxUsers && (
                <p className="text-sm text-red-500">
                  {errors.maxUsers.message}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Current users: {organization.currentUsers || 0}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">
                Subscription End Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
                className={errors.endDate ? "border-red-500" : ""}
              />
              {errors.endDate && (
                <p className="text-sm text-red-500">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          {/* Warning if reducing users */}
          {watch("maxUsers") < (organization.currentUsers || 0) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-yellow-800">Warning</p>
                  <p className="text-sm text-yellow-600">
                    You are reducing the user limit below the current number of
                    users ({organization.currentUsers || 0}). This may affect
                    existing users' access.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Subscription"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSubscriptionDialog;
