import React from 'react'

// Fixed label width to keep consistent spacing between labels and values
const labelWidth = 'min-w-[220px]'

const InfoRow = ({ label, value, link }) => (
  <div className="border-b border-[#F0F0F0] flex gap-36 py-2">
  <span className={`font-normal ${labelWidth} text-sm text-[#626060]`}>{label}</span>
    {link ? (
      <a
        href={link}
        className="font-medium text-sm text-blue-600 underline"
        target="_blank"
        rel="noreferrer"
      >
        {value}
      </a>
    ) : (
      <span className="font-medium text-sm text-[#424242]">{value}</span>
    )}
  </div>
)

const InfoSection = ({ title, children }) => (
  <div className="flex flex-col gap-1 w-full ">
    <span className="text-[#424242] font-medium text-sm">{title}</span>
    <div className="border-t border-[#D6D6D6] flex flex-col">{children}</div>
  </div>
)

const Chips = ({ title, items = [] }) => (
  <div className="flex flex-col gap-2 w-full">
    <span className="text-[#424242] font-medium text-sm">{title}</span>
    <div className="border-t border-[#D6D6D6] pt-2 flex flex-wrap gap-2">
      {items.map((t, i) => (
        <span key={i} className="px-3 py-1 rounded-md text-xs border border-[#E3E3E3] text-[#424242] bg-white">
          {t}
        </span>
      ))}
    </div>
  </div>
)

const DocLink = ({ label, value }) => (
  <div className="border-b border-[#F0F0F0] flex gap-2 py-2">
  <span className={`font-normal ${labelWidth} text-sm text-[#626060]`}>{label}</span>
    {value?.href ? (
      <a href={value.href} className="text-sm font-medium text-[#2F66F6] underline" target="_blank" rel="noreferrer">
        {value.text}
      </a>
    ) : (
      <span className="text-sm font-medium text-[#424242]">{value?.text || value || '-'}</span>
    )}
  </div>
)

const Details = ({ hospital }) => {
  const name = hospital?.name || '-'
  const estYear = hospital?.establishmentYear || '-'
  const estWithExp = estYear && estYear !== '-' ? `${estYear} (${new Date().getFullYear() - parseInt(estYear || '0')} Years of Experience)` : '-'
  const contactEmail = hospital?.emailId || '-'
  const contactPhone = hospital?.phone || '-'
  const addressLine = [hospital?.address?.street, hospital?.address?.blockNo, hospital?.address?.landmark].filter(Boolean).join(', ')
  const city = hospital?.city || '-'
  const state = hospital?.state || '-'
  const zip = hospital?.pincode || '-'
  const specialties = (hospital?.specialties || hospital?.specialtiesList || []).map(s => s?.specialty?.name || s?.name).filter(Boolean)
  const services = hospital?.hospitalServices || []
  const accreditations = hospital?.accreditation || []
  const documents = hospital?.documents || []
  const primaryAdmin = Array.isArray(hospital?.adminDetails) && hospital.adminDetails.length ? hospital.adminDetails[0] : null
  return (
    <div className="flex flex-col pt-3 px-3 pb-6 gap-6">
      {/* About Hospital */}
      <div className="border flex flex-col p-3 gap-2 border-[#B8B8B8] rounded-lg">
        <div className="flex gap-1 items-center">
          <span className="text-[#424242] text-sm font-semibold">About Hospital</span>
        </div>
        <span className="font-normal text-[#626060] text-xs">
          {name} provides comprehensive healthcare services. It has specialties in {specialties.length ? specialties.join(', ') : '—'}.
        </span>
      </div>

      {/* Info + Address using a fixed 7/5 grid like the reference */}
      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-12 md:col-span-6">
          <InfoSection title="Info">
            <InfoRow label="Name:" value={name} />
            <InfoRow label="Establishment Year:" value={estWithExp} />
            <InfoRow label="Hospital Contact Email:" value={contactEmail} link={hospital?.url || undefined} />
            <InfoRow label="Hospital Contact Number:" value={contactPhone} />
          </InfoSection>

          <div className="mt-6 flex flex-col gap-6">
            <Chips title="Medical Specialties" items={specialties} />
            <Chips
              title="Hospital Services & Facilities"
              items={services}
            />
            <Chips title="Accreditations" items={accreditations} />

            <div className="flex flex-col gap-1">
              <span className="text-[#424242] font-medium text-sm">Certificates & Documents</span>
              <div className="border-t border-[#D6D6D6] flex flex-col">
                {(documents || []).map((d, idx) => (
                  <DocLink key={idx} label={`${d?.docType || 'Document'}:`} value={{ text: d?.docNo || '-', href: d?.docUrl || undefined }} />
                ))}
              </div>
            </div>
          </div>
        </div>

    <div className="col-span-12 md:col-span-6">
          <InfoSection title="Hospital Address">
            <InfoRow label="Address:" value={addressLine || '-'} />
            <InfoRow label="City:" value={city} />
            <InfoRow label="State:" value={state} />
            <InfoRow label="Zip Code:" value={zip} />
      <InfoRow label="Map Location" value="View" />
            <div className="mt-2 border rounded-md overflow-hidden border-[#E1E1E1] w-full h-[220px]">
              <iframe
                title="Hospital Map"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.84%2C18.96%2C72.88%2C19.00&layer=mapnik&marker=18.98%2C72.86"
              />
            </div>
          </InfoSection>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[#424242] font-medium text-sm">Hospital Photos</span>
              <div className="border-t border-[#D6D6D6] pt-3 grid grid-cols-4 gap-3">
                {[1,2,3,4].map((n)=> (
                  <div key={n} className="h-[80px] rounded-md border border-[#E3E3E3] bg-[url('/hospital-sample.png')] bg-cover bg-center" />
                ))}
              </div>
            </div>

      <div className="flex flex-col gap-1">
              <span className="text-[#424242] font-medium text-sm">Primary Admin Account Details</span>
              <div className="border-t border-[#D6D6D6] flex flex-col">
        <InfoRow label="User Name:" value={primaryAdmin?.name || '-'} />
        <InfoRow label="Email:" value={primaryAdmin?.emailId || '-'} />
        <InfoRow label="Designation:" value="-" />
        <InfoRow label="Contact:" value={primaryAdmin?.phone || '-'} />
        <InfoRow label="Role:" value="Admin" />
        <InfoRow label="MFA Status:" value="-" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
