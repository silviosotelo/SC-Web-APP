import '../../core/entities/notification.dart';
import '../../core/repositories/notification_repository.dart';
import '../data_sources/mock_data_source.dart';

class NotificationRepositoryImpl implements NotificationRepository {
  @override
  Future<List<AppNotification>> getNotifications() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return MockDataSource.notifications;
  }

  @override
  Future<void> markAsRead(String notificationId) async {
    await Future.delayed(const Duration(milliseconds: 300));
  }

  @override
  Future<int> getUnreadCount() async {
    await Future.delayed(const Duration(milliseconds: 200));
    return MockDataSource.notifications.where((n) => !n.isRead).length;
  }
}