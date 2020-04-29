import {MigrationInterface, QueryRunner} from "typeorm";

export class PostChangeDefault1588348738645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `posts` MODIFY COLUMN `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `posts` MODIFY COLUMN `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `posts` MODIFY COLUMN `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `posts` MODIFY COLUMN `updated_at` TIMESTAMP DEFAULT '0000-00-00 00:00:00'");
    }

}
