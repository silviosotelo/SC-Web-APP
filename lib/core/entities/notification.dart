enum NotificationType { appointment, payment, system }

class AppNotification {
  final String id;
  final String title;
  final String message;
  final String date;
  final bool isRead;
  final NotificationType type;

  const AppNotification({
    required this.id,
    required this.title,
    required this.message,
    required this.date,
    required this.isRead,
    required this.type,
  });
}