class FamilyMember {
  final String id;
  final String name;
  final String relation;
  final String documentId;
  final String clientNumber;
  final bool isActive;
  final String? lastActivation;
  final String? avatarUrl;
  final bool isEnrolled;

  const FamilyMember({
    required this.id,
    required this.name,
    required this.relation,
    required this.documentId,
    required this.clientNumber,
    required this.isActive,
    this.lastActivation,
    this.avatarUrl,
    this.isEnrolled = false,
  });
}