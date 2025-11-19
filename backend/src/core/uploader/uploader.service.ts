import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { Repository } from 'typeorm';
import { User } from '@platform/users/entities/user.entity';

@Injectable()
export class UploaderService {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>,
  ) {
    const awsConfig = this.configService.get('app.aws');
    this.s3Client = new S3Client({
      region: awsConfig.region,
      credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
      },
    });
    this.bucket = awsConfig.bucketName;
  }

  async uploadFile(
    file: { buffer: Buffer; originalname: string; mimetype: string },
    owner: User,
  ): Promise<Upload> {
    const key = `uploads/${owner.id}/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    const url = `https://${this.bucket}.s3.${this.configService.get(
      'app.aws.s3.region',
    )}.amazonaws.com/${key}`;

    const newUpload = this.uploadsRepository.create({
      filename: file.originalname,
      key,
      bucket: this.bucket,
      mimetype: file.mimetype,
      size: file.buffer.length,
      url,
      owner,
    });

    return this.uploadsRepository.save(newUpload);
  }
}
