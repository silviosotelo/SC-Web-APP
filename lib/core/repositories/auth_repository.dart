import '../entities/user.dart';

abstract class AuthRepository {
  Future<User> login(String documentId, String password);
  Future<void> logout();
  Future<User?> getCurrentUser();
}