enum AppointmentStatus { confirmed, cancelled, completed }

enum AppointmentMode { inPerson, telemedicine }

class Appointment {
  final String id;
  final String doctorName;
  final String specialty;
  final String date;
  final String time;
  final String location;
  final AppointmentStatus status;
  final String patientName;
  final AppointmentMode mode;

  const Appointment({
    required this.id,
    required this.doctorName,
    required this.specialty,
    required this.date,
    required this.time,
    required this.location,
    required this.status,
    required this.patientName,
    required this.mode,
  });
}