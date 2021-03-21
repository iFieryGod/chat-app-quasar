import AWSAppSyncClient from 'aws-appsync';
import { Auth } from '@aws-amplify/auth';
import AwsExports from '../aws-exports';

export default new AWSAppSyncClient({
  url: AwsExports.aws_appsync_graphqlEndpoint,
  region: AwsExports.aws_appsync_region,
  auth: {
    type: AwsExports.aws_appsync_authenticationType,
    jwtToken: async () => (await
    Auth.currentSession()).getIdToken.jwtToken,
  },
});
