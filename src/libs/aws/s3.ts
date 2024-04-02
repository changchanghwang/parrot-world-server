import { S3 } from 'aws-sdk';

export class Bucket {
  client: S3;

  bucketId = 'parrot-world-client-img';

  constructor() {
    this.client = new S3({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
      },
      signatureVersion: 'v4',
      params: {
        Bucket: this.bucketId,
      },
      region: process.env.AWS_REGION,
    });
  }

  async upload(key: string, data: any) {
    await this.client
      .putObject({
        Body: data,
        Key: key,
        Bucket: this.bucketId,
      })
      .promise();
  }

  async getPublicUrl(key: string, expires: number = 3600) {
    return this.client.getSignedUrlPromise('getObject', {
      Bucket: this.bucketId,
      Key: key,
      Expires: expires,
    });
  }
}
