import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout_sidebar";
import Dashboard from "./SuperAdmin/pages/Dashboard/Dashboard";
import Doctor from "./SuperAdmin/pages/Doctors/Doctor";
import Hospitals from "./SuperAdmin/pages/Hospitals/Hospitals";
import Patients from "./SuperAdmin/pages/Patients/Patients";
import Settings from "./SuperAdmin/pages/Settings/Settings";
import Layout_registration_new from "./components/Layouts/Layout_registration_new";
import MainPage from "./SuperAdmin/pages/Doctors/DoctorList/DoctorInfo/MainPage";
import DoctorDetailsPage from "./SuperAdmin/pages/Doctors/DoctorList/DoctorInfo/DoctorDetailsPage";
import MainPageHos from "./SuperAdmin/pages/Hospitals/HospitalList/HospitalInfo/MainPageHos";
import HospitalDetailsPage from "./SuperAdmin/pages/Hospitals/HospitalList/HospitalInfo/HospitalDetailsPage";
import { RegistrationProvider } from "./context/RegistrationContext";
import DummyLogin from "./pages/DummyLogin";
import GetStarted from "./pages/GetStarted";
import OnboardingFlow from "./DoctorModule/Pages/Login/OnboardingFlow";
import Doctor_layout from "./DoctorModule/Components/Layout/DoctorLayout";
import DocDashboard from "./DoctorModule/Pages/Dashboard/DocDashboard";
import Queue from "./DoctorModule/Pages/Queue/Queue";
import PatientListPage from "./pages/PatientList";
import Patient from "./DoctorModule/Pages/Patient/Patient";
import DocPatients from "./DoctorModule/Pages/Patients/Patient";
import PatientDetails from "./DoctorModule/Pages/Patients/PatientDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DummyLogin/>} />

      {/* Admin panel routes */}
      <Route element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doctor" element={<Doctor />} />
  <Route path="doctor/:id" element={<DoctorDetailsPage />} />
        <Route path="hospital" element={<Hospitals />} />
  <Route path="hospital/:id" element={<HospitalDetailsPage />} />
        <Route path="patients" element={<Patients />} />
        <Route path="settings" element={<Settings />} />
  <Route path="patients-list" element={<PatientListPage />} />

        <Route path="doctor1" element={<MainPage/>} />
        <Route path="hos1" element={<MainPageHos/>} />

        {/* Registration flow with single routes */}
        <Route path="register/doctor" element={
          <RegistrationProvider>
            <Layout_registration_new />
          </RegistrationProvider>
        } />
        <Route path="register/hospital" element={
          <RegistrationProvider>
            <Layout_registration_new />
          </RegistrationProvider>
        } />
      </Route>

  {/* Single onboarding route managing internal steps without URL changes */}
      <Route path="onboarding" element={<OnboardingFlow />} />

      {/* Doctor Portal */}
      <Route path="doc" element={<Doctor_layout />}>
        {/* default doctor dashboard */}
        <Route index element={<DocDashboard />} />
        <Route path="queue" element={<Queue />} />
  <Route path="patients" element={<DocPatients />} />
  <Route path="patients/:id" element={<PatientDetails />} />
        {/* future doctor-specific routes can be nested here, e.g., patients, settings */}
      </Route>

    </Routes>
  );
}

export default App;
