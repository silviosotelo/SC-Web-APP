import '../entities/family_member.dart';

abstract class FamilyRepository {
  Future<List<FamilyMember>> getFamilyMembers();
  Future<FamilyMember> getFamilyMemberById(String id);
}