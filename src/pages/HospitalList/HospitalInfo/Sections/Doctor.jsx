import React from 'react'
import Header from '../../../../components/DoctorList/Header'
import Table from '../../../../components/DoctorList/Table'

const Doctor = () => {
  return (
    <div className="pb-2">
      <div className="mt-2">
        {/* Reuse the Doctors page header for parity */}
        <Header />

        {/* Table container styled same as sidebar Doctors page */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden m-3">
          <Table />
        </div>
      </div>
    </div>
  )
}

export default Doctor
