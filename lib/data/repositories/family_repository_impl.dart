import '../../core/entities/family_member.dart';
import '../../core/repositories/family_repository.dart';
import '../data_sources/mock_data_source.dart';

class FamilyRepositoryImpl implements FamilyRepository {
  @override
  Future<List<FamilyMember>> getFamilyMembers() async {
    await Future.delayed(const Duration(milliseconds: 600));
    return MockDataSource.familyMembers;
  }

  @override
  Future<FamilyMember> getFamilyMemberById(String id) async {
    await Future.delayed(const Duration(milliseconds: 400));
    return MockDataSource.familyMembers.firstWhere((m) => m.id == id);
  }
}