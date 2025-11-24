import '../../core/entities/family_member.dart';
import '../../core/entities/doctor.dart';
import '../../core/entities/appointment.dart';
import '../../core/entities/invoice.dart';
import '../../core/entities/notification.dart';
import '../../core/entities/request.dart';
import '../../core/entities/medical_center.dart';

class MockDataSource {
  static final List<FamilyMember> familyMembers = [
    const FamilyMember(
      id: '1',
      name: 'Jose Luis Fernando Cino Diaz',
      relation: 'Titular',
      documentId: '2.149.859',
      clientNumber: '197439',
      isActive: true,
      lastActivation: '21/02/2025 11:07:14',
      isEnrolled: false,
    ),
    const FamilyMember(
      id: '2',
      name: 'Monica Patricia Romero Duarte',
      relation: 'Cónyuge',
      documentId: '3.205.656',
      clientNumber: '197439',
      isActive: true,
      lastActivation: '02/05/2025 21:35:34',
      isEnrolled: true,
    ),
    const FamilyMember(
      id: '3',
      name: 'Massimiliano Agustin Cino',
      relation: 'Hijo',
      documentId: '7.748.389',
      clientNumber: '197439',
      isActive: true,
      lastActivation: '19/02/2025 16:29:11',
      isEnrolled: false,
    ),
  ];

  static final List<Doctor> doctors = [
    const Doctor(
      id: 'doc1',
      name: 'Dr. Candia Irala, Jose Carlos',
      specialty: 'Cardiología',
      location: 'Sanatorio Británico - Asunción',
      imageUrl: 'https://picsum.photos/100/100',
    ),
    const Doctor(
      id: 'doc2',
      name: 'Dr. Delmas Barchello, Cesar Maria',
      specialty: 'Cardiología',
      location: 'Sanatorio Las Lomas - Asunción',
      imageUrl: 'https://picsum.photos/101/101',
    ),
    const Doctor(
      id: 'doc3',
      name: 'Dra. Montefilpo Galeano, Sadi',
      specialty: 'Cardiología',
      location: 'Sanatorio Británico - Asunción',
      imageUrl: 'https://picsum.photos/102/102',
    ),
  ];

  static final List<Appointment> appointments = [
    const Appointment(
      id: '1',
      doctorName: 'Dr. Candia Irala, Jose Carlos',
      specialty: 'Cardiología',
      date: '20/08/2025',
      time: '08:00 AM',
      location: 'Sanatorio Británico',
      status: AppointmentStatus.confirmed,
      patientName: 'Jose Luis Fernando',
      mode: AppointmentMode.inPerson,
    ),
    const Appointment(
      id: '2',
      doctorName: 'Dra. Montefilpo Galeano',
      specialty: 'Clínica Médica',
      date: '15/06/2025',
      time: '10:30 AM',
      location: 'Sanatorio Británico',
      status: AppointmentStatus.completed,
      patientName: 'Jose Luis Fernando',
      mode: AppointmentMode.inPerson,
    ),
  ];

  static final List<Invoice> invoices = [
    const Invoice(
      id: '10020060452',
      date: '17 de noviembre 2025',
      amount: '130.000',
      rawValue: 130000,
      status: InvoiceStatus.pending,
    ),
    const Invoice(
      id: '10020058599',
      date: '20 de octubre 2025',
      amount: '0',
      rawValue: 0,
      status: InvoiceStatus.paid,
    ),
  ];

  static final List<AppNotification> notifications = [
    const AppNotification(
      id: '1',
      title: 'Recordatorio de Turno',
      message: 'Tienes un turno con Dr. Candia mañana a las 08:00 AM.',
      date: 'Hace 1 hora',
      isRead: false,
      type: NotificationType.appointment,
    ),
    const AppNotification(
      id: '2',
      title: 'Factura Vencida',
      message: 'Tu factura del mes de Noviembre ha vencido.',
      date: 'Hace 1 día',
      isRead: false,
      type: NotificationType.payment,
    ),
  ];

  static final List<MedicalRequest> requests = [
    const MedicalRequest(
      id: 'REQ-001',
      type: 'Visación',
      date: '19/08/2025',
      status: RequestStatus.pending,
      description: 'Estudio de Resonancia Magnética',
    ),
    const MedicalRequest(
      id: 'REQ-002',
      type: 'Reintegro',
      date: '10/07/2025',
      status: RequestStatus.approved,
      description: 'Consulta particular Dr. Perez',
    ),
  ];

  static final List<MedicalCenter> centers = [
    const MedicalCenter(
      id: '1',
      name: 'SANATORIO BRITANICO SOCIEDAD ANONIMA',
      address: 'AVDA. G. RODRIGUEZ DE FRANCIA N 910',
      phone: '+595213798000',
      type: CenterType.hospital,
    ),
    const MedicalCenter(
      id: 'eme',
      name: 'E.M.E - EQUIPO MEDICO DE EMERGENCIAS',
      address: 'ESPAÑA 1569 C/ AYALA VELAZQUEZ',
      phone: '+595214180001',
      type: CenterType.ambulance,
    ),
  ];
}