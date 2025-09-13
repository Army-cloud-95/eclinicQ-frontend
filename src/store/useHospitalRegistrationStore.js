import { create } from 'zustand';
import axiosInstance from '../lib/axios';

const initialState = {
  name: '',
  type: '',
  emailId: '',
  phone: '',
  address: {
    blockNo: '',
    landmark: '',
    street: ''
  },
  city: '',
  state: '',
  pincode: '',
  url: '',
  logo: '',
  image: '',
  latitude: '',
  longitude: '',
  medicalSpecialties: [],
  hospitalServices: [],
  establishmentYear: '',
  noOfBeds: '',
  accreditation: [],
  adminId: '',
  documents: [],
  operatingHours: [],
  loading: false,
  error: null,
  success: false,
};

const useHospitalRegistrationStore = create((set, get) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setAddressField: (field, value) => set((state) => ({
    ...state,
    address: { ...state.address, [field]: value },
  })),
  setDocument: (doc) => set((state) => ({
    ...state,
    documents: [...state.documents.filter(d => d.no !== doc.no), doc],
  })),
  setDocuments: (docs) => set({ documents: docs }),
  setOperatingHours: (hours) => set({ operatingHours: hours }),
  reset: () => set(initialState),
  submit: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const state = get();
      const body = {};
      const fields = [
        'name', 'type', 'emailId', 'phone', 'city', 'state', 'pincode', 'url', 'logo', 'image',
        'latitude', 'longitude', 'medicalSpecialties', 'hospitalServices', 'establishmentYear',
        'noOfBeds', 'accreditation', 'adminId'
      ];
      fields.forEach((key) => {
        if (state[key] !== '' && state[key] !== null && state[key] !== undefined && !(Array.isArray(state[key]) && state[key].length === 0)) {
          body[key] = state[key];
        }
      });
      if (state.address && Object.values(state.address).some(v => v !== '' && v !== null && v !== undefined)) {
        body.address = {};
        Object.entries(state.address).forEach(([k, v]) => {
          if (v !== '' && v !== null && v !== undefined) {
            body.address[k] = v;
          }
        });
      }
      if (Array.isArray(state.documents) && state.documents.length > 0) {
        body.documents = state.documents.filter(doc => doc && doc.url);
      }
      if (Array.isArray(state.operatingHours) && state.operatingHours.length > 0) {
        body.operatingHours = state.operatingHours;
      }
      const res = await axiosInstance.post('/hospitals/create', body);
      if (!res || res.status !== 200) throw new Error('Failed to submit');
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error: error.message, success: false });
    }
  },
}));

export default useHospitalRegistrationStore;
