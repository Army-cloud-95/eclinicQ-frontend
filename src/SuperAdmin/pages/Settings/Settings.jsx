import React, { useState } from 'react'
import InputWithMeta from '../../../components/GeneralDrawer/InputWithMeta'
import PasswordRequirements from '../../../components/FormItems/PasswordRequirements'

const Settings = () => {
  const [mobile, setMobile] = useState('+919175367487')
  const [email, setEmail] = useState('ketanpatni02@gmail.com')
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')

  return (
    <div className="p-4 ">
      <div className="max-w-[382px] flex flex-col gap-3.5">
        {/* Mobile number */}
        <div className='flex flex-col gap-1'>
            <label className={`text-sm text-secondary-grey150 flex items-center gap-1`}>
          Mobile Number
        
            <div className="bg-red-500 w-1 h-1 rounded-full"></div>
        
        </label>
          <div className="flex bg-white items-center gap-2 border border-border-gray-300 rounded-sm pr-1">
            <input
              value={mobile}
              disabled
              onChange={(e) => setMobile(e.target.value)}
              className="flex-1 h-8 px-2 text-sm outline-none text-secondary-grey300"
            />
            <button
              type="button"
              className="h-6 px-[6px] rounded-sm border border-blue-primary150 bg-blue-primary100 hover:bg-blue-primary250 hover:border-blue-primary250 hover:text-white text-blue-primary250 text-[12px] font-medium transition-colors"
            >
              Change
            </button>
          </div>
        </div>
        
        

        {/* Email ID */}
        <div className='flex flex-col gap-1'>
            <label className={`text-sm text-secondary-grey150 flex items-center gap-1`}>
          Email ID
        
            <div className="bg-red-500 w-1 h-1 rounded-full"></div>
        
        </label>
          <div className="flex bg-white items-center gap-2 border border-border-gray-300 rounded-sm pr-1">
            <input
              type="email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-8 px-2 text-sm outline-none text-secondary-grey300"
            />
            <button
              type="button"
              className="h-6 px-[6px] rounded-sm border border-blue-primary150 bg-blue-primary100 hover:bg-blue-primary250 hover:border-blue-primary250 hover:text-white text-blue-primary250 text-[12px] font-medium transition-colors"
            >
              Change
            </button>
          </div>
        </div>

        {/* Passwords */}
        <InputWithMeta
          label="Enter Current Password"
          requiredDot
          type="password"
          placeholder="Enter Password"
          value={currentPwd}
          onChange={setCurrentPwd}
        />

        <InputWithMeta
          label="New Password"
          requiredDot
          type="password"
          placeholder="Enter Password"
          value={newPwd}
          onChange={setNewPwd}
        />

        <InputWithMeta
          label="Confirm Password"
          requiredDot
          type="password"
          placeholder="Enter Password"
          value={confirmPwd}
          onChange={setConfirmPwd}
        />

        {/* Actions */}
        <div className="flex items-center">
          <button
            className={`h-8 px-4 rounded-sm text-sm font-medium bg-blue-primary250 text-white hover:bg-blue-600 transition-colors shadow-sm`}
          >
            Send OTP and Verify
          </button>

        </div>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-sm text-blue-primary250 hover:bg-blue-primary50  w-fit inline-flex items-center"
        >
          Forgot Password <span className="ml-[10px] text-[20px]">›</span>
        </a>

        {/* Requirements */}
        <div className="">
          <PasswordRequirements password={newPwd} />
        </div>
      </div>
    </div>
  )
}

export default Settings
