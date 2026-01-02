// Order Types
export interface OrderItem {
  _id?: string;
  product: string | Product;
  quantity: number;
  priceAtPurchase: number;
}

export interface ShippingAddress {
  label: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  _id: string;
  user: string | User;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  paymentStatus: 'pending' | 'paid' | 'failed';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderAnalytics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  statusDistribution: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
  dailyOrders: Array<{
    _id: string;
    orders: number;
    revenue: number;
  }>;
  topCustomers: Array<{
    user: User;
    totalOrders: number;
    totalSpent: number;
  }>;
  topProducts: Array<{
    product: Product;
    orderCount: number;
    totalRevenue: number;
  }>;
}

export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface OrderPagination {
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface OrderSummary {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

export interface OrdersResponse {
  orders: Order[];
  pagination: OrderPagination;
  summary: OrderSummary;
}

// Action Types
export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

export const FETCH_ORDER_BY_ID_REQUEST = 'FETCH_ORDER_BY_ID_REQUEST';
export const FETCH_ORDER_BY_ID_SUCCESS = 'FETCH_ORDER_BY_ID_SUCCESS';
export const FETCH_ORDER_BY_ID_FAILURE = 'FETCH_ORDER_BY_ID_FAILURE';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

export const UPDATE_ORDER_STATUS_REQUEST = 'UPDATE_ORDER_STATUS_REQUEST';
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS';
export const UPDATE_ORDER_STATUS_FAILURE = 'UPDATE_ORDER_STATUS_FAILURE';

export const UPDATE_ORDER_REQUEST = 'UPDATE_ORDER_REQUEST';
export const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS';
export const UPDATE_ORDER_FAILURE = 'UPDATE_ORDER_FAILURE';

export const DELETE_ORDER_REQUEST = 'DELETE_ORDER_REQUEST';
export const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS';
export const DELETE_ORDER_FAILURE = 'DELETE_ORDER_FAILURE';

export const FETCH_ORDER_ANALYTICS_REQUEST = 'FETCH_ORDER_ANALYTICS_REQUEST';
export const FETCH_ORDER_ANALYTICS_SUCCESS = 'FETCH_ORDER_ANALYTICS_SUCCESS';
export const FETCH_ORDER_ANALYTICS_FAILURE = 'FETCH_ORDER_ANALYTICS_FAILURE';

export const BULK_UPDATE_ORDER_STATUS_REQUEST = 'BULK_UPDATE_ORDER_STATUS_REQUEST';
export const BULK_UPDATE_ORDER_STATUS_SUCCESS = 'BULK_UPDATE_ORDER_STATUS_SUCCESS';
export const BULK_UPDATE_ORDER_STATUS_FAILURE = 'BULK_UPDATE_ORDER_STATUS_FAILURE';

export const EXPORT_ORDERS_REQUEST = 'EXPORT_ORDERS_REQUEST';
export const EXPORT_ORDERS_SUCCESS = 'EXPORT_ORDERS_SUCCESS';
export const EXPORT_ORDERS_FAILURE = 'EXPORT_ORDERS_FAILURE';

// Action Interfaces
export interface FetchOrdersRequest {
  type: typeof FETCH_ORDERS_REQUEST;
  payload: OrderFilters;
}

export interface FetchOrdersSuccess {
  type: typeof FETCH_ORDERS_SUCCESS;
  payload: OrdersResponse;
}

export interface FetchOrdersFailure {
  type: typeof FETCH_ORDERS_FAILURE;
  payload: string;
}

export interface FetchOrderByIdRequest {
  type: typeof FETCH_ORDER_BY_ID_REQUEST;
  payload: string;
}

export interface FetchOrderByIdSuccess {
  type: typeof FETCH_ORDER_BY_ID_SUCCESS;
  payload: Order;
}

export interface FetchOrderByIdFailure {
  type: typeof FETCH_ORDER_BY_ID_FAILURE;
  payload: string;
}

export interface CreateOrderRequest {
  type: typeof CREATE_ORDER_REQUEST;
  payload: Partial<Order>;
}

export interface CreateOrderSuccess {
  type: typeof CREATE_ORDER_SUCCESS;
  payload: Order;
}

export interface CreateOrderFailure {
  type: typeof CREATE_ORDER_FAILURE;
  payload: string;
}

export interface UpdateOrderStatusRequest {
  type: typeof UPDATE_ORDER_STATUS_REQUEST;
  payload: { id: string; status: string; paymentStatus?: string };
}

export interface UpdateOrderStatusSuccess {
  type: typeof UPDATE_ORDER_STATUS_SUCCESS;
  payload: Order;
}

export interface UpdateOrderStatusFailure {
  type: typeof UPDATE_ORDER_STATUS_FAILURE;
  payload: string;
}

export interface UpdateOrderRequest {
  type: typeof UPDATE_ORDER_REQUEST;
  payload: { id: string; orderData: Partial<Order> };
}

export interface UpdateOrderSuccess {
  type: typeof UPDATE_ORDER_SUCCESS;
  payload: Order;
}

export interface UpdateOrderFailure {
  type: typeof UPDATE_ORDER_FAILURE;
  payload: string;
}

export interface DeleteOrderRequest {
  type: typeof DELETE_ORDER_REQUEST;
  payload: string;
}

export interface DeleteOrderSuccess {
  type: typeof DELETE_ORDER_SUCCESS;
  payload: string;
}

export interface DeleteOrderFailure {
  type: typeof DELETE_ORDER_FAILURE;
  payload: string;
}

export interface FetchOrderAnalyticsRequest {
  type: typeof FETCH_ORDER_ANALYTICS_REQUEST;
  payload: string;
}

export interface FetchOrderAnalyticsSuccess {
  type: typeof FETCH_ORDER_ANALYTICS_SUCCESS;
  payload: OrderAnalytics;
}

export interface FetchOrderAnalyticsFailure {
  type: typeof FETCH_ORDER_ANALYTICS_FAILURE;
  payload: string;
}

export interface BulkUpdateOrderStatusRequest {
  type: typeof BULK_UPDATE_ORDER_STATUS_REQUEST;
  payload: { orderIds: string[]; status: string; paymentStatus?: string };
}

export interface BulkUpdateOrderStatusSuccess {
  type: typeof BULK_UPDATE_ORDER_STATUS_SUCCESS;
  payload: { updatedCount: number; totalRequested: number };
}

export interface BulkUpdateOrderStatusFailure {
  type: typeof BULK_UPDATE_ORDER_STATUS_FAILURE;
  payload: string;
}

export interface ExportOrdersRequest {
  type: typeof EXPORT_ORDERS_REQUEST;
  payload: OrderFilters;
}

export interface ExportOrdersSuccess {
  type: typeof EXPORT_ORDERS_SUCCESS;
  payload: any[];
}

export interface ExportOrdersFailure {
  type: typeof EXPORT_ORDERS_FAILURE;
  payload: string;
}

// Union type for all order actions
export type OrderAction =
  | FetchOrdersRequest
  | FetchOrdersSuccess
  | FetchOrdersFailure
  | FetchOrderByIdRequest
  | FetchOrderByIdSuccess
  | FetchOrderByIdFailure
  | CreateOrderRequest
  | CreateOrderSuccess
  | CreateOrderFailure
  | UpdateOrderStatusRequest
  | UpdateOrderStatusSuccess
  | UpdateOrderStatusFailure
  | UpdateOrderRequest
  | UpdateOrderSuccess
  | UpdateOrderFailure
  | DeleteOrderRequest
  | DeleteOrderSuccess
  | DeleteOrderFailure
  | FetchOrderAnalyticsRequest
  | FetchOrderAnalyticsSuccess
  | FetchOrderAnalyticsFailure
  | BulkUpdateOrderStatusRequest
  | BulkUpdateOrderStatusSuccess
  | BulkUpdateOrderStatusFailure
  | ExportOrdersRequest
  | ExportOrdersSuccess
  | ExportOrdersFailure;

// State interface
export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  analytics: OrderAnalytics | null;
  pagination: OrderPagination | null;
  summary: OrderSummary | null;
  loading: {
    orders: boolean;
    currentOrder: boolean;
    analytics: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    bulkUpdate: boolean;
    export: boolean;
  };
  error: string | null;
}

// Import User and Product types (you may need to adjust these imports based on your actual types)
interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  userName: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  sku: string;
}