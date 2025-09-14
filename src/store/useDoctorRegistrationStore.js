import { create } from 'zustand';
import axiosInstance from '../lib/axios';

const initialState = {
  // Step 1 (captured from Step1 response)
  userId: '',
  specialization: '',
  experienceYears: '',
  medicalCouncilName: '',
  medicalCouncilRegYear: '',
  medicalCouncilRegNo: '',
  medicalDegreeType: '',
  medicalDegreeUniversityName: '',
  medicalDegreeYearOfCompletion: '',
  pgMedicalDegreeType: '',
  pgMedicalDegreeUniversityName: '',
  pgMedicalDegreeYearOfCompletion: '',

  // Step 3
  hasClinic: true,
  clinicData: {
    name: '',
    email: '',
    phone: '',
    proof: '', // file key/url
    latitude: '',
    longitude: '',
    blockNo: '',
    areaStreet: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    image: '', // file key/url
    panCard: '',
  },

  // Step 4/5
  documents: [], // [{ no, type, url }]
  // Additional practice specializations
  additionalPractices: [], // [{ specialization: {name, value}, experienceYears: '2' }]

  loading: false,
  error: null,
  success: false,
};

const useDoctorRegistrationStore = create((set, get) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setClinicField: (field, value) => set((state) => ({
    ...state,
    clinicData: { ...state.clinicData, [field]: value },
  })),
  addPractice: () => set((state) => ({
    ...state,
    additionalPractices: [...state.additionalPractices, { specialization: null, experienceYears: '' }],
  })),
  updatePractice: (index, patch) => set((state) => ({
    ...state,
    additionalPractices: state.additionalPractices.map((p, i) => i === index ? { ...p, ...patch } : p),
  })),
  removePractice: (index) => set((state) => ({
    ...state,
    additionalPractices: state.additionalPractices.filter((_, i) => i !== index),
  })),
  setDocument: (doc) => set((state) => ({
    ...state,
    documents: [...state.documents.filter(d => d.no !== doc.no), doc],
  })),
  setDocuments: (docs) => set({ documents: docs }),
  reset: () => set(initialState),
  submit: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const state = get();
      // Ensure Step 1 has provided the userId
      if (!state.userId) {
        const e = new Error('ERR_MISSING_USER_ID');
        e.code = 'ERR_MISSING_USER_ID';
        throw e;
      }
      // Build specialization array [{ name, expYears }]
      const mainSpecObj = typeof state.specialization === 'object'
        ? state.specialization
        : (state.specialization ? { name: state.specialization, value: state.specialization } : null);
      if (!mainSpecObj || !(mainSpecObj.value || mainSpecObj.name)) {
        const e = new Error('ERR_MISSING_SPECIALIZATION');
        e.code = 'ERR_MISSING_SPECIALIZATION';
        throw e;
      }
      const toStr = (v, fallback = '') => (v !== undefined && v !== null && v !== '' ? String(v) : fallback);
      // Ensure experience years is a string of digits as required by backend validation
      const toExpYearsStr = (v, fallback = '0') => {
        const s = v !== undefined && v !== null ? String(v).trim() : '';
        if (!s) return fallback;
        const n = Number.parseInt(s, 10);
        return Number.isFinite(n) ? String(n) : fallback;
      };
      const specializationArr = [];
      const primaryName = (mainSpecObj.name || mainSpecObj.value)?.toString().trim();
      if (primaryName) {
        specializationArr.push({ name: primaryName, expYears: toExpYearsStr(state.experienceYears, '0') });
      }
      if (Array.isArray(state.additionalPractices)) {
        state.additionalPractices.forEach((p) => {
          const spec = p?.specialization;
          const nmRaw = typeof spec === 'object' ? (spec?.name || spec?.value) : spec;
          const nm = nmRaw?.toString().trim();
          if (nm) specializationArr.push({ name: nm, expYears: toExpYearsStr(p?.experienceYears, '0') });
        });
      }
      // Compose the body as required, but filter out empty fields
  const body = {};
  const fields = [
        'userId',
        'medicalCouncilName',
        'medicalCouncilRegYear',
        'medicalCouncilRegNo',
        'medicalDegreeType',
        'medicalDegreeUniversityName',
        'medicalDegreeYearOfCompletion',
        'pgMedicalDegreeType',
        'pgMedicalDegreeUniversityName',
        'pgMedicalDegreeYearOfCompletion',
        'hasClinic',
      ];
  fields.forEach((key) => {
        if (state[key] !== '' && state[key] !== null && state[key] !== undefined) {
          body[key] = state[key];
        }
      });
  // Add specialization as array: [{ name: string; expYears: number }]
  body.specialization = specializationArr;
  // Additional practices are represented within specialization array above

      // Ensure year fields are strings to match backend validation
      if (body.medicalCouncilRegYear !== undefined) {
        body.medicalCouncilRegYear = toStr(state.medicalCouncilRegYear, '');
      }
      if (body.medicalDegreeYearOfCompletion !== undefined) {
        body.medicalDegreeYearOfCompletion = toStr(state.medicalDegreeYearOfCompletion, '');
      }
      if (body.pgMedicalDegreeYearOfCompletion !== undefined) {
        body.pgMedicalDegreeYearOfCompletion = toStr(state.pgMedicalDegreeYearOfCompletion, '');
      }
      // Only add clinicData if it has at least one non-empty value
      if (state.clinicData && Object.values(state.clinicData).some(v => v !== '' && v !== null && v !== undefined)) {
        body.clinicData = {};
        Object.entries(state.clinicData).forEach(([k, v]) => {
          if (v !== '' && v !== null && v !== undefined) {
            body.clinicData[k] = v;
          }
        });
        // Always include MFA fields as true (disabled in UI)
        body.clinicData.emailVerification = true;
        body.clinicData.smsVerification = true;
        // Coerce numeric fields in clinicData
        if (body.clinicData.latitude !== undefined) {
          const nlat = Number(state.clinicData.latitude);
          if (Number.isFinite(nlat)) body.clinicData.latitude = nlat;
        }
        if (body.clinicData.longitude !== undefined) {
          const nlon = Number(state.clinicData.longitude);
          if (Number.isFinite(nlon)) body.clinicData.longitude = nlon;
        }
      }
      // Only add documents if array is not empty
      if (Array.isArray(state.documents) && state.documents.length > 0) {
        body.documents = state.documents.filter(doc => doc && doc.url);
      }
      // Replace with your axios instance
  const res = await axiosInstance.post('/doctors/create', body);
  if (!res || res.status !== 200) {
        const e = new Error('ERR_SUBMIT_FAILED');
        e.code = 'ERR_SUBMIT_FAILED';
        throw e;
      }
  set({ loading: false, success: true });
  return true;
    } catch (error) {
      // Prefer standardized error codes, but fallback to message
      const msg = error.code || error.message || 'ERR_SUBMIT_FAILED';
      set({ loading: false, error: msg, success: false });
      return false;
    }
  },
}));

export default useDoctorRegistrationStore;
