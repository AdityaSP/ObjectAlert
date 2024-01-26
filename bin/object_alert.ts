#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { ObjectAlertStack } from '../lib/object_alert-stack';
import { S3Stack } from '../lib/s3_stack';

const app = new cdk.App();
const o1 = new ObjectAlertStack(app, 'ObjectAlertStack',{
  env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION
  }
});
const o2 = new S3Stack(app, 'TeamS2stack',{
  env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION
  }
});