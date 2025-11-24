import '../../core/entities/user.dart';

class UserDto {
  final String id;
  final String name;
  final String documentId;
  final String clientNumber;
  final String planName;

  UserDto({
    required this.id,
    required this.name,
    required this.documentId,
    required this.clientNumber,
    required this.planName,
  });

  factory UserDto.fromJson(Map<String, dynamic> json) => UserDto(
        id: json['id'] as String,
        name: json['name'] as String,
        documentId: json['documentId'] as String,
        clientNumber: json['clientNumber'] as String,
        planName: json['planName'] as String? ?? 'Plan Santa Clara',
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'documentId': documentId,
        'clientNumber': clientNumber,
        'planName': planName,
      };

  User toEntity() => User(
        id: id,
        name: name,
        documentId: documentId,
        clientNumber: clientNumber,
        planName: planName,
      );
}