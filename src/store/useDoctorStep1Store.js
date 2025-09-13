import { create } from 'zustand';
import axios from '../lib/axios';
import useDoctorRegistrationStore from './useDoctorRegistrationStore';

const initialState = {
  firstName: '',
  lastName: '',
  emailId: '',
  phone: '',
  gender: '',
  city: '',
  mfa: {
    emailId: true,
    phone: true,
  },
  profilePhotoKey: '',
  role: 'doctor',
  loading: false,
  error: null,
  success: false,
};

const useDoctorStep1Store = create((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({
    ...state,
    [field]: value,
  })),
  setMfaField: (field, value) => set((state) => ({
    ...state,
    mfa: {
      ...state.mfa,
      [field]: value,
    },
  })),
  reset: () => set(initialState),
  submit: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const {
        firstName,
        lastName,
        emailId,
        phone,
        gender,
        city,
        mfa,
        profilePhotoKey,
        role,
      } = useDoctorStep1Store.getState();

      const body = {
        firstName,
        lastName,
        emailId,
        phone,
        gender,
        city,
        mfa,
        profilePhotoKey,
        role,
      };

      const res = await axios.post('/auth/register', body);

      // Extract doctorId (userId for next steps) from response
      const doctorId = res?.data?.data?.doctorId
        || res?.data?.doctorId
        || res?.data?.data?.userId;

      // Persist into the doctor registration store for subsequent steps
      if (doctorId) {
        try {
          const { setField } = useDoctorRegistrationStore.getState();
          setField('userId', doctorId);
        } catch (_) {
          // no-op if store not available
        }
      }

      set({ success: true });
      setTimeout(() => set({ success: false }), 100);
      return { success: true, doctorId };
    } catch (error) {
      const msg = error?.response?.data?.message || error.message;
      set({ error: msg });
      return { success: false, error: msg };
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDoctorStep1Store;
