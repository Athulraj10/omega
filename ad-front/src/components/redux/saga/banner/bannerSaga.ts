import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  fetchBannersRequest,
  fetchBannersSuccess,
  fetchBannersFailure,
  addBannerRequest,
  addBannerSuccess,
  addBannerFailure,
  updateBannerRequest,
  updateBannerSuccess,
  updateBannerFailure,
  deleteBannerRequest,
  deleteBannerSuccess,
  deleteBannerFailure,
  updateBannerStatusRequest,
  updateBannerStatusSuccess,
  updateBannerStatusFailure,
  setDefaultBannerRequest,
  setDefaultBannerSuccess,
  setDefaultBannerFailure,
} from '../../action/banner/bannerAction';
import api from '../../../../utils/api';

// API functions
const bannerAPI = {
  getBanners: () => api.get('/admin/banners'),
  addBanner: (data: any) => api.post('/admin/banners', data),
  updateBanner: (id: string, data: any) => api.put(`/admin/banners/${id}`, data),
  deleteBanner: (id: string) => api.delete(`/admin/banners/${id}`),
  updateBannerStatus: (id: string, status: '1' | '0') => api.patch(`/admin/banners/${id}/status`, { id, status }),
  setDefaultBanner: (id: string) => api.patch(`/admin/banners/${id}/default`),
};

// Sagas
function* fetchBannersSaga(): Generator<any, void, any> {
  try {
    console.log('🔍 Fetching banners...');
    
    // Check if token exists before making the request
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      yield put(fetchBannersFailure('No authentication token found. Please log in.'));
      return;
    }
    
    const response: any = yield call(bannerAPI.getBanners);
    console.log('📦 Banner response:', response);
    
    if (response?.data?.meta?.code === 200) {
      yield put(fetchBannersSuccess(response.data.data));
    } else {
      yield put(fetchBannersFailure(response.data.meta.message || 'Failed to fetch banners'));
    }
  } catch (error: any) {
    console.error('❌ Banner fetch error:', error);
    console.error('❌ Error response:', error.response);
    console.error('❌ Error message:', error.message);
    
    if (error.response?.status === 401) {
      // Clear invalid token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('adminData');
        window.location.href = '/sign-in';
      }
      yield put(fetchBannersFailure('Authentication required. Please log in.'));
    } else if (error.response?.status === 403) {
      yield put(fetchBannersFailure('Access denied. You do not have permission to view banners.'));
    } else if (error.code === 'NETWORK_ERROR') {
      yield put(fetchBannersFailure('Network error. Please check your connection and try again.'));
    } else {
      yield put(fetchBannersFailure(error.response?.data?.message || error.message || 'Failed to fetch banners'));
    }
  }
}

function* addBannerSaga(action: ReturnType<typeof addBannerRequest>): Generator<any, void, any> {
  try {
    console.log('📤 Sending banner data:', action.payload);
    const response: any = yield call(bannerAPI.addBanner, action.payload);
    console.log('📥 Banner response:', response);
    
    if (response.data.success) {
      yield put(addBannerSuccess(response.data.data));
      toast.success('Banner added successfully');
    } else {
      yield put(addBannerFailure(response.data.message || 'Failed to add banner'));
      toast.error(response.data.message || 'Failed to add banner');
    }
  } catch (error: any) {
    console.error('❌ Banner creation error:', error);
    const errorMessage = error.response?.data?.message || 'Failed to add banner';
    yield put(addBannerFailure(errorMessage));
    toast.error(errorMessage);
  }
}

function* updateBannerSaga(action: ReturnType<typeof updateBannerRequest>): Generator<any, void, any> {
  try {
    const { id, ...data } = action.payload;
    console.log('📤 Updating banner:', { id, data });
    const response: any = yield call(bannerAPI.updateBanner, id, data);
    console.log('📥 Update banner response:', response);
    
    // Check for success based on meta.code (backend uses Response.successResponseWithoutData)
    if (response.data?.meta?.code === 200 || response.data?.success) {
      // Refresh banners list
      yield put(fetchBannersRequest());
      yield put(updateBannerSuccess({ ...data, _id: id } as any));
      toast.success('Banner updated successfully');
    } else {
      yield put(updateBannerFailure(response.data?.meta?.message || response.data?.message || 'Failed to update banner'));
      toast.error(response.data?.meta?.message || response.data?.message || 'Failed to update banner');
    }
  } catch (error: any) {
    console.error('❌ Banner update error:', error);
    const errorMessage = error.response?.data?.meta?.message || error.response?.data?.message || 'Failed to update banner';
    yield put(updateBannerFailure(errorMessage));
    toast.error(errorMessage);
  }
}

function* deleteBannerSaga(action: ReturnType<typeof deleteBannerRequest>): Generator<any, void, any> {
  try {
    console.log('🗑️ Deleting banner:', action.payload);
    const response: any = yield call(bannerAPI.deleteBanner, action.payload);
    console.log('📥 Delete banner response:', response);
    
    // Backend uses Response.successResponseWithoutData which has meta.code
    if (response.data?.meta?.code === 200 || response.data?.success) {
      yield put(deleteBannerSuccess(action.payload));
      toast.success('Banner deleted successfully');
      // Refresh banners list after deletion
      yield put(fetchBannersRequest());
    } else {
      yield put(deleteBannerFailure(response.data?.meta?.message || response.data?.message || 'Failed to delete banner'));
      toast.error(response.data?.meta?.message || response.data?.message || 'Failed to delete banner');
    }
  } catch (error: any) {
    console.error('❌ Banner delete error:', error);
    const errorMessage = error.response?.data?.meta?.message || error.response?.data?.message || 'Failed to delete banner';
    yield put(deleteBannerFailure(errorMessage));
    toast.error(errorMessage);
  }
}

function* updateBannerStatusSaga(action: ReturnType<typeof updateBannerStatusRequest>): Generator<any, void, any> {
  try {
    const response: any = yield call(bannerAPI.updateBannerStatus, action.payload.id, action.payload.status);
    if (response.data.success) {
      yield put(updateBannerStatusSuccess(action.payload));
      toast.success('Banner status updated successfully');
    } else {
      yield put(updateBannerStatusFailure(response.data.message || 'Failed to update banner status'));
      toast.error(response.data.message || 'Failed to update banner status');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to update banner status';
    yield put(updateBannerStatusFailure(errorMessage));
    toast.error(errorMessage);
  }
}

function* setDefaultBannerSaga(action: ReturnType<typeof setDefaultBannerRequest>): Generator<any, void, any> {
  try {
    const response: any = yield call(bannerAPI.setDefaultBanner, action.payload);
    if (response.data.success) {
      yield put(setDefaultBannerSuccess(action.payload));
      toast.success('Default banner updated successfully');
    } else {
      yield put(setDefaultBannerFailure(response.data.message || 'Failed to set default banner'));
      toast.error(response.data.message || 'Failed to set default banner');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to set default banner';
    yield put(setDefaultBannerFailure(errorMessage));
    toast.error(errorMessage);
  }
}

// Root saga
export function* bannerSaga() {
  yield takeLatest(fetchBannersRequest.type, fetchBannersSaga);
  yield takeLatest(addBannerRequest.type, addBannerSaga);
  yield takeLatest(updateBannerRequest.type, updateBannerSaga);
  yield takeLatest(deleteBannerRequest.type, deleteBannerSaga);
  yield takeLatest(updateBannerStatusRequest.type, updateBannerStatusSaga);
  yield takeLatest(setDefaultBannerRequest.type, setDefaultBannerSaga);
} 