import React, { useState } from 'react'

const PasswordInput = ({ label, placeholder, value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[14px] text-gray-700 font-medium">{label}</label>
    <div className="relative">
      <input type="password" value={value} onChange={onChange} placeholder={placeholder} className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all" />
    </div>
  </div>
)

export default function HSecurity() {
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-[16px] font-semibold text-gray-900">Change Password</h3>
        <p className="text-[13px] text-gray-500 mt-0.5">Ensure your account is using a long, random password to stay secure.</p>
      </div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <PasswordInput label="Current Password" placeholder="Enter current password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />
          <PasswordInput label="New Password" placeholder="Enter new password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
          <PasswordInput label="Confirm New Password" placeholder="Retype new password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
          <div className="pt-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium h-10 px-6 rounded-lg transition-colors shadow-sm">
              Change Password
            </button>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 h-fit">
          <h4 className="text-[14px] font-semibold text-gray-800 mb-3">Password Requirements</h4>
          <ul className="space-y-2.5">
            {[
              "Minimum 8 characters long - the more, the better",
              "At least one lowercase character",
              "At least one uppercase character",
              "At least one number, symbol, or whitespace character"
            ].map((req, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
