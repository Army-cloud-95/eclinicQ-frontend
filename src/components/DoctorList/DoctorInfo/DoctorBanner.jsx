import { ChevronDown, Hospital, LucideVerified, MoreHorizontal } from 'lucide-react';
import React from 'react';
import AvatarCircle from '../../AvatarCircle';

const DoctorBanner = ({ doctor }) => {
  const isActive = (doctor?.status || '').toLowerCase() === 'active'
  return (
    <div className="w-full p-4 flex items-center gap-4 bg-white">
      {/* Profile Circle with tick using reusable AvatarCircle */}
      <div className="relative">
        <AvatarCircle name={doctor?.name || 'Doctor'} color="blue" className="w-[100px] h-[100px] text-[47px]" />
        <img src="/tick.png" alt="Verified" className="absolute -top-0 -right-0 w-[30px] h-[30px]" />
      </div>

      {/* Doctor Info */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-[#424242] font-semibold text-[20px]">
            {doctor?.name || 'Doctor'}
          </span>
      <div className={`px-[6px] py-[2px] rounded-sm ${isActive ? 'bg-[#F2FFF3]' : 'bg-[#FFF8F2]'}`}>
            <span className={`font-normal text-sm ${isActive ? 'text-[#3EAF3F]' : 'text-[#F59E0B]'}`}>{isActive ? 'Active' : 'Inactive'}</span>
          </div>
          <div className="bg-[#F9F9F9] flex items-center px-[6px] py-[2px] gap-1 rounded-sm">
            <Hospital className="w-3 h-3" />
            <span className="text-[#424242] text-sm font-normal">
        {doctor?.clinicHospitalName || 'Sunrise Family Clinic'}
            </span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex gap-1 items-center">
            <LucideVerified className="w-4 h-4" />
            <span className="text-sm text-[#424242]">
              {doctor?.designation || 'MBBS, MD - General Medicine'}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <LucideVerified className="w-4 h-4" />
            <span className="text-sm text-[#424242]">{doctor?.specialization || 'General Physician'}</span>
          </div>
          <div className="flex gap-1 items-center">
            <LucideVerified className="w-4 h-4" />
            <span className="text-sm text-[#424242]">{doctor?.exp || 'Experience details'}</span>
          </div>
        </div>
      </div>

  {/* Info Boxes + menu */}
  <div className="flex items-start gap-3">
  <div className="w-[120px] h-[100px] border-dashed border border-[#D6D6D6] rounded-sm flex flex-col justify-between items-center p-2 text-center">
          <span className="text-[#626060] text-sm">No. of Patient Managed</span>
          <span className="font-semibold text-[#2372EC] text-sm">1,000</span>
        </div>
        <div className="w-[120px] h-[100px] border-dashed border border-[#D6D6D6] rounded-sm flex flex-col justify-between items-center p-2 text-center">
          <span className="text-[#626060] text-sm">No. of Appointments Booked</span>
          <span className="font-semibold text-[#2372EC] text-sm">1,000</span>
        </div>
        <div className="w-[120px] h-[100px] border-dashed border border-[#D6D6D6] rounded-sm flex flex-col justify-between items-center p-2 text-center">
            <span className="text-[#626060] text-sm">Active Package</span>
          <span className="font-semibold text-green-600 text-sm">{doctor?.activePackage || '-'}</span>
        </div>
        <div className="w-[120px] h-[100px] border border-dashed border-[#D6D6D6] rounded-sm flex flex-col justify-between items-center p-2 text-center">
          <span className="text-[#626060] text-sm">eClinic-Q ID</span>
          <span className="font-semibold text-[#2372EC] text-sm break-all">{doctor?.id || '-'}</span>
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 ml-1" aria-label="More options">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DoctorBanner;
