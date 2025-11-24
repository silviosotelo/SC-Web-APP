enum RequestStatus { pending, approved, rejected }

class MedicalRequest {
  final String id;
  final String type;
  final String date;
  final RequestStatus status;
  final String description;

  const MedicalRequest({
    required this.id,
    required this.type,
    required this.date,
    required this.status,
    required this.description,
  });
}