import '../../core/entities/appointment.dart';

class AppointmentDto {
  final String id;
  final String doctorName;
  final String specialty;
  final String date;
  final String time;
  final String location;
  final String status;
  final String patientName;
  final String? mode;

  AppointmentDto({
    required this.id,
    required this.doctorName,
    required this.specialty,
    required this.date,
    required this.time,
    required this.location,
    required this.status,
    required this.patientName,
    this.mode,
  });

  factory AppointmentDto.fromJson(Map<String, dynamic> json) =>
      AppointmentDto(
        id: json['id'] as String,
        doctorName: json['doctorName'] as String,
        specialty: json['specialty'] as String,
        date: json['date'] as String,
        time: json['time'] as String,
        location: json['location'] as String,
        status: json['status'] as String,
        patientName: json['patientName'] as String,
        mode: json['mode'] as String?,
      );

  Appointment toEntity() => Appointment(
        id: id,
        doctorName: doctorName,
        specialty: specialty,
        date: date,
        time: time,
        location: location,
        status: _parseStatus(status),
        patientName: patientName,
        mode: _parseMode(mode),
      );

  AppointmentStatus _parseStatus(String status) {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return AppointmentStatus.confirmed;
      case 'cancelled':
        return AppointmentStatus.cancelled;
      case 'completed':
        return AppointmentStatus.completed;
      default:
        return AppointmentStatus.confirmed;
    }
  }

  AppointmentMode _parseMode(String? mode) {
    if (mode?.toUpperCase() == 'TELEMEDICINA') {
      return AppointmentMode.telemedicine;
    }
    return AppointmentMode.inPerson;
  }
}