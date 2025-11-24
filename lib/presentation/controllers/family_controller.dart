import 'package:flutter/foundation.dart';
import '../../core/entities/family_member.dart';
import '../../core/use_cases/family/get_family_members_use_case.dart';

class FamilyController extends ChangeNotifier {
  final GetFamilyMembersUseCase _getFamilyMembersUseCase;

  FamilyController(this._getFamilyMembersUseCase);

  List<FamilyMember> _members = [];
  bool _isLoading = false;
  String? _errorMessage;

  List<FamilyMember> get members => _members;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadMembers() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _members = await _getFamilyMembersUseCase.execute();
    } catch (e) {
      _errorMessage = 'Error al cargar miembros';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}