import '../../core/entities/medical_center.dart';
import '../../core/repositories/medical_center_repository.dart';
import '../data_sources/mock_data_source.dart';

class MedicalCenterRepositoryImpl implements MedicalCenterRepository {
  @override
  Future<List<MedicalCenter>> getCentersByType(String type) async {
    await Future.delayed(const Duration(milliseconds: 600));
    return MockDataSource.centers;
  }

  @override
  Future<List<MedicalCenter>> searchCenters(String query) async {
    await Future.delayed(const Duration(milliseconds: 500));
    return MockDataSource.centers
        .where((c) => c.name.toLowerCase().contains(query.toLowerCase()))
        .toList();
  }
}