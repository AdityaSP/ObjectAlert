import * as cdk from 'aws-cdk-lib';
import { EventType } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class S3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaname = cdk.Fn.importValue('alert-lambda-name-export')

    // const getalertLambda = cdk.aws_lambda.Function.fromFunctionArn(this, 'getalertlambda', 'arn:aws:lambda:us-east-1:008239258920:function:ObjectAlertStack-alertLambda155CC12E-SqgCwpMO7AbI')

    const getalertLambda = cdk.aws_lambda.Function.fromFunctionName(this, 'getalertlambda', lambdaname)

    const s3bucket = new cdk.aws_s3.Bucket(this, 'objectalerts3');
    s3bucket.addEventNotification(EventType.OBJECT_CREATED, new cdk.aws_s3_notifications.LambdaDestination(getalertLambda))
    s3bucket.addEventNotification(EventType.OBJECT_REMOVED, new cdk.aws_s3_notifications.LambdaDestination(getalertLambda))

  }
}
