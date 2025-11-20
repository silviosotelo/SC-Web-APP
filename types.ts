export enum AppointmentMode {
  InPerson = 'PRESENCIAL',
  Telemedicine = 'TELEMEDICINA'
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  documentId: string;
  clientNumber: string;
  status: 'active' | 'inactive';
  lastActivation?: string;
  avatarUrl?: string;
  isEnrolled?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  imageUrl?: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  iconName: string; // Mapping to Lucide icons
  route: string;
  color?: string;
}

export interface AppointmentDraft {
  mode: AppointmentMode | null;
  memberId: string | null;
  specialtyId: string | null;
  doctorId: string | null;
  date: string | null;
  timeSlotId: string | null;
  email: string;
  phone: string;
}