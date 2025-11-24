import '../../core/entities/family_member.dart';

class FamilyMemberDto {
  final String id;
  final String name;
  final String relation;
  final String documentId;
  final String clientNumber;
  final String status;
  final String? lastActivation;
  final String? avatarUrl;
  final bool? isEnrolled;

  FamilyMemberDto({
    required this.id,
    required this.name,
    required this.relation,
    required this.documentId,
    required this.clientNumber,
    required this.status,
    this.lastActivation,
    this.avatarUrl,
    this.isEnrolled,
  });

  factory FamilyMemberDto.fromJson(Map<String, dynamic> json) =>
      FamilyMemberDto(
        id: json['id'] as String,
        name: json['name'] as String,
        relation: json['relation'] as String,
        documentId: json['documentId'] as String,
        clientNumber: json['clientNumber'] as String,
        status: json['status'] as String,
        lastActivation: json['lastActivation'] as String?,
        avatarUrl: json['avatarUrl'] as String?,
        isEnrolled: json['isEnrolled'] as bool?,
      );

  FamilyMember toEntity() => FamilyMember(
        id: id,
        name: name,
        relation: relation,
        documentId: documentId,
        clientNumber: clientNumber,
        isActive: status == 'active',
        lastActivation: lastActivation,
        avatarUrl: avatarUrl,
        isEnrolled: isEnrolled ?? false,
      );
}