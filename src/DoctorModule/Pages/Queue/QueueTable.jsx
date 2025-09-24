import React from 'react';
import AvatarCircle from '../../../components/AvatarCircle';
import Button from '../../../components/Button';
import { ChevronsUpDown } from 'lucide-react';

// Dimensions for sticky columns (px)
const COL_W = {
  token: 64,
  patient: 300,
  actions: 168,
};

const rows = [
  { token: 1, name: 'Rahul Sharma', gender: 'M', dob: '12/05/1985', age: 39, apptType: 'Review Visit', exptTime: '10:30 AM', bookingType: 'Online', reason: 'Fever & Weakness' },
  { token: 2, name: 'Priya Mehta', gender: 'F', dob: '08/09/1992', age: 31, apptType: 'Follow-up Consultation', exptTime: '11:00 AM', bookingType: 'Online', reason: 'Annual Checkup' },
  { token: 3, name: 'Arjun Verma', gender: 'M', dob: '23/11/1987', age: 36, apptType: 'New Consultation', exptTime: '11:45 AM', bookingType: 'Online', reason: 'Back Pain' },
  { token: 4, name: 'Sneha Deshpande', gender: 'F', dob: '14/07/1998', age: 25, apptType: 'New Consultation', exptTime: '12:30 PM', bookingType: 'Walk-In', reason: 'Skin Allergy' },
  { token: 5, name: 'Kunal Joshi', gender: 'M', dob: '05/02/1976', age: 48, apptType: 'Second Opinion', exptTime: '1:30 PM', bookingType: 'Walk-In', reason: 'High BP' },
  { token: 6, name: 'Neha Iyer', gender: 'F', dob: '30/10/1995', age: 28, apptType: 'New Consultation', exptTime: '2:00 PM', bookingType: 'Online', reason: 'Migraine' },
  { token: 7, name: 'Vikas Gupta', gender: 'M', dob: '19/04/1983', age: 41, apptType: 'Second Opinion', exptTime: '2:30 PM', bookingType: 'Walk-In', reason: 'Diabetes Check' },
  { token: 8, name: 'Radhika Nair', gender: 'F', dob: '06/01/1991', age: 33, apptType: 'Review Visit', exptTime: '3:15 PM', bookingType: 'Online', reason: 'Pregnancy Consultation' },
  { token: 9, name: 'Ankit Saxena', gender: 'M', dob: '11/06/1989', age: 35, apptType: 'Review Visit', exptTime: '4:15 PM', bookingType: 'Online', reason: 'Heartburn & Acidity' },
  { token: 10, name: 'Pooja Kulkarni', gender: 'F', dob: '15/08/1993', age: 30, apptType: 'Second Opinion', exptTime: '4:45 PM', bookingType: 'Online', reason: 'Thyroid Checkup' },
  { token: 11, name: 'Manish Choudhary', gender: 'M', dob: '02/12/1986', age: 37, apptType: 'Follow-up Consultation', exptTime: '5:45 PM', bookingType: 'Walk-In', reason: 'Anxiety & Stress' },
  { token: 12, name: 'Kavita Rao', gender: 'F', dob: '20/03/1980', age: 44, apptType: 'New Consultation', exptTime: '6:15 PM', bookingType: 'Walk-In', reason: 'Menopause Symptoms' },
  { token: 13, name: 'Rohan Agarwal', gender: 'M', dob: '07/05/1994', age: 30, apptType: 'Follow-up Consultation', exptTime: '10:15 AM', bookingType: 'Online', reason: 'Asthma' },
  { token: 14, name: 'Deepika Singh', gender: 'F', dob: '09/11/1987', age: 36, apptType: 'Review Visit', exptTime: '11:00 AM', bookingType: 'Walk-In', reason: 'PCOD Treatment' },
  { token: 15, name: 'Anirudh Patel', gender: 'M', dob: '15/07/1982', age: 42, apptType: 'Review Visit', exptTime: '12:15 PM', bookingType: 'Online', reason: 'Knee Pain' },
  { token: 16, name: 'Swati Mishra', gender: 'F', dob: '03/09/1990', age: 33, apptType: 'Second Opinion', exptTime: '12:45 PM', bookingType: 'Online', reason: 'Eye Checkup' },
  { token: 17, name: 'Harsh Vardhan', gender: 'M', dob: '21/04/1988', age: 37, apptType: 'Review Visit', exptTime: '1:30 PM', bookingType: 'Online', reason: 'Stomach Pain' },
  { token: 18, name: 'Isha Kapoor', gender: 'F', dob: '12/12/1991', age: 33, apptType: 'New Consultation', exptTime: '2:00 PM', bookingType: 'Walk-In', reason: 'Allergy' },
  { token: 19, name: 'Jatin Arora', gender: 'M', dob: '10/10/1985', age: 39, apptType: 'Follow-up Consultation', exptTime: '2:30 PM', bookingType: 'Online', reason: 'Cholesterol' },
  { token: 20, name: 'Kritika Jain', gender: 'F', dob: '05/05/1990', age: 35, apptType: 'Second Opinion', exptTime: '3:00 PM', bookingType: 'Online', reason: 'Back Pain' },
  { token: 21, name: 'Lokesh Gupta', gender: 'M', dob: '18/07/1982', age: 43, apptType: 'Review Visit', exptTime: '3:30 PM', bookingType: 'Walk-In', reason: 'Headache' },
  { token: 22, name: 'Meera Nanda', gender: 'F', dob: '22/08/1989', age: 36, apptType: 'New Consultation', exptTime: '4:00 PM', bookingType: 'Online', reason: 'Anemia' },
  { token: 23, name: 'Nikhil Sharma', gender: 'M', dob: '30/01/1987', age: 38, apptType: 'Follow-up Consultation', exptTime: '4:30 PM', bookingType: 'Walk-In', reason: 'Hypertension' },
  { token: 24, name: 'Ojasvi Rao', gender: 'F', dob: '14/02/1993', age: 32, apptType: 'Second Opinion', exptTime: '5:00 PM', bookingType: 'Online', reason: 'PCOD' },
];

const QueueTable = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="relative overflow-x-auto overflow-y-hidden rounded-lg">
  <table className="min-w-full text-sm table-fixed border-separate border-spacing-0">
          <colgroup>
            <col style={{ width: COL_W.token }} />
            <col style={{ width: COL_W.patient }} />
            <col style={{ width: 220 }} />
            <col style={{ width: 140 }} />
            <col style={{ width: 160 }} />
            <col style={{ width: 260 }} />
            <col style={{ width: COL_W.actions }} />
          </colgroup>

          <thead className="bg-white border-b border-gray-200 sticky top-0 z-20">
            <tr>
              <th className="px-3 py-2.5 text-center text-xs font-semibold text-gray-600 sticky left-0 z-30 bg-white border-r border-b border-gray-200" style={{ minWidth: COL_W.token, width: COL_W.token }}>Token</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 sticky z-20 bg-white border-r border-b border-gray-200" style={{ left: COL_W.token, minWidth: COL_W.patient, width: COL_W.patient }}>
                <span className="inline-flex items-center gap-1">Patient <ChevronsUpDown className="w-3.5 h-3.5 text-gray-300" /></span>
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 border-r border-b border-gray-200">
                <span className="inline-flex items-center gap-1">Appt. Type <ChevronsUpDown className="w-3.5 h-3.5 text-gray-300" /></span>
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 border-r border-b border-gray-200">
                <span className="inline-flex items-center gap-1">Expt. Time <ChevronsUpDown className="w-3.5 h-3.5 text-gray-300" /></span>
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 border-r border-b border-gray-200">
                <span className="inline-flex items-center gap-1">Booking Type <ChevronsUpDown className="w-3.5 h-3.5 text-gray-300" /></span>
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 border-r border-b border-gray-200">Reason For Visit</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 sticky right-0 z-30 bg-white border-l border-b border-gray-200" style={{ minWidth: COL_W.actions, width: COL_W.actions }}>Actions</th>
            </tr>
          </thead>

      <tbody>
            {rows.map((row) => (
              <tr key={row.token} className="group hover:bg-gray-50">
                {/* Token (sticky left) */}
                <td className="px-3 py-3 font-bold text-blue-600 text-lg text-center sticky left-0 z-10 bg-white group-hover:bg-gray-50 transition-colors border-r border-b border-gray-200" style={{ minWidth: COL_W.token, width: COL_W.token }}>
                  {row.token}
                </td>

                {/* Patient (sticky left after Token) */}
                <td className="px-3 py-3 sticky z-10 bg-white group-hover:bg-gray-50 transition-colors border-r border-b border-gray-200" style={{ left: COL_W.token, minWidth: COL_W.patient, width: COL_W.patient }}>
                  <div className="flex items-center gap-2">
                    <AvatarCircle name={row.name} size="s" />
                    <div className="leading-tight">
                      <div className="text-sm font-medium text-gray-900">{row.name}</div>
                      <div className="text-xs text-gray-500">{row.gender} | {row.dob} ({row.age}Y)</div>
                    </div>
                  </div>
                </td>

                {/* Middle scrollable columns */}
        <td className="px-3 py-3 text-gray-900 border-r border-b border-gray-200">{row.apptType}</td>
        <td className="px-3 py-3 text-gray-900 border-r border-b border-gray-200">{row.exptTime}</td>
        <td className="px-3 py-3 text-gray-900 border-r border-b border-gray-200">{row.bookingType}</td>
        <td className="px-3 py-3 text-gray-900 border-r border-b border-gray-200">{row.reason}</td>

                {/* Actions (sticky right) */}
                <td className="px-3 py-3 sticky right-0 z-10 bg-white group-hover:bg-gray-50 transition-colors border-l border-b border-gray-200" style={{ minWidth: COL_W.actions, width: COL_W.actions }}>
                  <div className="flex items-center justify-between gap-2">
                    <Button size="large" variant="secondary" className="h-9 py-0 px-4 text-sm">Check-In</Button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer pagination bar to mirror design (optional placeholder) */}
      <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-500">10 / Page • Go to Page</div>
    </div>
  );
};

export default QueueTable;
