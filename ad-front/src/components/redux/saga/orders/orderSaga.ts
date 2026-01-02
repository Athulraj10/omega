import { call, put, takeLatest } from 'redux-saga/effects';
import API from '@/utils/api';
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDER_BY_ID_REQUEST,
  CREATE_ORDER_REQUEST,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_REQUEST,
  DELETE_ORDER_REQUEST,
  FETCH_ORDER_ANALYTICS_REQUEST,
  BULK_UPDATE_ORDER_STATUS_REQUEST,
  EXPORT_ORDERS_REQUEST,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchOrderByIdSuccess,
  fetchOrderByIdFailure,
  createOrderSuccess,
  createOrderFailure,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,
  updateOrderSuccess,
  updateOrderFailure,
  deleteOrderSuccess,
  deleteOrderFailure,
  fetchOrderAnalyticsSuccess,
  fetchOrderAnalyticsFailure,
  bulkUpdateOrderStatusSuccess,
  bulkUpdateOrderStatusFailure,
  exportOrdersSuccess,
  exportOrdersFailure,
} from '../../action/orders/orderAction';

// Fetch Orders Saga
function* fetchOrdersSaga(action: any): Generator<any, void, any> {
  try {
    console.log('🔄 Fetching orders with filters:', action.payload);
    
    // Build query string from filters
    const queryParams = new URLSearchParams();
    Object.entries(action.payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const response = yield call(API.get, `/admin/orders?${queryParams.toString()}`);
    console.log('📥 Orders response:', response.data);
    
    if (response.data.success) {
      yield put(fetchOrdersSuccess(response.data.data));
    } else {
      yield put(fetchOrdersFailure(response.data.message || 'Failed to fetch orders'));
    }
  } catch (error: any) {
    console.error('❌ Error in fetchOrdersSaga:', error);
    yield put(fetchOrdersFailure(error.response?.data?.message || 'Failed to fetch orders'));
  }
}

// Fetch Order by ID Saga
function* fetchOrderByIdSaga(action: any): Generator<any, void, any> {
  try {
    console.log('🔄 Fetching order by ID:', action.payload);
    
    const response = yield call(API.get, `/admin/orders/${action.payload}`);
    console.log('📥 Order response:', response.data);
    
    if (response.data.success) {
      yield put(fetchOrderByIdSuccess(response.data.data));
    } else {
      yield put(fetchOrderByIdFailure(response.data.message || 'Failed to fetch order'));
    }
  } catch (error: any) {
    console.error('❌ Error in fetchOrderByIdSaga:', error);
    yield put(fetchOrderByIdFailure(error.response?.data?.message || 'Failed to fetch order'));
  }
}

// Create Order Saga
function* createOrderSaga(action: any): Generator<any, void, any> {
  try {
    console.log('🔄 Creating order:', action.payload);
    
    const response = yield call(API.post, '/admin/orders', action.payload);
    console.log('📥 Create order response:', response.data);
    
    if (response.data.success) {
      yield put(createOrderSuccess(response.data.data));
    } else {
      yield put(createOrderFailure(response.data.message || 'Failed to create order'));
    }
  } catch (error: any) {
    console.error('❌ Error in createOrderSaga:', error);
    yield put(createOrderFailure(error.response?.data?.message || 'Failed to create order'));
  }
}

// Update Order Status Saga
function* updateOrderStatusSaga(action: any): Generator<any, void, any> {
  try {
    console.log('🔄 Updating order status:', action.payload);
    
    const { id, status, paymentStatus } = action.payload;
    const updateData: any = { status };
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    
    const response = yield call(API.patch, `/admin/orders/${id}/status`, updateData);
    console.log('📥 Update status response:', response.data);
    
    if (response.data.success) {
      yield put(updateOrderStatusSuccess(response.data.data));
    } else {
      yield put(updateOrderStatusFailure(response.data.message || 'Failed to update order status'));
    }
  } catch (error: any) {
    console.error('❌ Error in updateOrderStatusSaga:', error);
    yield put(updateOrderStatusFailure(error.response?.data?.message || 'Failed to update order status'));
  }
}

// Update Order Saga
function* updateOrderSaga(action: any): Generator<any, void, any> {
  try {
    console.log('🔄 Updating order:', action.payload);
    
    const { id, orderData } = action.payload;
    const response = yield call(API.put, `/admin/orders/${id}`, orderData);
    console.log('📥 Update order response:', response.data);
    
    if (response.data.success) {
      yield put(updateOrderSuccess(response.data.data));
    } else {
      yield put(updateOrderFailure(response.data.message || 'Failed to update order'));
    }
  } catch (error: any) {
    console.error('❌ Error in updateOrderSaga:', error);
    yield put(updateOrderFailure(error.response?.data?.message || 'Failed to update order'));
  }
}

// Delete Order Saga
function* deleteOrderSaga(action: any): Generator<any, void, any> {
  try {
    console.log('🔄 Deleting order:', action.payload);
    
    const response = yield call(API.delete, `/admin/orders/${action.payload}`);
    console.log('📥 Delete order response:', response.data);
    
    if (response.data.success) {
      yield put(deleteOrderSuccess(action.payload));
    } else {
      yield put(deleteOrderFailure(response.data.message || 'Failed to delete order'));
    }
  } catch (error: any) {
    console.error('❌ Error in deleteOrderSaga:', error);
    yield put(deleteOrderFailure(error.response?.data?.message || 'Failed to delete order'));
  }
}

// Fetch Order Analytics Saga
function* fetchOrderAnalyticsSaga(action: any): Generator<any, void, any> {
  try {
    console.log('🔄 Fetching order analytics:', action.payload);
    
    const response = yield call(API.get, `/admin/orders/analytics/overview?timeFrame=${action.payload}`);
    console.log('📥 Analytics response:', response.data);
    
    if (response.data.success) {
      yield put(fetchOrderAnalyticsSuccess(response.data.data));
    } else {
      yield put(fetchOrderAnalyticsFailure(response.data.message || 'Failed to fetch analytics'));
    }
  } catch (error: any) {
    console.error('❌ Error in fetchOrderAnalyticsSaga:', error);
    yield put(fetchOrderAnalyticsFailure(error.response?.data?.message || 'Failed to fetch analytics'));
  }
}

// Bulk Update Order Status Saga
function* bulkUpdateOrderStatusSaga(action: any): Generator<any, void, any> {
  try {
    console.log('🔄 Bulk updating order status:', action.payload);
    
    const response = yield call(API.patch, '/admin/orders/bulk/status', action.payload);
    console.log('📥 Bulk update response:', response.data);
    
    if (response.data.success) {
      yield put(bulkUpdateOrderStatusSuccess(response.data.data));
    } else {
      yield put(bulkUpdateOrderStatusFailure(response.data.message || 'Failed to bulk update orders'));
    }
  } catch (error: any) {
    console.error('❌ Error in bulkUpdateOrderStatusSaga:', error);
    yield put(bulkUpdateOrderStatusFailure(error.response?.data?.message || 'Failed to bulk update orders'));
  }
}

// Export Orders Saga
function* exportOrdersSaga(action: any): Generator<any, void, any> {
  try {
    console.log('🔄 Exporting orders:', action.payload);
    
    // Build query string from filters
    const queryParams = new URLSearchParams();
    Object.entries(action.payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    const response = yield call(API.get, `/admin/orders/export/csv?${queryParams.toString()}`);
    console.log('📥 Export response:', response.data);
    
    if (response.data.success) {
      yield put(exportOrdersSuccess(response.data.data));
    } else {
      yield put(exportOrdersFailure(response.data.message || 'Failed to export orders'));
    }
  } catch (error: any) {
    console.error('❌ Error in exportOrdersSaga:', error);
    yield put(exportOrdersFailure(error.response?.data?.message || 'Failed to export orders'));
  }
}

// Order Sagas
export function* orderSagas(): Generator<any, void, any> {
  yield takeLatest(FETCH_ORDERS_REQUEST, fetchOrdersSaga);
  yield takeLatest(FETCH_ORDER_BY_ID_REQUEST, fetchOrderByIdSaga);
  yield takeLatest(CREATE_ORDER_REQUEST, createOrderSaga);
  yield takeLatest(UPDATE_ORDER_STATUS_REQUEST, updateOrderStatusSaga);
  yield takeLatest(UPDATE_ORDER_REQUEST, updateOrderSaga);
  yield takeLatest(DELETE_ORDER_REQUEST, deleteOrderSaga);
  yield takeLatest(FETCH_ORDER_ANALYTICS_REQUEST, fetchOrderAnalyticsSaga);
  yield takeLatest(BULK_UPDATE_ORDER_STATUS_REQUEST, bulkUpdateOrderStatusSaga);
  yield takeLatest(EXPORT_ORDERS_REQUEST, exportOrdersSaga);
}