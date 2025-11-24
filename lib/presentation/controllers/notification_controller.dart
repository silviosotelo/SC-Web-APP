import 'package:flutter/foundation.dart';
import '../../core/entities/notification.dart';
import '../../core/use_cases/notifications/get_notifications_use_case.dart';

class NotificationController extends ChangeNotifier {
  final GetNotificationsUseCase _getNotificationsUseCase;

  NotificationController(this._getNotificationsUseCase);

  List<AppNotification> _notifications = [];
  bool _isLoading = false;
  String? _errorMessage;

  List<AppNotification> get notifications => _notifications;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  int get unreadCount => _notifications.where((n) => !n.isRead).length;

  Future<void> loadNotifications() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _notifications = await _getNotificationsUseCase.execute();
    } catch (e) {
      _errorMessage = 'Error al cargar notificaciones';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}