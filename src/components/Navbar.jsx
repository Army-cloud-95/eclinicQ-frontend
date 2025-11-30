import { ChevronDown } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bell, stethoscopeBlue, hospitalIcon } from '../../public/index.js'

const Partition = () => {
  return (
    <div className='w-[8.5px] h-[20px] flex gap-[10px] items-center justify-center'>
        <div className='w-[0.5px] h-full bg-[#B8B8B8]'>
        </div>
    </div>
  )
}

const AddNewDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleAddDoctor = () => {
    navigate('/register/doctor');
    onClose();
  };

  const handleAddHospital = () => {
    navigate('/register/hospital');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-1 w-[190px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden p-2 z-[60]">
      <div className="flex flex-col gap-1  ">
        <button
          onClick={handleAddDoctor}
          className=" rounded-md flex items-center gap-2 hover:bg-gray-50 h-8 transition-colors"
        >
          <div className="w-4 h-4 ml-1 flex items-center justify-center">
            <img src={stethoscopeBlue} alt="Add Doctor" />
          </div>
          <span className="text-[#424242] font-normal text-sm">Add Doctor</span>
        </button>
        
        <button
          onClick={handleAddHospital}
          className="w-full rounded-md flex items-center gap-2 hover:bg-gray-50 h-8 transition-colors"
        >
          <div className="w-4 h-4 flex items-center justify-center ml-1">
            <img src={hospitalIcon} alt="Add Hospital" />
          </div>
          <span className="text-[#424242] font-normal text-sm">Add Hospital</span>
        </button>
      </div>
    </div>
  );
};

const notifications = [
  {
    type: 'new',
    icon: 'green',
    text: 'All tokens for today’s session scheduled at 10:00AM - 12:00PM have been completed.',
    time: '3 min ago',
  },
  {
    type: 'new',
    icon: 'green',
    text: 'Queue started. First patient is ready for consultation.',
    time: '3 min ago',
  },
  {
    type: 'new',
    icon: 'red',
    text: 'You have not started the consultation yet. For the session scheduled at 10:00AM. Please ensure availability.',
    time: '3 min ago',
  },
  {
    type: 'new',
    icon: 'blue',
    text: 'It’s time for your session! You can now start seeing patients.',
    time: '3 min ago',
  },
  {
    type: 'new',
    icon: 'blue',
    text: 'Your OPD Session is Scheduled to Begin at 10:00 AM. Please ensure availability.',
    time: '3 min ago',
  },
];
const olderNotifications = [
  {
    type: 'old',
    icon: 'gray',
    text: 'Your consultation with Dr. Milind Chauhan is Completed',
    time: '3 min ago',
  },
  {
    type: 'old',
    icon: 'gray',
    text: 'Your consultation with Dr. Milind Chauhan is Completed',
    time: '3 min ago',
  },
];

const NotificationDrawer = ({ show, onClose }) => (
  <>
    {/* Overlay */}
    <div
      className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    />
    {/* Drawer */}
    <div
      className={`fixed z-50 transition-transform duration-500`}
      style={{
        top: 32,
        right: 32,
        width: 476,
        height: 964,
        background: 'white',
        borderRadius: 12,
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        zIndex: 50,
        transform: show ? 'translateX(0)' : 'translateX(520px)',
        transition: 'transform 0.5s',
      }}
    >
      <div className="px-7 py-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-semibold">Notifications</h2>
          <div className="flex items-center gap-4">
            {/* Three-dot icon */}
            <button className="text-gray-400 hover:text-gray-600" style={{padding:0,background:'none',border:'none'}} aria-label="Options">
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><circle cx="4" cy="10" r="1.5" fill="#A0AEC0"/><circle cx="10" cy="10" r="1.5" fill="#A0AEC0"/><circle cx="16" cy="10" r="1.5" fill="#A0AEC0"/></svg>
            </button>
            <button className="text-xs text-blue-600 font-medium">Mark all as Read</button>
            <button className="text-gray-500 hover:text-gray-700" onClick={onClose} aria-label="Close" style={{padding:0,background:'none',border:'none'}}>
              <span style={{fontSize:24,marginLeft:'2px'}}>&times;</span>
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-6 mb-5">
          <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-1">All</button>
          <button className="text-sm font-medium text-gray-400 pb-1">Unread</button>
        </div>
        {/* New Notifications */}
        <div className="mb-2">
          <div className="text-xs text-gray-500 mb-2">New</div>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {notifications.map((n, idx) => (
              <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-100">
                <span className={`w-7 h-7 flex items-center justify-center rounded-full ${n.icon==='green'?'bg-green-100 text-green-600':n.icon==='red'?'bg-red-100 text-red-600':'bg-blue-100 text-blue-600'}`}>
                  {/* Icon: use emoji for now */}
                  {n.icon==='green'?<span>&#x2714;</span>:n.icon==='red'?<span>&#x25CF;</span>:<span>&#x25CF;</span>}
                </span>
                <div className="flex-1">
                  <div className="text-[15px] text-gray-800 leading-snug">{n.text}</div>
                  <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-red-500" />
              </div>
            ))}
          </div>
        </div>
        {/* Older Notifications */}
        <div className="mt-2">
          <div className="text-xs text-gray-500 mb-2">Older</div>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {olderNotifications.map((n, idx) => (
              <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-100">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <span>&#x2714;</span>
                </span>
                <div className="flex-1">
                  <div className="text-[15px] text-gray-800 leading-snug">{n.text}</div>
                  <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className='w-full h-12 border-b-[0.5px]  border-[#D6D6D6] flex items-center px-4 justify-between'>
        <div>
          <span className='text-sm text=[#424242]'>Doctors</span>
        </div>
        <div className='flex gap-2 items-center'>
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleDropdown}
              className='flex items-center bg-[#2372EC] p-2 h-8 min-w-8 rounded-[4px] gap-2 hover:bg-blue-600 transition-colors' 
            >
                <span className='text-white text-sm font-medium'>Add New</span>
                <div className='flex border-l border-blue-400 pl-1'>
                    <ChevronDown className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}/>
                </div>
            </button>
            <AddNewDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
          </div>
          <Partition/>
          <div className="w-7 h-7 p-1 relative">
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 flex items-center justify-center rounded-full w-[14px] h-[14px] bg-[#F04248]">
              <span className="font-medium text-[10px] text-white">8</span>
            </div>
            {/* Bell icon */}
            <button onClick={() => setShowNotifications(true)} style={{background:'none',border:'none',padding:0}}>
              <img src={bell} alt="Notifications" className="w-5 h-5" />
            </button>
          </div>
          <Partition/>
          <div className='flex items-center gap-2'>
            <span className='font-semibold text-base text-[#424242]'>Super Admin</span>
            <div className='flex justify-center rounded-full border-[0.5px] border-[#D6D6D6] bg-[#F9F9F9] w-8 h-8 items-center'>
                <span className='text-sm font-normal text-[#424242]'>S</span>
            </div>
          </div>
        </div>
      </div>
      <NotificationDrawer show={showNotifications} onClose={() => setShowNotifications(false)} />
    </>
  )
}

export default Navbar
