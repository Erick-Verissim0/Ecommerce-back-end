import { User } from 'src/domain/entities/users';
import { UserModel } from 'src/infraestructure/config/typeorm/models/users.typeorm.';

export class UserMapper {
  static toDomain(model: UserModel): User {
    return new User(
      model.name,
      model.email,
      model.type,
      model.password,
      model.id,
      model.created_at,
      model.updated_at,
      model.deleted_at,
    );
  }

  static toModel(domain: User): UserModel {
    const model = new UserModel();
    model.id = domain.id;
    model.name = domain.name;
    model.email = domain.name;
    model.password = domain.password;
    model.type = domain.type;
    model.created_at = domain.created_at;
    model.updated_at = domain.updated_at;
    model.deleted_at = domain.deleted_at;

    return model;
  }
}
