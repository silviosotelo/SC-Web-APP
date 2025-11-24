import 'package:flutter/foundation.dart';
import '../../core/entities/user.dart';
import '../../core/use_cases/auth/login_use_case.dart';

class AuthController extends ChangeNotifier {
  final LoginUseCase _loginUseCase;

  AuthController(this._loginUseCase);

  User? _currentUser;
  bool _isLoading = false;
  String? _errorMessage;

  User? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _currentUser != null;

  Future<void> login(String documentId, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _currentUser = await _loginUseCase.execute(documentId, password);
    } catch (e) {
      _errorMessage = 'Error al iniciar sesión';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void logout() {
    _currentUser = null;
    notifyListeners();
  }
}