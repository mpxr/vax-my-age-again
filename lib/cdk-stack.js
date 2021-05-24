const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const dynamodb = require("@aws-cdk/aws-dynamodb");
const events = require("@aws-cdk/aws-events");
const eventTargets = require("@aws-cdk/aws-events-targets");

require("dotenv").config();

class CdkStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "VaxAgeChanges", {
      partitionKey: {
        name: "age",
        type: dynamodb.AttributeType.NUMBER,
      },
      sortKey: {
        name: "timestamp",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PROVISIONED,
    });

    const vaxFunction = new lambda.Function(this, "VaxHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("build"),
      handler: "out.handler",
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    table.grantReadWriteData(vaxFunction);

    new events.Rule(this, "VaxScheduleRule", {
      schedule: events.Schedule.rate(cdk.Duration.minutes(60)),
      targets: [new eventTargets.LambdaFunction(vaxFunction)],
    });
  }
}

module.exports = { CdkStack };
