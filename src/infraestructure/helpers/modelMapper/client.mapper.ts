import { Client } from 'src/domain/entities/clients';
import { ClientModel } from 'src/infraestructure/config/typeorm/models/clients.typeorm';
import { UserModel } from 'src/infraestructure/config/typeorm/models/users.typeorm.';

export class ClientMapper {
  static toDomain(model: ClientModel): Client {
    return new Client(
      model.name,
      model.contact,
      model.address,
      model.status,
      model.id,
      model.user.id,
      model.created_at,
      model.updated_at,
      model.deleted_at,
    );
  }

  static toModel(domain: Client): ClientModel {
    const model = new ClientModel();
    model.id = domain.id;
    model.user = { id: domain.user_id } as UserModel;
    model.name = domain.name;
    model.contact = domain.contact;
    model.address = domain.address;
    model.status = domain.status;
    model.created_at = domain.created_at;
    model.updated_at = domain.updated_at;
    model.deleted_at = domain.deleted_at;

    return model;
  }
}
