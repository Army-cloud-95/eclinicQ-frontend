import React from "react";
import {
  Input,
  Dropdown,
  Upload,
  Radio,
  FormContainer,
  FormSection,
  FormFieldRow
} from '../../components/FormItems';
import useDoctorRegistrationStore from '../../store/useDoctorRegistrationStore';

const Step2 = () => {
  const {
    specialization,
    experienceYears,
    medicalCouncilName,
    medicalCouncilRegYear,
    medicalCouncilRegNo,
    medicalDegreeType,
    medicalDegreeUniversityName,
    medicalDegreeYearOfCompletion,
    pgMedicalDegreeType,
    pgMedicalDegreeUniversityName,
    pgMedicalDegreeYearOfCompletion,
    setField,
    documents,
    setDocument
  } = useDoctorRegistrationStore();

  // Common form field props
  const commonFieldProps = {
    compulsory: true,
    required: true
  };

  // Council options
  const councilOptions = [
    { value: "Maharashtra Medical Council", label: "Maharashtra Medical Council" },
    { value: "Delhi Medical Council", label: "Delhi Medical Council" }
  ];

  // Post graduate degree options
  const pgDegreeOptions = [
    { value: "MD", label: "MD" },
    { value: "MS", label: "MS" },
    { value: "DM", label: "DM" },
    { value: "MCh", label: "MCh" },
    { value: "DNB", label: "DNB" }
  ];

  return (
    <FormContainer>
      <FormSection
        title="Professional Details"
        subtitle="Provide your Professional details and Document for verification"
      >
        <div className="space-y-6">
          {/* Medical Registration */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Medical Registration
            </h2>
            <FormFieldRow>
              <Input
                label="Medical Council Registration Number"
                name="medicalCouncilRegNo"
                value={medicalCouncilRegNo}
                onChange={e => setField('medicalCouncilRegNo', e.target.value)}
                {...commonFieldProps}
              />
              <Dropdown
                label="Registration Council"
                name="medicalCouncilName"
                value={medicalCouncilName}
                onChange={e => setField('medicalCouncilName', e.target.value)}
                options={councilOptions}
                placeholder="Select Council"
                {...commonFieldProps}
              />
            </FormFieldRow>

            <FormFieldRow>
              <div>
                <Input
                  label="Registration Year"
                  name="medicalCouncilRegYear"
                  value={medicalCouncilRegYear}
                  onChange={e => setField('medicalCouncilRegYear', e.target.value)}
                  {...commonFieldProps}
                />
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>
              <Upload
                label="Upload MRN Proof"
                compulsory={true}
                onUpload={key => setDocument({ no: 1, type: 'medical_license', url: key })}
              />
            </FormFieldRow>
          </div>

          {/* Qualifications */}
          <div className="space-y-4 mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Qualifications</h2>

            {/* Graduation */}
            <FormFieldRow>
              <Input
                label="Graduation"
                name="medicalDegreeType"
                value={medicalDegreeType}
                onChange={e => setField('medicalDegreeType', e.target.value)}
                placeholder="e.g. MBBS"
                {...commonFieldProps}
              />
              <Input
                label="College/ University"
                name="medicalDegreeUniversityName"
                value={medicalDegreeUniversityName}
                onChange={e => setField('medicalDegreeUniversityName', e.target.value)}
                {...commonFieldProps}
              />
            </FormFieldRow>

            <FormFieldRow>
              <Input
                label="Year of Completion"
                name="medicalDegreeYearOfCompletion"
                value={medicalDegreeYearOfCompletion}
                onChange={e => setField('medicalDegreeYearOfCompletion', e.target.value)}
                {...commonFieldProps}
              />
              <Upload
                label="Upload Degree Proof"
                compulsory={true}
                onUpload={key => setDocument({ no: 2, type: 'degree_certificate', url: key })}
              />
            </FormFieldRow>

            {/* Post Graduation Radio */}
            <div className="space-y-4">
              <Radio
                label="Have Post Graduate Degree?"
                name="hasPG"
                value={pgMedicalDegreeType ? 'yes' : 'no'}
                onChange={e => setField('pgMedicalDegreeType', e.target.value === 'yes' ? '' : null)}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" }
                ]}
              />

              {/* Conditional Post Graduation Fields */}
              {pgMedicalDegreeType && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <Dropdown
                      label="Post Graduate Degree"
                      name="pgMedicalDegreeType"
                      value={pgMedicalDegreeType}
                      onChange={e => setField('pgMedicalDegreeType', e.target.value)}
                      options={pgDegreeOptions}
                      placeholder="Select Degree"
                    />
                    <Input
                      label="Year of Completion"
                      name="pgMedicalDegreeYearOfCompletion"
                      value={pgMedicalDegreeYearOfCompletion}
                      onChange={e => setField('pgMedicalDegreeYearOfCompletion', e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <Input
                      label="College/ University"
                      name="pgMedicalDegreeUniversityName"
                      value={pgMedicalDegreeUniversityName}
                      onChange={e => setField('pgMedicalDegreeUniversityName', e.target.value)}
                      placeholder="Search or Enter College"
                    />
                    <Upload
                      label="Upload Degree Proof"
                      compulsory={false}
                      onUpload={key => setDocument({ no: 3, type: 'specialization_certificate', url: key })}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='border mb'></div>

          {/* Practice Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Practice Details
            </h2>
            <FormFieldRow>
              <Input
                label="Specialization"
                name="specialization"
                value={specialization}
                onChange={e => setField('specialization', e.target.value)}
                placeholder="Select Degree Type"
              />
              <Input
                label="Year of Experience"
                name="experienceYears"
                value={experienceYears}
                onChange={e => setField('experienceYears', e.target.value)}
                placeholder="Enter Year"
              />
            </FormFieldRow>
          </div>
        </div>
  {/* Navigation handled by parent, no submit button here */}
      </FormSection>
    </FormContainer>
  );
};

export default Step2;
