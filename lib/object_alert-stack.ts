import * as cdk from 'aws-cdk-lib';
import { EventType } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ObjectAlertStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    const s3bucket = new cdk.aws_s3.Bucket(this, 'objectalerts3');

    const snsObjectAlert = new cdk.aws_sns.Topic(this, 'objectalertid', {
      topicName : 'ObjectSizeAlertTopic'
    })

    const emailAddress = new cdk.aws_sns_subscriptions.EmailSubscription('sp.aditya@gmail.com')

    snsObjectAlert.addSubscription(emailAddress)

    const alertLambda = new cdk.aws_lambda.Function(this, 'alertLambda', {
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_12,
      code: cdk.aws_lambda.Code.fromAsset('./lambda'),
      handler: 'alertScript.lambda_handler',
      environment: {'ALERT_TOPIC_ARN': snsObjectAlert.topicArn}
    })

    const snsPolicy = new cdk.aws_iam.PolicyStatement({
      actions: ['sns:publish'],
      resources: ['*']
    })
    alertLambda.addToRolePolicy(snsPolicy);

    // const eventarray = [EventType.OBJECT_CREATED, EventType.OBJECT_REMOVED]

    // eventarray.forEach(element => {
    //   s3bucket.addEventNotification(element, new LambdaDestination(alertLambda))
    // });

    // for (let index = 0; index < eventarray.length; index++) {
    //   const element = eventarray[index];
    //   s3bucket.addEventNotification(element, new LambdaDestination(alertLambda))
    // }

    s3bucket.addEventNotification(EventType.OBJECT_CREATED, new cdk.aws_s3_notifications.LambdaDestination(alertLambda))
    s3bucket.addEventNotification(EventType.OBJECT_REMOVED, new cdk.aws_s3_notifications.LambdaDestination(alertLambda))

  }
}
