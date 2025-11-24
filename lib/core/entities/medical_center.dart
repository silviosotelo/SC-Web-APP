enum CenterType { ambulance, hospital, diagnostics, laboratory, dentistry }

class MedicalCenter {
  final String id;
  final String name;
  final String address;
  final String phone;
  final CenterType type;
  final String? notes;

  const MedicalCenter({
    required this.id,
    required this.name,
    required this.address,
    required this.phone,
    required this.type,
    this.notes,
  });
}