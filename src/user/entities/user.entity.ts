import { Role } from 'src/iam/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
