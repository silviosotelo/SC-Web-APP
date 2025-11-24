import '../../core/entities/user.dart';
import '../../core/repositories/auth_repository.dart';

class AuthRepositoryImpl implements AuthRepository {
  @override
  Future<User> login(String documentId, String password) async {
    await Future.delayed(const Duration(seconds: 1));
    
    return const User(
      id: '1',
      name: 'Jose Luis Fernando Cino Diaz',
      documentId: '2.149.859',
      clientNumber: '197439',
      planName: 'Plan Santa Clara Superior',
    );
  }

  @override
  Future<void> logout() async {
    await Future.delayed(const Duration(milliseconds: 500));
  }

  @override
  Future<User?> getCurrentUser() async {
    await Future.delayed(const Duration(milliseconds: 300));
    return const User(
      id: '1',
      name: 'Jose Luis Fernando Cino Diaz',
      documentId: '2.149.859',
      clientNumber: '197439',
      planName: 'Plan Santa Clara Superior',
    );
  }
}