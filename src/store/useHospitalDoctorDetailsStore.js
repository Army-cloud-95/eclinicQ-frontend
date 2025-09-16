import { create } from 'zustand';
import axiosInstance from '../lib/axios';

const initialState = {
  userId: '',
  specialization: '', // string or { name, value }
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
  hasClinic: false,
  documents: [], // [{ no, type, url }]
  additionalPractices: [], // [{ specialization: {name, value} | string, experienceYears: '' }]
  loading: false,
  error: null,
  success: false,
};

const useHospitalDoctorDetailsStore = create((set, get) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  addPractice: () => set((state) => ({
    ...state,
    additionalPractices: [...state.additionalPractices, { specialization: null, experienceYears: '' }],
  })),
  updatePractice: (index, patch) => set((state) => ({
    ...state,
    additionalPractices: state.additionalPractices.map((p, i) => (i === index ? { ...p, ...patch } : p)),
  })),
  removePractice: (index) => set((state) => ({
    ...state,
    additionalPractices: state.additionalPractices.filter((_, i) => i !== index),
  })),
  setDocument: (doc) => set((state) => ({
    ...state,
    documents: [...state.documents.filter((d) => d.no !== doc.no), doc],
  })),
  setDocuments: (docs) => set({ documents: docs }),
  reset: () => set(initialState),
  submit: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const state = get();
      const userId = state.userId;
      if (!userId) {
        const e = new Error('ERR_MISSING_USER_ID');
        e.code = 'ERR_MISSING_USER_ID';
        throw e;
      }

      const mainSpecObj = typeof state.specialization === 'object'
        ? state.specialization
        : (state.specialization ? { name: state.specialization, value: state.specialization } : null);
      if (!mainSpecObj || !(mainSpecObj.value || mainSpecObj.name)) {
        const e = new Error('ERR_MISSING_SPECIALIZATION');
        e.code = 'ERR_MISSING_SPECIALIZATION';
        throw e;
      }

      const toStr = (v, fallback = '') => (v !== undefined && v !== null && v !== '' ? String(v) : fallback);
      const toExpYearsStr = (v, fallback = '0') => {
        const s = v !== undefined && v !== null ? String(v).trim() : '';
        if (!s) return fallback;
        const n = Number.parseInt(s, 10);
        return Number.isFinite(n) ? String(n) : fallback;
      };

      const specializationArr = [];
      const primaryName = (mainSpecObj.name || mainSpecObj.value)?.toString().trim();
      if (primaryName) specializationArr.push({ name: primaryName, expYears: toExpYearsStr(state.experienceYears, '0') });
      if (Array.isArray(state.additionalPractices)) {
        state.additionalPractices.forEach((p) => {
          const spec = p?.specialization;
          const nmRaw = typeof spec === 'object' ? (spec?.name || spec?.value) : spec;
          const nm = nmRaw?.toString().trim();
          if (nm) specializationArr.push({ name: nm, expYears: toExpYearsStr(p?.experienceYears, '0') });
        });
      }

      const documents = Array.isArray(state.documents)
        ? state.documents.filter((d) => d && d.url && d.type && (d.no !== undefined && d.no !== null))
        : [];

      const body = {
        userId: String(userId),
        specialization: specializationArr,
        medicalCouncilName: state.medicalCouncilName,
        medicalCouncilRegYear: toStr(state.medicalCouncilRegYear, ''),
        medicalCouncilRegNo: state.medicalCouncilRegNo,
        medicalDegreeType: state.medicalDegreeType,
        medicalDegreeUniversityName: state.medicalDegreeUniversityName,
        medicalDegreeYearOfCompletion: toStr(state.medicalDegreeYearOfCompletion, ''),
        pgMedicalDegreeType: state.pgMedicalDegreeType,
        pgMedicalDegreeUniversityName: state.pgMedicalDegreeUniversityName,
        pgMedicalDegreeYearOfCompletion: toStr(state.pgMedicalDegreeYearOfCompletion, ''),
        hasClinic: false,
        ...(documents.length > 0 ? { documents } : {}),
      };

      const res = await axiosInstance.post('/doctors/create', body);
      if (!res || res.status !== 200) {
        const e = new Error('ERR_SUBMIT_FAILED');
        e.code = 'ERR_SUBMIT_FAILED';
        throw e;
      }
      set({ loading: false, success: true });
      return true;
    } catch (error) {
      const msg = error.code || error.message || 'ERR_SUBMIT_FAILED';
      set({ loading: false, error: msg, success: false });
      return false;
    }
  },
}));

export default useHospitalDoctorDetailsStore;
