import '../../core/entities/appointment.dart';
import '../../core/entities/doctor.dart';
import '../../core/repositories/appointment_repository.dart';
import '../data_sources/mock_data_source.dart';

class AppointmentRepositoryImpl implements AppointmentRepository {
  @override
  Future<List<Appointment>> getMyAppointments() async {
    await Future.delayed(const Duration(milliseconds: 800));
    return MockDataSource.appointments;
  }

  @override
  Future<List<Doctor>> getDoctorsBySpecialty(String specialtyId) async {
    await Future.delayed(const Duration(milliseconds: 600));
    return MockDataSource.doctors;
  }

  @override
  Future<List<String>> getAvailableTimeSlots(String doctorId, String date) async {
    await Future.delayed(const Duration(milliseconds: 500));
    return ['08:00 AM', '09:00 AM', '10:00 AM', '01:20 PM'];
  }

  @override
  Future<void> bookAppointment(Map<String, dynamic> appointmentData) async {
    await Future.delayed(const Duration(seconds: 1));
  }
}