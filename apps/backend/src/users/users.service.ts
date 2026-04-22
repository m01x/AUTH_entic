import {
  Injectable,
  BadRequestException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    // 1. Validar si el correo ya existe
    const userExists = await this.userRepository.findOneBy({
      email: userData.email,
    });
    if (userExists) {
      throw new BadRequestException('El correo ya está registrado');
    }

    // 2. Encriptar contraseña (10 salt rounds es el estándar seguro)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3. Crear la instancia del usuario
    const newUser = this.userRepository.create({
      ...userData,
      passwordHash,
    });

    // 4. Guardar en base de datos
    await this.userRepository.save(newUser);

    // 5. Retornar el usuario SIN el hash de la contraseña por seguridad
    const { passwordHash: _, ...result } = newUser;
    return result;
  }

  async findAll() {
    // Realizamos consulta excluyendo explícitamente el passwordHash
    const userList = await this.userRepository.find({
      select: [
        'id',
        'firstName',
        'lastName',
        'birthDate',
        'email',
        'role',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });

    // Eliminamos el throw BadRequestException.
    // Si no hay usuarios, devolver un arreglo vacío [] es lo correcto en REST.
    return userList;
  }

  findById(_id: string) {
    throw new NotImplementedException('no implementado');
  }

  remove(_id: string) {
    throw new NotImplementedException('no implementado');
  }

  update(_id: string, _updateUserDto: UpdateUserDto) {
    throw new NotImplementedException('no implementado');
  }
}
