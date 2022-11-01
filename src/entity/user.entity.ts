import { Field, ID, ObjectType } from '@nestjs/graphql';
import cuid from 'cuid';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@ObjectType()
@Entity('User')
export class User extends DefaultEntity {
  constructor(param?: Partial<User>) {
    super();
    Object.assign(this, param);
  }

  @Index()
  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true, default: null, unique: true })
  email!: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  password!: string | null;

  /**
   * @description revoke jwt
   */
  @Column({ type: 'varchar' })
  cert!: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: '0' })
  active!: boolean;

  @Field(() => ID, { nullable: true })
  @Column({ type: adaptType('char'), length: 2, nullable: true, default: null })
  nationId!: string | null;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'date', nullable: true, default: null })
  birthday!: Date | null;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'tinyint', nullable: true, default: null })
  gender!: Define.Gender.Type | null;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true, default: null })
  phoneNumber!: string | null;

  @ManyToOne(() => Nation, { cascade: config.enableCascadeForTesting })
  @JoinColumn({ name: 'nationId', referencedColumnName: 'id' })
  nation?: Nation;

  @OneToOne(() => UserFacebook, (x) => x.user, { cascade: true })
  facebook?: UserFacebook;

  @OneToOne(() => UserApple, (x) => x.user, { cascade: true })
  apple?: UserApple;

  /**
   * @description shows belong to this user
   */
  @OneToMany(() => Show, (x) => x.user, { cascade: ['insert'] })
  shows?: Show[];

  @BeforeInsert()
  initCert() {
    if (!this.cert) {
      this.cert = cuid();
    }
  }
}
