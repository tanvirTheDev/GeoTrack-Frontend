import { BaseEntity, PackageType, PaymentStatus } from "./common.types";

export interface Package extends BaseEntity {
  name: string;
  type: PackageType;
  description: string;
  price: number;
  maxUsers: number;
  features: string[];
  duration: number; // in days
  isActive: boolean;
  popular?: boolean;
  discount?: number;
  originalPrice?: number;
}

export interface Payment extends BaseEntity {
  organizationId: string;
  organizationName: string;
  packageId: string;
  packageName: string;
  packageType: PackageType;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  transactionId?: string;
  gatewayResponse?: any;
  paidAt?: string;
  expiresAt?: string;
  refundedAt?: string;
  refundAmount?: number;
  notes?: string;
}

export interface CreatePaymentRequest {
  organizationId: string;
  packageId: string;
  paymentMethod: "ssl_commerce" | "stripe" | "paypal";
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PaymentResponse {
  paymentId: string;
  paymentUrl?: string;
  transactionId?: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  expiresAt?: string;
}

export interface VerifyPaymentRequest {
  paymentId: string;
  transactionId?: string;
}

export interface VerifyPaymentResponse {
  isValid: boolean;
  payment: Payment;
  message: string;
}

export interface PaymentHistory {
  paymentId: string;
  organizationId: string;
  organizationName: string;
  packageName: string;
  packageType: PackageType;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  transactionId?: string;
  paidAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface PaymentStats {
  totalPayments: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
  completedPayments: number;
  failedPayments: number;
  refundedPayments: number;
  averagePaymentValue: number;
  packageDistribution: {
    basic: number;
    premium: number;
    platinum: number;
  };
}

export interface Subscription extends BaseEntity {
  organizationId: string;
  organizationName: string;
  packageId: string;
  packageName: string;
  packageType: PackageType;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isExpiring: boolean;
  daysUntilExpiry: number;
  maxUsers: number;
  currentUsers: number;
  autoRenew: boolean;
  paymentId?: string;
  lastPaymentDate?: string;
  nextPaymentDate?: string;
}

export interface CreateSubscriptionRequest {
  organizationId: string;
  packageId: string;
  startDate: string;
  endDate: string;
  autoRenew?: boolean;
}

export interface UpdatePaymentSubscriptionRequest {
  packageId?: string;
  endDate?: string;
  autoRenew?: boolean;
}

export interface SubscriptionStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  expiringSubscriptions: number;
  expiredSubscriptions: number;
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  averageSubscriptionValue: number;
  churnRate: number;
}

export interface Invoice extends BaseEntity {
  invoiceNumber: string;
  organizationId: string;
  organizationName: string;
  packageId: string;
  packageName: string;
  amount: number;
  currency: string;
  taxAmount: number;
  totalAmount: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  dueDate: string;
  paidAt?: string;
  paymentId?: string;
  items: InvoiceItem[];
  billingAddress: {
    name: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
  };
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxRate?: number;
}

export interface CreateInvoiceRequest {
  organizationId: string;
  packageId: string;
  dueDate: string;
  billingAddress: {
    name: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
  };
}

export interface PaymentMethod {
  id: string;
  type: "card" | "bank_transfer" | "digital_wallet";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: string;
}

export interface SSLCommerceConfig {
  storeId: string;
  storePassword: string;
  isSandbox: boolean;
  successUrl: string;
  failUrl: string;
  cancelUrl: string;
}
