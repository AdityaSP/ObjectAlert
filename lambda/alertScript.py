import boto3
import os
client = boto3.client('sns')
def lambda_handler(event, context):
    client.publish(TopicArn=os.environ['ALERT_TOPIC_ARN'], Message="Object uploaded to S3 " + str(event))
    return { 'statusCode': 200}