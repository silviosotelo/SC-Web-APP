import 'package:flutter/foundation.dart';
import '../../core/entities/appointment.dart';
import '../../core/use_cases/appointments/get_appointments_use_case.dart';

class AppointmentController extends ChangeNotifier {
  final GetAppointmentsUseCase _getAppointmentsUseCase;

  AppointmentController(this._getAppointmentsUseCase);

  List<Appointment> _appointments = [];
  bool _isLoading = false;
  String? _errorMessage;

  List<Appointment> get appointments => _appointments;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadAppointments() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _appointments = await _getAppointmentsUseCase.execute();
    } catch (e) {
      _errorMessage = 'Error al cargar turnos';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}