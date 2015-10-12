'use strict';

var path      = require('path');
var chalk     = require('chalk');
var readdirp  = require('readdirp');
var s3sync    = require('s3-sync');

function main() {
  try {
    sync(process.argv.slice(2));
  } catch(err) {
    console.error(err.toString());
  }
}

function log(details) {
  var color = details.fresh  ? chalk.green :
              details.cached ? chalk.grey  :
              /* else */       chalk.yellow;
  console.log(color(details.path));
}

function sync(args) {
  var argv = require('minimist')(args);

  var paths = argv._;

  if (paths.length === 0) throw new Error('Usage s3fsync localpath');
  if (paths.length > 1) throw new Error('Only 1 path allowed');
  var localPath = path.resolve(paths[0]);

  var s3AccessKey = argv.key    || process.env.AWS_ACCESS_KEY;
  var s3SecretKey = argv.secret || process.env.AWS_SECRET_KEY;
  var s3Bucket    = argv.bucket || process.env.S3_BUCKET;
  var s3Region    = argv.region || process.env.S3_REGION;

  if (!s3Bucket    || !s3Region)    throw new Error('No bucket details supplied. Please set env S3_BUCKET & S3_REGION');
  if (!s3AccessKey || !s3SecretKey) throw new Error('No S3 credentials supplied. Please set env AWS_ACCESS_KEY & AWS_SECRET_KEY.');

  console.log('Syncing local folder \'' + localPath + '\' to bucket \'' + s3Bucket + '\'');

  readdirp({root: localPath})
  .pipe(s3sync({
    region      : s3Region,
    bucket      : s3Bucket,
    key         : s3AccessKey,
    secret      : s3SecretKey,
    concurrency : 16
  }))
  .on('data', log);
}

main();
