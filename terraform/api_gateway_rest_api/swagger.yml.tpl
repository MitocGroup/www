---
swagger: "2.0"
info:
  version: "2019-12-23T15:39:32Z"
  title: "${title}"
host: "${host}"
basePath: "/v1"
schemes:
  - "https"
paths:
  /image/handler/{proxy+}:
    x-amazon-apigateway-any-method:
      parameters:
        - name: "proxy"
          in: "path"
          required: true
          type: "string"
      responses: {}
      x-amazon-apigateway-integration:
        credentials: "${iam_api_exec_access_role_arn}"
        uri: "${lambda_image_handler_uri}"
        responses:
          default:
            statusCode: "200"
        passthroughBehavior: "when_no_match"
        httpMethod: "POST"
        cacheNamespace: "xh7gp9"
        cacheKeyParameters:
          - "method.request.path.proxy"
        contentHandling: "CONVERT_TO_TEXT"
        type: "aws_proxy"
definitions:
  Empty:
    type: "object"
    title: "Empty Schema"
x-amazon-apigateway-binary-media-types: ["*/*"]