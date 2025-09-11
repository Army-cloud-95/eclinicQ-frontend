import React from 'react'
import { 
  Input, 
  Dropdown, 
  Upload, 
  FormContainer, 
  FormSection, 
  FormFieldRow,
  MapLocation
} from '../../components/FormItems';
import useDoctorRegistrationStore from '../../store/useDoctorRegistrationStore';

const Step3 = () => {
  const {
    clinicData,
    setClinicField,
    setField
  } = useDoctorRegistrationStore();

  // Common form field props
  const commonFieldProps = {
    compulsory: true,
    required: true
  };

  // City options
  const cityOptions = [
    { value: "Akola", label: "Akola" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Chennai", label: "Chennai" }
  ];

  // State options
  const stateOptions = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Delhi", label: "Delhi" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Gujarat", label: "Gujarat" }
  ];

  return (
    <FormContainer>
      <FormSection
        title="Clinical Details & Document Upload"
        subtitle="Enter your clinic information & document"
      >
        <div className="space-y-6">
          {/* Clinic Info Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Clinic Info</h2>
            {/* Clinic Name and Contact Email Row */}
            <FormFieldRow>
              <Input
                label="Clinic Name"
                name="name"
                value={clinicData.name}
                onChange={e => setClinicField('name', e.target.value)}
                placeholder="Enter Clinic Name"
                {...commonFieldProps}
              />
              <Input
                label="Clinic Contact Email"
                name="email"
                type="email"
                value={clinicData.email}
                onChange={e => setClinicField('email', e.target.value)}
                placeholder="Enter Clinic Email"
                {...commonFieldProps}
              />
            </FormFieldRow>

            {/* Contact Number and Upload Establishment Proof Row */}
            <FormFieldRow>
              <Input
                label="Clinic Contact Number"
                name="phone"
                type="tel"
                value={clinicData.phone}
                onChange={e => setClinicField('phone', e.target.value)}
                placeholder="Enter Contact Number"
                {...commonFieldProps}
              />
              <Upload
                label="Upload Establishment Proof"
                compulsory={true}
                onUpload={key => setClinicField('proof', key)}
              />
            </FormFieldRow>
          </div>

          <div className="border border-b mt-1"></div>

          {/* Clinic Address Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Clinic Address</h2>
            {/* Map Location */}
            <div className='flex flex-col gap-2'>
              <label className="block text-sm font-medium text-gray-700">
                Map Location <span className="text-red-500">*</span>
              </label>
              <MapLocation 
                heightClass="h-32" 
                onChange={({ lat, lng }) => {
                  setClinicField('latitude', lat);
                  setClinicField('longitude', lng);
                }}
              />
            </div>

            {/* Block No and Road/Area/Street Row */}
            <FormFieldRow>
              <Input
                label="Block No./Shop no./House no."
                name="blockNo"
                value={clinicData.blockNo}
                onChange={e => setClinicField('blockNo', e.target.value)}
                {...commonFieldProps}
              />
              <Input
                label="Road/Area/Street"
                name="areaStreet"
                value={clinicData.areaStreet}
                onChange={e => setClinicField('areaStreet', e.target.value)}
                {...commonFieldProps}
              />
            </FormFieldRow>

            {/* Landmark and Pincode Row */}
            <FormFieldRow>
              <Input
                label="Landmark"
                name="landmark"
                value={clinicData.landmark}
                onChange={e => setClinicField('landmark', e.target.value)}
                {...commonFieldProps}
              />
              <Input
                label="Pincode"
                name="pincode"
                value={clinicData.pincode}
                onChange={e => setClinicField('pincode', e.target.value)}
                {...commonFieldProps}
              />
            </FormFieldRow>

            {/* City and State Row */}
            <FormFieldRow>
              <Dropdown
                label="City"
                name="city"
                value={clinicData.city}
                onChange={e => setClinicField('city', e.target.value)}
                options={cityOptions}
                placeholder="Select City"
                {...commonFieldProps}
              />
              <Dropdown
                label="State"
                name="state"
                value={clinicData.state}
                onChange={e => setClinicField('state', e.target.value)}
                options={stateOptions}
                placeholder="Select State"
                {...commonFieldProps}
              />
            </FormFieldRow>
          </div>

          <div className="border border-b mt-1"></div>

          {/* Document Upload Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Document Upload</h2>
            {/* Upload Hospital Image */}
            <div>
              <Upload
                label="Upload Hospital Image"
                compulsory={true}
                onUpload={key => setClinicField('image', key)}
              />
            </div>
          </div>

          {/* Multi-Factor Authentication */}
          <div className="border border-blue-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Multi-Factor Authentication (MFA) <span className="text-red-500">*</span>
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              For enhanced security, we require setting up MFA for all admin accounts
            </p>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="emailVerification"
                  checked={clinicData.emailVerification}
                  onChange={e => setClinicField('emailVerification', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Email Verification</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="smsVerification"
                  checked={clinicData.smsVerification}
                  onChange={e => setClinicField('smsVerification', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">SMS Verification</span>
              </label>
            </div>
          </div>
        </div>
  {/* Navigation handled by parent, no submit button here */}
      </FormSection>
    </FormContainer>
  );
}


export default Step3