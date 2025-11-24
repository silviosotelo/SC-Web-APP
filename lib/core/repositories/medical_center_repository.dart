import '../entities/medical_center.dart';

abstract class MedicalCenterRepository {
  Future<List<MedicalCenter>> getCentersByType(String type);
  Future<List<MedicalCenter>> searchCenters(String query);
}