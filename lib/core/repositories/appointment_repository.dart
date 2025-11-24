import '../entities/appointment.dart';
import '../entities/doctor.dart';

abstract class AppointmentRepository {
  Future<List<Appointment>> getMyAppointments();
  Future<List<Doctor>> getDoctorsBySpecialty(String specialtyId);
  Future<List<String>> getAvailableTimeSlots(String doctorId, String date);
  Future<void> bookAppointment(Map<String, dynamic> appointmentData);
}