class Doctor {
  final String id;
  final String name;
  final String specialty;
  final String location;
  final String? imageUrl;

  const Doctor({
    required this.id,
    required this.name,
    required this.specialty,
    required this.location,
    this.imageUrl,
  });
}