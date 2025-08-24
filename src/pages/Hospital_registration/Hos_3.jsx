import React from "react";
import { Info } from "lucide-react";

const Hos_3 = () => {
  return (
    <div className="w-full bg-white rounded-xl">
    <div className=" max-w-5xl mx-auto bg-white p-6 ">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-center mb-2">
        Documents Verification
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Provide your Document Numbers and Upload Supporting Document for
        verification
      </p>

      {/* Warning Banner */}
      <div className="bg-orange-50 border border-orange-200 text-orange-700 p-4 rounded-lg mb-6 flex items-start gap-2">
        <Info className="w-5 h-5 mt-0.5" />
        <p className="text-sm">
          <span className="font-semibold">Automated Verification ID</span>
          <br />
          We’ll instantly verify the following IDs through their respective
          APIs. At least one verified ID is required to proceed.
        </p>
      </div>

      {/* GSTIN & ABHA Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* GSTIN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GSTIN <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter 15-digit GSTIN"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-gray-100 border rounded-lg text-sm font-medium hover:bg-gray-200">
              Verify
            </button>
          </div>
          <div className="mt-3 border rounded-lg p-3 text-sm text-gray-600 bg-gray-50">
            <p className="font-medium mb-1">Fetched Details from GSTIN</p>
            <p>Legal Business Name :</p>
            <p>Registered Address :</p>
            <p>Status :</p>
          </div>
          <button className="mt-3 w-full text-left text-blue-600 text-sm font-medium border border-dashed border-blue-400 rounded-lg px-4 py-2 hover:bg-blue-50">
            Upload File
          </button>
        </div>

        {/* ABHA */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ABHA Facility ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Abha ID"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-gray-100 border rounded-lg text-sm font-medium hover:bg-gray-200">
              Verify
            </button>
          </div>
          <div className="mt-3 border rounded-lg p-3 text-sm text-gray-600 bg-gray-50">
            <p className="font-medium mb-1">Fetched Details from ABHA</p>
            <p>Legal Business Name :</p>
            <p>Registered Address :</p>
            <p>Status :</p>
          </div>
          <button className="mt-3 w-full text-left text-blue-600 text-sm font-medium border border-dashed border-blue-400 rounded-lg px-4 py-2 hover:bg-blue-50">
            Upload File
          </button>
        </div>
      </div>

      {/* CIN Question */}
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Do you have CIN (Corporate Hospital Registration Number)?
        </p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="cin" className="accent-blue-500" />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="cin" className="accent-blue-500" />
            <span>No</span>
          </label>
        </div>
      </div>

      <hr className="mb-8" />

      {/* Other Documents */}
      <div className="space-y-6">
        {[
          {
            label: "State Health Registration Number",
            required: true,
            placeholder: "Enter State Registration Number",
          },
          {
            label: "PAN Card of Hospital",
            required: true,
            placeholder: "Enter State Registration Number",
          },
          {
            label: "Rohini ID",
            placeholder: "Enter 13-digit Rohini ID",
          },
          {
            label: "NABH Accreditation",
            placeholder: "Enter NABH Accreditation ID",
          },
        ].map((field, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                placeholder={field.placeholder}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload Supporting Document of Size 4MB in .pdf format
              </p>
            </div>
            <div className="flex items-center ">
              <button className="w-full text-left text-blue-600 text-sm font-medium border border-dashed border-blue-400 rounded-lg px-4 py-2 hover:bg-blue-50">
                Upload File
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Hos_3;
