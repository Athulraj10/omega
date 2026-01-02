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
  OrderState,
  OrderAction
} from '../../action/types/orderTypes';

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  analytics: null,
  pagination: null,
  summary: null,
  loading: {
    orders: false,
    currentOrder: false,
    analytics: false,
    create: false,
    update: false,
    delete: false,
    bulkUpdate: false,
    export: false
  },
  error: null
};

const orderReducer = (state = initialState, action: OrderAction): OrderState => {
  switch (action.type) {
    // Fetch Orders
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, orders: true },
        error: null
      };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        pagination: action.payload.pagination,
        summary: action.payload.summary,
        loading: { ...state.loading, orders: false },
        error: null
      };

    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, orders: false },
        error: action.payload
      };

    // Fetch Order by ID
    case FETCH_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, currentOrder: true },
        error: null
      };

    case FETCH_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        currentOrder: action.payload,
        loading: { ...state.loading, currentOrder: false },
        error: null
      };

    case FETCH_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, currentOrder: false },
        error: action.payload
      };

    // Create Order
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, create: true },
        error: null
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        loading: { ...state.loading, create: false },
        error: null
      };

    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, create: false },
        error: action.payload
      };

    // Update Order Status
    case UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, update: true },
        error: null
      };

    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.payload._id ? action.payload : order
        ),
        currentOrder: state.currentOrder?._id === action.payload._id ? action.payload : state.currentOrder,
        loading: { ...state.loading, update: false },
        error: null
      };

    case UPDATE_ORDER_STATUS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, update: false },
        error: action.payload
      };

    // Update Order
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, update: true },
        error: null
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.payload._id ? action.payload : order
        ),
        currentOrder: state.currentOrder?._id === action.payload._id ? action.payload : state.currentOrder,
        loading: { ...state.loading, update: false },
        error: null
      };

    case UPDATE_ORDER_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, update: false },
        error: action.payload
      };

    // Delete Order
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, delete: true },
        error: null
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(order => order._id !== action.payload),
        currentOrder: state.currentOrder?._id === action.payload ? null : state.currentOrder,
        loading: { ...state.loading, delete: false },
        error: null
      };

    case DELETE_ORDER_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, delete: false },
        error: action.payload
      };

    // Fetch Order Analytics
    case FETCH_ORDER_ANALYTICS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, analytics: true },
        error: null
      };

    case FETCH_ORDER_ANALYTICS_SUCCESS:
      return {
        ...state,
        analytics: action.payload,
        loading: { ...state.loading, analytics: false },
        error: null
      };

    case FETCH_ORDER_ANALYTICS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, analytics: false },
        error: action.payload
      };

    // Bulk Update Order Status
    case BULK_UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, bulkUpdate: true },
        error: null
      };

    case BULK_UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, bulkUpdate: false },
        error: null
      };

    case BULK_UPDATE_ORDER_STATUS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, bulkUpdate: false },
        error: action.payload
      };

    // Export Orders
    case EXPORT_ORDERS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, export: true },
        error: null
      };

    case EXPORT_ORDERS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, export: false },
        error: null
      };

    case EXPORT_ORDERS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, export: false },
        error: action.payload
      };

    default:
      return state;
  }
};

export default orderReducer;