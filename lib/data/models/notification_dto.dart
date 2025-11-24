import '../../core/entities/notification.dart';

class NotificationDto {
  final String id;
  final String title;
  final String message;
  final String date;
  final bool read;
  final String type;

  NotificationDto({
    required this.id,
    required this.title,
    required this.message,
    required this.date,
    required this.read,
    required this.type,
  });

  factory NotificationDto.fromJson(Map<String, dynamic> json) =>
      NotificationDto(
        id: json['id'] as String,
        title: json['title'] as String,
        message: json['message'] as String,
        date: json['date'] as String,
        read: json['read'] as bool,
        type: json['type'] as String,
      );

  AppNotification toEntity() => AppNotification(
        id: id,
        title: title,
        message: message,
        date: date,
        isRead: read,
        type: _parseType(type),
      );

  NotificationType _parseType(String type) {
    switch (type.toLowerCase()) {
      case 'appointment':
        return NotificationType.appointment;
      case 'payment':
        return NotificationType.payment;
      case 'system':
        return NotificationType.system;
      default:
        return NotificationType.system;
    }
  }
}