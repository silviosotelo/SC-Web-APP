import '../../entities/appointment.dart';
import '../../repositories/appointment_repository.dart';

class GetAppointmentsUseCase {
  final AppointmentRepository _repository;

  GetAppointmentsUseCase(this._repository);

  Future<List<Appointment>> execute() async {
    return await _repository.getMyAppointments();
  }
}