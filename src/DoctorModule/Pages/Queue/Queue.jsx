import React, { useEffect, useMemo, useState } from "react";
import { Clock, Calendar, ChevronLeft, ChevronRight, ChevronDown, Bell } from "lucide-react";
import AvatarCircle from '../../../components/AvatarCircle';
import Button from '../../../components/Button';
import Badge from '../../../components/Badge';
import OverviewStatCard from '../../../components/OverviewStatCard';
import Toggle from '../../../components/FormItems/Toggle';
import QueueTable from './QueueTable';
import { appointement } from "../../../../public/index.js";
const Queue = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTimeSlot] = useState("Morning (10:00 am - 12:30 pm)");
  const [currentDate] = useState("Mon, 03/04/2025");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [queuePaused, setQueuePaused] = useState(false);
  // removed: startCheckups toggle; only one toggle remains (Start Session)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [patientStartedAt, setPatientStartedAt] = useState(null); // ms timestamp
  const [elapsed, setElapsed] = useState(0); // seconds for active patient
  const [removingToken, setRemovingToken] = useState(null);

  // Sample queue data matching the design
  const [queueData, setQueueData] = useState([
    // Updated DOB to match screenshot (age 39Y with DOB 12/05/1985)
    { token: 1,  patientName: "Rahul Sharma",       gender: "M", age: "12/05/1985 (39Y)", appointmentType: "Review Visit",          expectedTime: "10:30 AM", bookingType: "Online", reasonForVisit: "Fever & Weakness",      status: "Check-In" },
    { token: 2,  patientName: "Priya Mehta",        gender: "F", age: "08/09/1962 (61Y)", appointmentType: "Follow-up Consultation", expectedTime: "11:00 AM", bookingType: "Online", reasonForVisit: "Annual Checkup",        status: "Check-In" },
    { token: 3,  patientName: "Arjun Verma",        gender: "M", age: "23/11/1987 (36Y)", appointmentType: "New Consultation",       expectedTime: "11:45 AM", bookingType: "Online", reasonForVisit: "Back Pain",             status: "Check-In" },
    { token: 4,  patientName: "Sneha Deshpande",    gender: "F", age: "14/07/1998 (26Y)", appointmentType: "New Consultation",       expectedTime: "12:30 PM", bookingType: "Walk-In", reasonForVisit: "Skin Allergy",          status: "Check-In" },
    { token: 5,  patientName: "Kunal Joshi",        gender: "M", age: "05/02/1976 (48Y)", appointmentType: "Second Opinion",         expectedTime: "1:30 PM",  bookingType: "Walk-In", reasonForVisit: "High BP",                status: "Check-In" },
    { token: 6,  patientName: "Neha Iyer",          gender: "F", age: "30/10/1995 (28Y)", appointmentType: "New Consultation",       expectedTime: "2:00 PM",  bookingType: "Online", reasonForVisit: "Migraine",               status: "Check-In" },
    { token: 7,  patientName: "Vikas Gupta",        gender: "M", age: "19/04/1983 (41Y)", appointmentType: "Second Opinion",         expectedTime: "2:30 PM",  bookingType: "Walk-In", reasonForVisit: "Diabetes Check",        status: "Check-In" },
    { token: 8,  patientName: "Radhika Nair",       gender: "F", age: "06/01/1991 (33Y)", appointmentType: "Review Visit",          expectedTime: "3:15 PM",  bookingType: "Online", reasonForVisit: "Pregnancy Consultation", status: "Check-In" },
    { token: 9,  patientName: "Ankit Saxena",       gender: "M", age: "11/06/1989 (35Y)", appointmentType: "Review Visit",          expectedTime: "4:15 PM",  bookingType: "Online", reasonForVisit: "Heartburn & Acidity",   status: "Check-In" },
    { token: 10, patientName: "Pooja Kulkarni",     gender: "F", age: "15/08/1993 (30Y)", appointmentType: "Second Opinion",         expectedTime: "4:45 PM",  bookingType: "Online", reasonForVisit: "Thyroid Checkup",        status: "Check-In" },
    { token: 11, patientName: "Manish Choudhary",   gender: "M", age: "12/12/1986 (37Y)", appointmentType: "Follow-up Consultation", expectedTime: "5:45 PM",  bookingType: "Walk-In", reasonForVisit: "Anxiety & Stress",      status: "Check-In" },
    { token: 12, patientName: "Kavita Rao",         gender: "F", age: "20/03/1980 (44Y)", appointmentType: "New Consultation",       expectedTime: "6:15 PM",  bookingType: "Walk-In", reasonForVisit: "Menopause Symptoms",    status: "Check-In" },
    { token: 13, patientName: "Rohan Agarwal",      gender: "M", age: "07/05/1994 (30Y)", appointmentType: "Follow-up Consultation", expectedTime: "10:15 AM", bookingType: "Online", reasonForVisit: "Asthma",                 status: "Check-In" },
    { token: 14, patientName: "Deepika Singh",      gender: "F", age: "09/11/1987 (36Y)", appointmentType: "Review Visit",          expectedTime: "11:00 AM", bookingType: "Walk-In", reasonForVisit: "PCOD Treatment",         status: "Check-In" },
    { token: 15, patientName: "Anirudh Patel",      gender: "M", age: "15/07/1982 (42Y)", appointmentType: "Review Visit",          expectedTime: "12:15 PM", bookingType: "Online", reasonForVisit: "Knee Pain",              status: "Check-In" },
    { token: 16, patientName: "Swati Mishra",       gender: "F", age: "03/09/1990 (33Y)", appointmentType: "Second Opinion",         expectedTime: "12:45 PM", bookingType: "Online", reasonForVisit: "Eye Checkup",             status: "Check-In" },
  ]);

  // Appointment requests data for sidebar
  const appointmentRequests = [
    { name: "Alok Verma",      gender: "M", age: "12/05/1985 (39Y)", date: "Mon, 12 June 2024",     time: "Morning, 10:00 am - 12:30 pm", secondary: "Reschedule" },
    { name: "Bhavna Mehta",    gender: "F", age: "03/15/1980 (44Y)", date: "Tuesday, 13 June 2024", time: "Afternoon, 1:00 pm - 3:30 pm", secondary: "Reschedule" },
    { name: "Chirag Modi",     gender: "M", age: "08/07/1990 (33Y)", date: "Wednesday, 14 June 2024", time: "Evening, 5:00 pm - 6:30 pm", secondary: "Reschedule" },
    { name: "Deepa Malhotra",  gender: "F", age: "11/25/1975 (48Y)", date: "Thursday, 15 June 2024",  time: "Morning, 9:00 am - 11:00 am", secondary: "Cancel" },
    { name: "Eshan Mehra",     gender: "M", age: "05/30/1988 (36Y)", date: "Friday, 16 June 2024",   time: "", secondary: "Reschedule" },
  ];

  const filters = ["In Waiting", "Engaged", "No show", "Admitted", "All"];

  const getFilterCount = (filter) => {
    if (filter === "All") return queueData.length;
    if (filter === "In Waiting") return queueData.filter((p) => p.status === "Check-In").length;
    if (filter === "Engaged") return 0;
    if (filter === "No show") return 0;
    if (filter === "Admitted") return 0;
    return 0;
  };

  // Derive the active patient from currentIndex
  const activePatient = useMemo(() => queueData[currentIndex] || null, [queueData, currentIndex]);

  // Start/stop timer for active patient
  useEffect(() => {
    if (!sessionStarted || queuePaused || !patientStartedAt) return;
    const id = setInterval(() => {
      const now = Date.now();
      setElapsed(Math.max(0, Math.floor((now - patientStartedAt) / 1000)));
    }, 1000);
    return () => clearInterval(id);
  }, [sessionStarted, queuePaused, patientStartedAt]);

  const formatTime = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const handleToggleSession = () => {
    if (sessionStarted) {
      // end session
      setSessionStarted(false);
      setQueuePaused(false);
  // nothing else to reset
      setPatientStartedAt(null);
      setElapsed(0);
    } else {
      // start session at first check-in patient
      const firstIdx = Math.max(0, queueData.findIndex((p) => p.status === 'Check-In'));
      setCurrentIndex(firstIdx === -1 ? 0 : firstIdx);
      setSessionStarted(true);
      setQueuePaused(false);
      setPatientStartedAt(Date.now());
      setElapsed(0);
    }
  };

  const gotoNextPatient = () => {
    const next = currentIndex + 1;
    if (next < queueData.length) {
      setCurrentIndex(next);
      setPatientStartedAt(Date.now());
      setElapsed(0);
    }
  };

  const completeCurrentPatient = () => {
    const ANIM_MS = 300;
    if (!activePatient) return;
    // start slide-out animation for active row
    setRemovingToken(activePatient.token);
    setTimeout(() => {
      setQueueData((prev) => {
        const newArr = prev.filter((_, i) => i !== currentIndex);
        // decide new index (stay at same index to naturally advance to next row)
        const nextIdx = newArr.length === 0 ? 0 : Math.min(currentIndex, newArr.length - 1);
        setCurrentIndex(nextIdx);
        if (newArr.length > 0) {
          setPatientStartedAt(Date.now());
          setElapsed(0);
        } else {
          setPatientStartedAt(null);
          setElapsed(0);
        }
        return newArr;
      });
      setRemovingToken(null);
    }, ANIM_MS);
  };

  const gotoPrevPatient = () => {
    const prev = currentIndex - 1;
    if (prev >= 0) {
      setCurrentIndex(prev);
      setPatientStartedAt(Date.now());
      setElapsed(0);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* Fixed Header Section */}
      <div className="sticky top-0 z-10 bg-white border-b-[0.5px] border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Time Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white rounded-lg shadow-sm">
              <span className="text-gray-700 font-medium">{selectedTimeSlot}</span>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center space-x-4">
            <ChevronLeft className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-medium">Today</span>
              <span className="text-gray-700 font-medium">{currentDate}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>

          {/* Walk-in Appointment Badge */}
          <Badge size="large" type="solid" color="blue" hover className="cursor-pointer select-none">
            Walk-in Appointment
          </Badge>
        </div>
      </div>

      {/* Main Content Area: Overview full-width, then columns */}
      <div className="px-0 pt-0 pb-2 h-[calc(100vh-100px)] flex flex-col overflow-hidden">
        {/* Current Token Banner (session mode) */}
        {sessionStarted && (
          <div className="">
            <div className="w-full bg-[#22C55E] h-[38px] flex items-center relative px-0 rounded-none">
              <div className="flex-1 flex items-center justify-center gap-3">
                <span className="text-white font-medium text-[16px]">Current Token Number</span>
                <span className="inline-flex items-center gap-2 font-bold text-white text-[18px]">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#D1FADF] border border-[#A7F3D0]"></span>
                  {String(activePatient?.token ?? 0).padStart(2, '0')}
                </span>
              </div>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 border border-red-200 bg-white text-red-600 text-xs font-semibold px-2 py-1 rounded transition hover:bg-red-50"
                onClick={() => setQueuePaused(!queuePaused)}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="text-red-500"><rect x="4" y="4" width="2" height="8" rx="1" fill="#EF4444"/><rect x="10" y="4" width="2" height="8" rx="1" fill="#EF4444"/></svg>
                {queuePaused ? 'Resume Queue' : 'Pause Queue'}
              </button>
            </div>
          </div>
        )}
        {/* Overview Section (full width) */}
        <div className=" flex flex-col gap-2">
          <h3 className="text-[#424242] font-medium">Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <OverviewStatCard title="All Appointments" value={queueData.length} />
            <OverviewStatCard title="Checked In" value={queueData.filter((q) => q.status === 'Check-In').length} />
            <OverviewStatCard title="Engaged" value={0} />
            <OverviewStatCard title="No Show/Cancelled" value={0} />
          </div>
        </div>

        {/* Active Patient - only when session is ON */}
        {sessionStarted && activePatient && (
          <div className="mb-3">
            <h3 className="text-gray-800 font-semibold mb-2">Active Patient</h3>
            <div className="bg-white rounded-lg border border-blue-200 px-4 py-3 flex items-center justify-between text-sm">
              {/* Left composite info */}
              <div className="flex items-center gap-4 min-w-0">
                <AvatarCircle name={activePatient.patientName} size="s" />
                <div className="flex items-center gap-4 min-w-0">
                  {/* Patient core info */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-gray-900 truncate max-w-[160px]">{activePatient.patientName}</span>
                      <span className="text-gray-400 text-xs leading-none">↗</span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{activePatient.gender} | {activePatient.age}</div>
                  </div>
                  {/* Divider */}
                    <div className="h-10 w-px bg-gray-200" />
                    {/* Token number */}
                    <div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-gray-500">Token Number</span>
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded border border-blue-300 bg-blue-50 text-[11px] font-medium text-blue-700">
                        {activePatient.token}
                      </span>
                    </div>
                    {/* Reason */}
                    <div className="flex items-center gap-1 text-gray-500">
                      <span className="">Reason for Visit :</span>
                      <span className="font-xs whitespace-nowrap text-gray-700">{activePatient.reasonForVisit}</span>
                    </div>
                  </div>

                </div>
              </div>
              {/* Right controls */}
              <div className="flex items-center gap-3 shrink-0 pl-4">
                <div className="inline-flex items-center gap-1 rounded-md border border-green-200 bg-green-50 px-2 py-1 text-[12px] font-medium text-green-700">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                  {formatTime(elapsed)}
                </div>
                <button onClick={completeCurrentPatient} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  End Session
                </button>
                <button className="text-gray-500 hover:text-gray-700 px-2 py-1">⋯</button>
              </div>
            </div>
          </div>
        )}

        {/* Filter + right controls under Active Patient (always visible) */}
        <div className="flex items-center justify-between px-1 py-3">
          {/* Filter Tabs */}
          <div className="flex gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={` px-[6px] py-1 rounded-lg font-medium text-sm transition-colors ${
                  activeFilter === filter ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {filter} <span className="ml-1 text-xs">{getFilterCount(filter)}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {/* Start Session toggle */}
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm">Start Session</span>
              <Toggle checked={sessionStarted} onChange={handleToggleSession} />
            </div>

            {/* Start Check-ups toggle removed as per requirement */}
      <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">Tokens Available</span>
              <Badge size="small" type="ghost" color="green" hover>
        5 Out of 100
              </Badge>
            </div>
          </div>

        </div>

        {/* Columns area: left table + right requests (stack on small screens). Make horizontally scrollable to honor fixed right width */}
        <div className="w-ffull flex flex-col lg:flex-row gap-3 flex-1 overflow-x-auto overflow-y-hidden">
          {/* Left Side - Patient Queue Table (using reusable component) */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <QueueTable />
          </div>

          {/* Right Side - Appointment Requests (fixed width per spec) */}
          <div className="shrink-0 w-[400px] bg-white rounded-[12px] border-[0.5px] border-[#D6D6D6] h-full overflow-y-auto">
            <div className="">
              <div className="p-3 flex items-center gap-2 bg-[#D6D6D6] bg-opacity-10 border-b-[0.5px] border-gray-400">
                <img src={appointement} alt="Appointment" className="w-5 h-5 mr-2" />
                <h2 className="text-[14px] font-medium text-[#1F2937]">Appointment Request</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {appointmentRequests.map((request, index) => (
                  <div key={index} className="">
                    <div className="flex items-start gap-4 p-3">
                      
                      <div className="flex flex-col w-full gap-2">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-2">
                            <AvatarCircle name={request.name} size="l" />
                            <div className="flex flex-col">
                              <div className="text-[16px] leading-6 font-semibold text-gray-900">{request.name}</div>
                              <div className="text-xs text-gray-500">{request.gender} | {request.age}</div>
                            </div>
                          </div>
                          <button className="text-gray-500 hover:text-gray-700 px-1">⋯</button>
                        </div>

                        <div className="flex flex-col gap-1 text-[14px] text-gray-700">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{request.date}</span>
                          </div>
                          {request.time ? (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{request.time}</span>
                            </div>
                          ) : null}
                        </div>

                        <div className="flex justify-between gap-3">
                            <Button size="large" variant="primary" className="w-full">Accept</Button>
                            <Button size="large" variant="secondary" className="w-full">{request.secondary || 'Reschedule'}</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All Requests</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;

