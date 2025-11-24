import '../../entities/family_member.dart';
import '../../repositories/family_repository.dart';

class GetFamilyMembersUseCase {
  final FamilyRepository _repository;

  GetFamilyMembersUseCase(this._repository);

  Future<List<FamilyMember>> execute() async {
    return await _repository.getFamilyMembers();
  }
}