interface User {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
    role?: UserRole;
}

type UserRole = 'USER' | 'ADMIN';

/**
 * 
 * export class CreateUserDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString()
  birthDate: string; // Guardamos como string validado, TypeORM lo parsea a Date

  @ApiProperty({ example: 'dev@tutor.com' })
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'MiSuperPassword123' })
  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiPropertyOptional({ enum: UserRole, default: UserRole.USER })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

 */