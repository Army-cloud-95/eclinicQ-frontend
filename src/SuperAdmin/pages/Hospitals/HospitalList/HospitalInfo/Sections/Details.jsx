import React, { useState, useEffect } from 'react'
import {
  pencil,
  add,
  verifiedTick,
  award,
  publication
} from '../../../../../../../public/index.js'
import MapLocation from '../../../../../../components/FormItems/MapLocation'
import InputWithMeta from '../../../../../../components/GeneralDrawer/InputWithMeta'
import { getDownloadUrl } from '../../../../../../services/uploadsService'
import { ChevronDown } from 'lucide-react'

// --- Components adapted from HAccount.jsx ---

const InfoField = ({ label, value, right, className: Class }) => (
  <div
    className={`${Class} flex flex-col gap-1 text-[14px] border-b-[0.5px] pb-[6px] border-secondary-grey100`}
  >
    <div className="col-span-4  text-secondary-grey200">{label}</div>
    <div className="col-span-8 text-secondary-grey400 flex items-center justify-between">
      <span className="truncate">{value || "-"}</span>
      {right}
    </div>
  </div>
);

const SectionCard = ({
  title,
  subtitle,
  subo,
  Icon,
  onIconClick,
  headerRight,
  children,
}) => (
  <div className="px-4 py-3 flex flex-col gap-3 bg-white rounded-lg ">
    <div className="flex items-center justify-between">
      {/* LEFT */}
      <div className='flex items-center justify-between w-full'>
        <div className="flex items-center gap-1 text-sm">
          <div className="font-medium text-[14px] text-gray-900">{title}</div>
          {subtitle && (
            <div className="px-1 border border-secondary-grey50 bg-secondary-grey50 rounded-[2px] text-[12px] text-gray-500 hover:border hover:border-blue-primary150 hover:text-blue-primary250 cursor-pointer">
              {subtitle}
            </div>
          )}
        </div>
        {subo && (
          <div className="flex gap-1 text-[12px] text-secondary-grey200">
            <span>{subo}</span>
            <span className="text-blue-primary250 cursor-pointer">Edit</span>
          </div>
        )}
      </div>
      {/* RIGHT */}
      <div className="flex items-center gap-3 shrink-0">
        {headerRight}
        {Icon && (
          <button
            onClick={onIconClick}
            className="p-1 text-gray-500 hover:bg-gray-50"
          >
            {typeof Icon === "string" ? (
              <img src={Icon} alt="icon" className="w-6 h-6" />
            ) : (
              <Icon className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
    </div>
    <div>{children}</div>
  </div>
);

const ProfileItemCard = ({
  icon,
  title,
  badge,
  subtitle,
  date,
  location,
  linkLabel,
  linkUrl,
  description,
  initiallyExpanded = false,
  rightActions,
}) => {
  const [expanded, setExpanded] = useState(!!initiallyExpanded);
  const MAX_CHARS = 220;
  const showSeeMore = !linkUrl && typeof description === 'string' && description.length > MAX_CHARS;
  const visibleText =
    !linkUrl && typeof description === 'string'
      ? expanded
        ? description
        : description.length > MAX_CHARS
          ? description.slice(0, MAX_CHARS).trimEnd() + '…'
          : description
      : '';
  return (
    <div className="flex  py-2.5 pt-1.5 border-b rounded-md bg-white">
      <div className="w-[64px] mr-4 h-[64px] rounded-full border border-secondary-grey50 bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
        {typeof icon === "string" ? (
          <img src={icon} alt="" className="w-8 h-8 object-contain" />
        ) : (
          icon
        )}
      </div>
      <div className="flex  flex-col gap-[2px] w-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-shrink-0  items-center gap-1 text-sm text-secondary-grey400">
            <span className="font-semibold">{title}</span>
            {badge && (
              <span className="text-[12px]   min-w-[18px]  text-secondary-grey400 bg-secondary-grey50 rounded px-1 ">
                {badge}
              </span>
            )}
          </div>
        </div>
        {subtitle && <div className="text-sm text-secondary-grey400 w-4/5">{subtitle}</div>}
        {date && <div className="text-sm text-secondary-grey200">{date}</div>}
        {linkUrl ? (
          <div className="flex items-center gap-1">
            <a
              href={linkUrl}
              className="inline-flex items-center gap-1 text-sm text-blue-primary250"
              target="_blank"
              rel="noreferrer"
            >
              {linkLabel}
            </a>
          </div>
        ) : (
          description ? (
            <div className="mt-2">
              <div className="text-[13px] text-secondary-grey400">{visibleText}</div>
              {showSeeMore && (
                <button
                  type="button"
                  className="mt-1 text-[13px] text-secondary-grey200 inline-flex items-center gap-1 hover:text-secondary-grey300"
                  onClick={() => setExpanded((v) => !v)}
                >
                  {expanded ? 'See Less' : 'See More'}
                  <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          ) : null
        )}
      </div>
      {rightActions && (
        <div className="flex items-center gap-2">{rightActions}</div>
      )}
    </div>
  );
};

const VerifiedBadge = () => (
  <span className="inline-flex items-center text-success-300 border bg-success-100 border-success-300 py-0.5 px-1 rounded-md text-[12px]">
    <img src={verifiedTick} alt="Verified" className="w-3.5 h-3.5 mr-1" />
    Verified
  </span>
)

// --- End Components ---

const Details = ({ hospital }) => {
  // Data mapping
  const profile = {
    hospitalName: hospital?.name,
    type: hospital?.type,
    phone: hospital?.phone,
    email: hospital?.emailId || hospital?.email,
    estDate: hospital?.establishmentYear,
    website: hospital?.url || hospital?.website,
    emergencyPhone: hospital?.emergencyContactNumber,
    beds: hospital?.noOfBeds,
    icuBeds: hospital?.noOfICUBeds,
    ambulances: hospital?.noOfAmbulances,
    ambulancePhone: hospital?.ambulanceNumber,
    bloodBank: hospital?.isBloodBankAvailable,
    bloodBankPhone: hospital?.bloodBankContactNumber,
    address: hospital?.address,
    city: hospital?.city,
    state: hospital?.state,
    about: hospital?.about || "About text not available.",
    photos: hospital?.photos || hospital?.images,
    specialties: (hospital?.specialties || []).map(s => s?.specialty?.name || s?.name || s),
    services: (hospital?.hospitalServices || []).map(s => s?.name || s),
    admin: (hospital?.adminDetails || [])[0] || {},
    gst: {
      number: hospital?.gstNumber,
      doc: hospital?.documents?.find(d => d.docType?.toLowerCase().includes('gst'))
    },
    cin: {
      number: hospital?.cinNumber,
      // mapping other CIN fields if available from backend, otherwise defaults or '-'
    },
    documents: hospital?.documents || []
  }

  const awards = hospital?.awards || []
  const publications = hospital?.publications || []

  // Resolve photo keys to URLs
  const [resolvedPhotos, setResolvedPhotos] = useState([])
  useEffect(() => {
    let ignore = false
    const run = async () => {
      try {
        const keys = profile.photos || []
        const urls = await Promise.all(keys.map((k) => getDownloadUrl(k)))
        if (!ignore) setResolvedPhotos(urls.map((u) => u || ''))
      } catch {
        if (!ignore) setResolvedPhotos([])
      }
    }
    run()
    return () => { ignore = true }
  }, [JSON.stringify(profile.photos)])

  const formatMonthYear = (dateStr) => dateStr // Placeholder

  return (
    <div className="grid grid-cols-12 gap-6 bg-secondary-grey50 p-4">
      {/* Left Column (7/12) */}
      <div className="col-span-12 xl:col-span-6 space-y-6">

        {/* Hospital Info */}
        <SectionCard
          title="Hospital Info"
          Icon={pencil}
          onIconClick={() => console.log('Edit Info')}
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <InfoField label="Hospital Name" value={profile.hospitalName} />
            <InfoField label="Hospital Type" value={profile.type} />
            <InfoField label="Mobile Number" value={profile.phone} right={<VerifiedBadge />} />
            <InfoField label="Email" value={profile.email} right={<VerifiedBadge />} />
            <InfoField label="Establishment Date" value={profile.estDate} />

            {/* Establishment Proof */}
            <div>
              <div className="text-[14px] text-secondary-grey200 mb-1">Establishment Proof</div>
              <InputWithMeta
                imageUpload={true}
                fileName={"Establishment.pdf"}
                onFileView={(f) => console.log('view', f)}
                showInput={false}
              />
            </div>

            <InfoField label="Website" value={profile.website} />
            <InfoField label="Emergency Contact Number" value={profile.emergencyPhone} />
            <InfoField label="Number of Beds" value={profile.beds} />
            <InfoField label="Number of ICU Beds" value={profile.icuBeds} />
            <InfoField label="Number of Ambulances" value={profile.ambulances} />
            <InfoField label="Ambulance Contact Number" value={profile.ambulancePhone} />
            <InfoField label="Do you have Blood Bank" value={profile.bloodBank ? "Yes" : "No"} />
            <InfoField label="Blood Bank Contact Number" value={profile.bloodBankPhone} />
          </div>

          <div className="pt-4 pb-4">
            <div className="text-sm text-secondary-grey200 mb-1">About</div>
            <p className="text-sm leading-relaxed text-secondary-grey400">{profile.about}</p>
          </div>

          <InputWithMeta
            label="Hospital Photos"
            showInput={false}
          >
          </InputWithMeta>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {(resolvedPhotos && resolvedPhotos.length > 0 ? resolvedPhotos : ['/placeholder_clinic.jpg']).map((src, i) => (
              <img key={i} src={src} alt="hospital" className="w-[120px] h-[120px] rounded-md object-cover border border-gray-100" />
            ))}
          </div>
        </SectionCard>

        {/* Medical Specialties */}
        <SectionCard title="Medical Specialties" Icon={pencil} onIconClick={() => { }}>
          <div className="flex flex-wrap gap-2">
            {(profile.specialties && profile.specialties.length > 0 ? profile.specialties : ['-']).map((s, i) => (
              <span key={i} className="px-1 rounded-[2px] border border-gray-100 bg-gray-50 text-sm text-secondary-grey400 hover:border-blue-primary150 hover:text-blue-primary250 cursor-pointer">{s}</span>
            ))}
          </div>
        </SectionCard>

        {/* Services & Facilities */}
        <SectionCard title="Hospital Services & Facilities" Icon={pencil} onIconClick={() => { }}>
          <div className="flex flex-wrap gap-3">
            {(profile.services && profile.services.length > 0 ? profile.services : ['-']).map((s, i) => (
              <span key={i} className="px-1 rounded-[2px] border border-gray-100 bg-gray-50 text-sm text-secondary-grey400 hover:border-blue-primary150 hover:text-blue-primary250 cursor-pointer">{s}</span>
            ))}
          </div>
        </SectionCard>

        {/* Awards & Publications */}
        <SectionCard
          title="Awards & Publications"
          Icon={add}
          onIconClick={() => { }}
        >
          <div className="space-y-2">
            {awards.length === 0 && publications.length === 0 && <div className="text-sm text-gray-400">No awards or publications listed.</div>}

            {awards.map((aw) => (
              <ProfileItemCard
                key={aw.id}
                icon={award}
                title={aw.awardName}
                subtitle={aw.issuerName}
                date={formatMonthYear(aw.issueDate)}
                linkLabel="Certificate ↗"
                linkUrl={aw.awardUrl}
              />
            ))}

            {publications.map((pub) => (
              <ProfileItemCard
                key={pub.id}
                icon={publication}
                title={pub.title}
                subtitle={pub.publisher || pub.associatedWith}
                date={pub.publicationDate ? formatMonthYear(pub.publicationDate) : undefined}
                linkLabel="Publication ↗"
                linkUrl={pub.publicationUrl}
                description={pub.description}
              />
            ))}
          </div>
        </SectionCard>

      </div>

      {/* Right Column (5/12) */}
      <div className="col-span-12 xl:col-span-6 space-y-6">

        {/* Address */}
        <SectionCard title="Hospital Address" Icon={pencil} onIconClick={() => { }}>
          <InputWithMeta
            label="Map Location"
            showInput={false}
            infoIcon
          />
          <div className="h-[100px] bg-gray-100 rounded-lg border border-gray-200 mb-3 overflow-hidden relative">
            <MapLocation overlay={false} />
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-2 gap-8">
              <InfoField label="Block no./Shop no./House no." value={profile.address?.blockNo || profile.address?.block} />
              <InfoField label="Road/Area/Street" value={profile.address?.street || profile.address?.road} />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <InfoField label="Landmark" value={profile.address?.landmark} />
              <InfoField label="Pincode" value={profile.address?.pincode} />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <InfoField label="City" value={profile.city} />
              <InfoField label="State" value={profile.state} />
            </div>
          </div>
        </SectionCard>

        {/* Primary Admin */}
        <SectionCard title="Primary Admin Account Details" subo="To Change Admin Details" headerRight={<></>}>
          <div className="grid grid-cols-2 gap-x-7 gap-y-3">
            <InfoField label="First Name" value={profile.admin?.firstName || (profile.admin?.name || '').split(' ')[0]} />
            <InfoField label="Last Name" value={profile.admin?.lastName || (profile.admin?.name || '').split(' ').slice(1).join(' ')} />
            <InfoField label="Mobile Number" value={profile.admin?.phone} right={<VerifiedBadge />} />
            <InfoField label="Email" value={profile.admin?.emailId || profile.admin?.email} right={<VerifiedBadge />} />
            <InfoField label="Gender" value={profile.admin?.gender} />
            <InfoField label="City" value={profile.admin?.city} />
            <InfoField label="Designation" value={profile.admin?.designation || "Super Admin"} />
            <InfoField label="Role" value={profile.admin?.role || "Admin"} />
          </div>
        </SectionCard>

        {/* Verification Documents */}
        <SectionCard title="Verification Documents" subo="To change your Medical proof please">
          <div className="space-y-3">

            {/* GST */}
            <div className='flex flex-col gap-2'>
              <h4 className="text-sm font-medium text-secondary-grey400">
                <span className="relative inline-block pb-2">
                  GST Details
                  <span className="absolute left-1/2 bottom-0 h-[2px] w-full -translate-x-3/4 scale-x-50 bg-blue-primary150/50"></span>
                </span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div><InfoField label="GST Number" value={profile.gst?.number} /></div>
                <div>
                  <div className="text-[14px] text-secondary-grey200 mb-1">Proof of GST Registration</div>
                  <InputWithMeta imageUpload={true} fileName="GST Proof.pdf" showInput={false} />
                </div>
              </div>
            </div>

            {/* CIN */}
            <div className='flex flex-col gap-2'>
              <h4 className="text-sm font-semibold text-secondary-grey400">
                <span className="relative inline-block pb-2">
                  CIN Details
                  <span className="absolute left-1/2 bottom-0 h-[2px] w-full -translate-x-3/4 scale-x-50 bg-blue-primary150/50"></span>
                </span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 gap-y-4">
                <InfoField label="CIN Number" value={profile.cin?.number} />
                <div className="col-span-2 md:col-span-1">
                  <div className="text-[14px] text-secondary-grey200 mb-">Proof of CIN Registration</div>
                  <InputWithMeta imageUpload={true} fileName="CIN Proof.pdf" showInput={false} />
                </div>
              </div>
            </div>

            {/* Other docs could be mapped here similarly if data exists in specific fields */}
            {/* For now, just rendering placeholders/mapped docs logic similar to HAccount */}

          </div>
        </SectionCard>

      </div>
    </div>
  )
}

export default Details
