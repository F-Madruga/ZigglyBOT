import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ name: 'username', length: 255 })
	username: string;

	@Column({ name: 'discriminator', length: 255 })
	discriminator: string;

	@Column({ name: 'discord_id', length: 255, unique: true })
	discordId: string;

	@Column({ name: 'profile_image_url', length: 255 })
	profileImageUrl: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
