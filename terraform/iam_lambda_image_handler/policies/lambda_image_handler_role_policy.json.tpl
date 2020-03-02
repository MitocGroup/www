{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:PutLogEvents",
        "logs:CreateLogStream",
        "logs:CreateLogGroup"
      ],
      "Resource": "arn:aws:logs:${region}:${account_id}:log-group:/aws/lambda/*"
    },
    {
      "Effect": "Allow",
      "Action": "rekognition:DetectFaces",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3::::*.mitocgroup.com/*",
        "arn:aws:s3::::*.mitocgroup.com"
      ]
    }
  ]
}
