import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDER_BY_ID_REQUEST,
  FETCH_ORDER_BY_ID_SUCCESS,
  FETCH_ORDER_BY_ID_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  FETCH_ORDER_ANALYTICS_REQUEST,
  FETCH_ORDER_ANALYTICS_SUCCESS,
  FETCH_ORDER_ANALYTICS_FAILURE,
  BULK_UPDATE_ORDER_STATUS_REQUEST,
  BULK_UPDATE_ORDER_STATUS_SUCCESS,
  BULK_UPDATE_ORDER_STATUS_FAILURE,
  EXPORT_ORDERS_REQUEST,
  EXPORT_ORDERS_SUCCESS,
  EXPORT_ORDERS_FAILURE,
  OrderFilters,
  Order,
  OrderAction
} from '../types/orderTypes';

// Action Creators
export const fetchOrdersRequest = (filters: OrderFilters): OrderAction => ({
  type: FETCH_ORDERS_REQUEST,
  payload: filters
});

export const fetchOrdersSuccess = (data: any): OrderAction => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: data
});

export const fetchOrdersFailure = (error: string): OrderAction => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error
});

export const fetchOrderByIdRequest = (id: string): OrderAction => ({
  type: FETCH_ORDER_BY_ID_REQUEST,
  payload: id
});

export const fetchOrderByIdSuccess = (order: Order): OrderAction => ({
  type: FETCH_ORDER_BY_ID_SUCCESS,
  payload: order
});

export const fetchOrderByIdFailure = (error: string): OrderAction => ({
  type: FETCH_ORDER_BY_ID_FAILURE,
  payload: error
});

export const createOrderRequest = (orderData: Partial<Order>): OrderAction => ({
  type: CREATE_ORDER_REQUEST,
  payload: orderData
});

export const createOrderSuccess = (order: Order): OrderAction => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order
});

export const createOrderFailure = (error: string): OrderAction => ({
  type: CREATE_ORDER_FAILURE,
  payload: error
});

export const updateOrderStatusRequest = (id: string, status: string, paymentStatus?: string): OrderAction => ({
  type: UPDATE_ORDER_STATUS_REQUEST,
  payload: { id, status, paymentStatus }
});

export const updateOrderStatusSuccess = (order: Order): OrderAction => ({
  type: UPDATE_ORDER_STATUS_SUCCESS,
  payload: order
});

export const updateOrderStatusFailure = (error: string): OrderAction => ({
  type: UPDATE_ORDER_STATUS_FAILURE,
  payload: error
});

export const updateOrderRequest = (id: string, orderData: Partial<Order>): OrderAction => ({
  type: UPDATE_ORDER_REQUEST,
  payload: { id, orderData }
});

export const updateOrderSuccess = (order: Order): OrderAction => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: order
});

export const updateOrderFailure = (error: string): OrderAction => ({
  type: UPDATE_ORDER_FAILURE,
  payload: error
});

export const deleteOrderRequest = (id: string): OrderAction => ({
  type: DELETE_ORDER_REQUEST,
  payload: id
});

export const deleteOrderSuccess = (id: string): OrderAction => ({
  type: DELETE_ORDER_SUCCESS,
  payload: id
});

export const deleteOrderFailure = (error: string): OrderAction => ({
  type: DELETE_ORDER_FAILURE,
  payload: error
});

export const fetchOrderAnalyticsRequest = (timeFrame: string): OrderAction => ({
  type: FETCH_ORDER_ANALYTICS_REQUEST,
  payload: timeFrame
});

export const fetchOrderAnalyticsSuccess = (analytics: any): OrderAction => ({
  type: FETCH_ORDER_ANALYTICS_SUCCESS,
  payload: analytics
});

export const fetchOrderAnalyticsFailure = (error: string): OrderAction => ({
  type: FETCH_ORDER_ANALYTICS_FAILURE,
  payload: error
});

export const bulkUpdateOrderStatusRequest = (orderIds: string[], status: string, paymentStatus?: string): OrderAction => ({
  type: BULK_UPDATE_ORDER_STATUS_REQUEST,
  payload: { orderIds, status, paymentStatus }
});

export const bulkUpdateOrderStatusSuccess = (result: { updatedCount: number; totalRequested: number }): OrderAction => ({
  type: BULK_UPDATE_ORDER_STATUS_SUCCESS,
  payload: result
});

export const bulkUpdateOrderStatusFailure = (error: string): OrderAction => ({
  type: BULK_UPDATE_ORDER_STATUS_FAILURE,
  payload: error
});

export const exportOrdersRequest = (filters: OrderFilters): OrderAction => ({
  type: EXPORT_ORDERS_REQUEST,
  payload: filters
});

export const exportOrdersSuccess = (data: any[]): OrderAction => ({
  type: EXPORT_ORDERS_SUCCESS,
  payload: data
});

export const exportOrdersFailure = (error: string): OrderAction => ({
  type: EXPORT_ORDERS_FAILURE,
  payload: error
});