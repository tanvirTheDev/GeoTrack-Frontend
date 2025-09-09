import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import React from "react";

const EmergencyRequests: React.FC = () => {
  const emergencies = [
    {
      id: 1,
      user: "John Doe",
      priority: "High",
      time: "2 min ago",
      status: "Pending",
    },
    {
      id: 2,
      user: "Jane Smith",
      priority: "Critical",
      time: "5 min ago",
      status: "Acknowledged",
    },
    {
      id: 3,
      user: "Mike Johnson",
      priority: "Medium",
      time: "1 hour ago",
      status: "Resolved",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Emergency Requests</h1>
        <p className="text-gray-600">
          Monitor and respond to emergency situations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-gray-500">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-xs text-gray-500">Response in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">5</div>
            <p className="text-xs text-gray-500">Successfully resolved</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Emergency Requests</CardTitle>
          <CardDescription>
            Latest emergency situations and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencies.map((emergency) => (
              <div
                key={emergency.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      emergency.priority === "Critical"
                        ? "bg-red-500"
                        : emergency.priority === "High"
                        ? "bg-orange-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium">{emergency.user}</p>
                    <p className="text-sm text-gray-500">{emergency.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      emergency.status === "Pending"
                        ? "bg-red-100 text-red-800"
                        : emergency.status === "Acknowledged"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {emergency.status}
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyRequests;
