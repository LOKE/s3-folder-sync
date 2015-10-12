# s3-folder-sync
Command line wrapper around [s3-sync](https://www.npmjs.com/package/s3-sync).

Used by LOKE to sync static website content with an S3 bucket.

## Usage

```bash
s3fsync directory
```

eg to sync the current directory run:

```bash
s3fsync .
```

This will require the S3 target details to be conigured as environment variables (see below).

Alternatively you can specify the credentials as command line parameters:

```bash
s3fsync --key={yourawskey} --secret={yourawssecret} --bucket={yourawsbucket} --
```

## Enironment Variables

Instead of specifying via command line, you may specify the S3 target using the following environment variables:

- AWS_ACCESS_KEY
- AWS_SECRET_KEY
- S3_BUCKET
- S3_REGION

