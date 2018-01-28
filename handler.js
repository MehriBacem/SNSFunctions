'use strict';

const AWS = require('aws-sdk');
const SNS = new AWS.SNS();

module.exports.FirstLambdaFunction = (event, context, callback) => {

    SNS.publish({
        Message: 'First Communication between two lambda functions',
        TopicArn: '<arn SNSTopic>'
    }, function(err, data) {
        if (err) {
            console.log(err.stack);
            return;
        }
        console.log('Push to Topic');
        console.log(data);

    });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'SNS Publisher executed successfully'
    }),
  };
  callback(null, response);
};

module.exports.SecondLambdaFunction = (event, context, callback) => {
  var topic = event.Records[0].Sns.TopicArn;
  var message = event.Records[0].Sns.Message;

  const response = {
     message: 'Second lambda function was triggered from the topic ' + topic + ' with message ' + message

  };

  console.log(response.message) ;

  callback(null,response);
};