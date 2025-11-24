
import { Doctor, FamilyMember, MenuItem, TimeSlot, Invoice, AppNotification, MyAppointment, MyRequest } from './types';
import { 
  FileText, Users, Calendar, MapPin, 
  Stethoscope, Activity, CreditCard, 
  Shield, Gift, Camera,
  Ambulance, Hospital, FlaskConical as Flask, Plane, RefreshCw
} from 'lucide-react';

export const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: '1',
    name: 'Jose Luis Fernando Cino Diaz',
    relation: 'Titular',
    documentId: '2.149.859',
    clientNumber: '197439',
    status: 'active',
    lastActivation: '21/02/2025 11:07:14',
    isEnrolled: false
  },
  {
    id: '2',
    name: 'Monica Patricia Romero Duarte',
    relation: 'Cónyuge',
    documentId: '3.205.656',
    clientNumber: '197439',
    status: 'active',
    lastActivation: '02/05/2025 21:35:34',
    isEnrolled: true
  },
  {
    id: '3',
    name: 'Massimiliano Agustin Cino',
    relation: 'Hijo',
    documentId: '7.748.389',
    clientNumber: '197439',
    status: 'active',
    lastActivation: '19/02/2025 16:29:11',
    isEnrolled: false
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc1',
    name: 'Dr. Candia Irala, Jose Carlos',
    specialty: 'Cardiología',
    location: 'Sanatorio Británico - Asunción',
    imageUrl: 'https://picsum.photos/100/100'
  },
  {
    id: 'doc2',
    name: 'Dr. Delmas Barchello, Cesar Maria',
    specialty: 'Cardiología',
    location: 'Sanatorio Las Lomas - Asunción',
    imageUrl: 'https://picsum.photos/101/101'
  },
  {
    id: 'doc3',
    name: 'Dra. Montefilpo Galeano, Sadi',
    specialty: 'Cardiología',
    location: 'Sanatorio Británico - Asunción',
    imageUrl: 'https://picsum.photos/102/102'
  },
  {
    id: 'doc4',
    name: 'Dr. Bell Duarte, Luis Enrique',
    specialty: 'Cardiología',
    location: 'Brasilia 1182 Esq. Tte. Insaurralde',
    imageUrl: 'https://picsum.photos/103/103'
  }
];

export const AVAILABLE_SLOTS: TimeSlot[] = [
  { id: 't1', time: '08:00 AM', available: true },
  { id: 't2', time: '08:30 AM', available: false },
  { id: 't3', time: '09:00 AM', available: true },
  { id: 't4', time: '09:30 AM', available: true },
  { id: 't5', time: '10:00 AM', available: true },
  { id: 't6', time: '01:20 PM', available: true },
  { id: 't7', time: '01:40 PM', available: true },
];

export const HOME_MENU_ITEMS: MenuItem[] = [
  { id: 'plan', label: 'Mi Plan', iconName: 'Shield', route: '/plan', color: 'text-blue-600 bg-blue-50' },
  { id: 'carnet', label: 'Mi Carnet', iconName: 'Users', route: '/digital-card', color: 'text-purple-600 bg-purple-50' },
  { id: 'med_guide', label: 'Guía Médica', iconName: 'Stethoscope', route: '/guide', color: 'text-teal-600 bg-teal-50' },
  { id: 'centers', label: 'Centros', iconName: 'MapPin', route: '/centers', color: 'text-orange-600 bg-orange-50' },
  { id: 'turns', label: 'Turnos', iconName: 'Calendar', route: '/appointments', color: 'text-pink-600 bg-pink-50' },
  { id: 'requests', label: 'Solicitudes', iconName: 'FileText', route: '/requests', color: 'text-indigo-600 bg-indigo-50' },
  { id: 'history', label: 'Historia Clínica', iconName: 'Activity', route: '/history', color: 'text-red-600 bg-red-50' },
  { id: 'invoices', label: 'Facturas', iconName: 'CreditCard', route: '/invoices', color: 'text-green-600 bg-green-50' },
  { id: 'benefits', label: 'Red de Beneficios', iconName: 'Gift', route: '/benefits', color: 'text-yellow-600 bg-yellow-50' },
  { id: 'faceid', label: 'Reconocimiento Facial', iconName: 'Camera', route: '/face-id', color: 'text-gray-600 bg-gray-50' },
];

export const PLAN_DETAILS = [
  { title: 'Consultas', content: 'Ilimitadas. Consultas programadas en consultorio.' },
  { title: 'Domicilio no urgentes', content: '2/mes/abonado. Asunción y gran Asunción.' },
  { title: 'Urgencias', content: 'Cobertura 100% en sanatorios habilitados.' },
  { title: 'Internación', content: '100% Habitación privada.' }
];

export const CENTER_TYPES = [
  { id: 'ambulancia', label: 'Servicio de ambulancia', iconName: 'Ambulance' },
  { id: 'sanatorios', label: 'Sanatorios', iconName: 'Hospital' },
  { id: 'diagnosticos', label: 'Centros de diagnosticos', iconName: 'Activity' },
  { id: 'laboratorios', label: 'Laboratorios', iconName: 'Flask' },
  { id: 'odontologia', label: 'Odontologia', iconName: 'Stethoscope' },
];

export const MEDICAL_CENTERS = [
  { id: 1, name: 'SANATORIO BRITANICO SOCIEDAD ANONIMA', address: 'AVDA. G. RODRIGUEZ DE FRANCIA N 910', phone: '+595213798000', type: 'sanatorios', notes: 'NO CUBRE CON LA NUTRIOLOGA LAURA MOREL' },
  { id: 2, name: 'AMSA SA (ASISTENCIA MEDICA SANATORIAL)', address: 'TTE. FARIÑA N 1330 C/ CAPITAN FIGARI', phone: '+595212352000', type: 'sanatorios' },
  { id: 3, name: 'BAEZ RECALDE, MIRTHA ELENA - DRA.', address: 'ALFREDO SHEIFERHELD 4373', phone: '+595983', type: 'diagnosticos' },
  { id: 'eme', name: 'E.M.E - EQUIPO MEDICO DE EMERGENCIAS', address: 'ESPAÑA 1569 C/ AYALA VELAZQUEZ', phone: '+595214180001', type: 'ambulancia' }
];

export const INVOICES: Invoice[] = [
  { id: '10020060452', date: '17 de noviembre 2025', amount: '130.000', rawValue: 130000, status: 'PENDIENTE', pending: true },
  { id: '10020058599', date: '20 de octubre 2025', amount: '0', rawValue: 0, status: 'PAGADO', pending: false },
  { id: '10020056001', date: '19 de septiembre 2025', amount: '0', rawValue: 0, status: 'PAGADO', pending: false },
  { id: '10020056002', date: '19 de agosto 2025', amount: '130.000', rawValue: 130000, status: 'PENDIENTE', pending: true },
];

export const REQUEST_TYPES = [
  { id: 'visaciones', label: 'Visaciones', iconName: 'FileText' },
  { id: 'cobertura', label: 'Cobertura para Internación', iconName: 'Shield' },
  { id: 'reintegros', label: 'Reintegros', iconName: 'RefreshCw' },
  { id: 'asistencia', label: 'Asistencia al viajero', iconName: 'Plane' },
];

export const ANALYSIS_RESULTS = [
    { id: 1, origin: 'CBC', date: '13/06/2024 08:01:14' },
    { id: 2, origin: 'CBC', date: '22/08/2024 14:23:05' },
];

// NEW CONSTANTS

export const NOTIFICATIONS: AppNotification[] = [
  { id: '1', title: 'Recordatorio de Turno', message: 'Tienes un turno con Dr. Candia mañana a las 08:00 AM.', date: 'Hace 1 hora', read: false, type: 'appointment' },
  { id: '2', title: 'Factura Vencida', message: 'Tu factura del mes de Noviembre ha vencido.', date: 'Hace 1 día', read: false, type: 'payment' },
  { id: '3', title: 'Bienvenido', message: 'Gracias por utilizar la nueva app de Santa Clara.', date: 'Hace 5 días', read: true, type: 'system' }
];

export const MY_APPOINTMENTS: MyAppointment[] = [
  { id: '1', doctorName: 'Dr. Candia Irala, Jose Carlos', specialty: 'Cardiología', date: '20/08/2025', time: '08:00 AM', location: 'Sanatorio Británico', status: 'confirmed', patientName: 'Jose Luis Fernando' },
  { id: '2', doctorName: 'Dra. Montefilpo Galeano', specialty: 'Clínica Médica', date: '15/06/2025', time: '10:30 AM', location: 'Sanatorio Británico', status: 'completed', patientName: 'Jose Luis Fernando' },
  { id: '3', doctorName: 'Dr. Delmas Barchello', specialty: 'Pediatría', date: '10/03/2025', time: '02:00 PM', location: 'Sanatorio Las Lomas', status: 'cancelled', patientName: 'Massimiliano Agustin' },
];

export const MY_REQUESTS: MyRequest[] = [
  { id: 'REQ-001', type: 'Visación', date: '19/08/2025', status: 'pending', description: 'Estudio de Resonancia Magnética' },
  { id: 'REQ-002', type: 'Reintegro', date: '10/07/2025', status: 'approved', description: 'Consulta particular Dr. Perez' },
  { id: 'REQ-003', type: 'Cobertura', date: '05/05/2025', status: 'rejected', description: 'Internación programada' },
];
