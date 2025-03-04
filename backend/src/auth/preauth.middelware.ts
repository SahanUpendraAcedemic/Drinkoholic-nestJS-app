import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import * as firebase from 'firebase-admin';
import * as serviceAccount from '../../secrets/drinkoholic-app-firebase-adminsdk-fbsvc-691b77db6a.json';
const firebaseCreds = {
  type: 'service_account',
  project_id: 'drinkoholic-app',
  private_key_id: '691b77db6a473cc1618a529c73fce12a5554d81a',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC6v//Eel7Jsb8T\nZaEqfdrJe+Nud/fyDeD4EWf/mkRvXHX2d130J5Lp3pDSQ0h6/JVKQPm+8LHhaslj\nSYDPPepyRrAqGithbz2I4FjhmcoUIbXmGwiFClZf3UREJRw4kZPX65bUbpi6F8t2\nWd5kF1dv5BkDujk3QcNIch7sGJ2VnSTR1iiZLACgsXM5POSW3aoszkGXXu8oxrSv\nIU4ES+TVO2pyBWLkaiZGJ0KkdnuZNwvBb+BKKhAddz7ZWzYLEytK25QaAM4la2Xw\n0kZu7yMtmHFEEc7szboURIIl7y1GGOQzpKhOkrAz7H7VHirb+shEslDPGrq5f1Ey\ng9zyJp/zAgMBAAECggEADqO1d6AGJTaHXYxmfW+/QnMxSXwjFjkLTTcEGY/s1HQB\nlVAXL+gYRrgZTzpSCL4bL+Z3DYZN03dtERj2fYiDg/DRp4NEqk8vmjbIEOte4YQg\n/8hXuyIr0jkEvHjSRQb4eYEw4jdHRrNN0lnKKrt/sbhGU7n5+UBxABFeJjDpzYwR\nRa9AABHer2bGuNTVcXi6p/7iO1wYVU29RpykEctTmBUrGHuHjlMxUy6jbMf7hGN+\nrtUluyC2KLIjNKDaxpaNDJtfun4Pu4wz7LS/NuzCBZLKM0FrsDKt1yO3pUOB6T8p\nHRCLBKenBltkEpUyPlghyHeIz5/3fbyBz6qS5VHcjQKBgQDh9mxoQwMQ9uPimec8\nKPRYx3S9WWCaU7okf+/3m0QbJepqqhB5/uFQjMpKY6tJE28mkg1YW6wQk25oG+f3\nQHfcH0ba2OdvKI0WyyzPpqzOnr8bt0PsghXALWGNt3gdG+quRCzyTV5eTbKu+CsZ\n6yd5ctaPRRRUxGLj5r8BHX8rDwKBgQDTkyiwf+x0hUed2MkTH9g4UgOGLGMm8bKR\nHRVy5CPMNKwnVpziOgiEFZmISjD1qXuzvNwcu/e+JHEjI/8lmvpnAYDsr2hXAnPZ\ndDG9DvgDEekRFO7THP2vnWjoX6h154E74Pv6z0Q7RrNGe+SMqnJ7gxY3oKijUAZ/\n37GyNApM3QKBgBGISj8IvAsr7OCfKmbrkpH03+T1M16mEnJUjuz6Wh11IqwmB+M/\nWIIkemmtNBQWcvBeMrThYAdlORLQ3326vdIRhzDh1Ys1bUUQfKib+RqLDK782ENY\nkJF5s/EIBETV7q6Y0Zf3UtQkWTHkRYvcSBLPS0CQjpRJLJccR0Ox4zUXAoGAXU1H\nI1a2isf/xh9ExPdFHcklHrVSYGkz6wSdYdYz5yjPRmXOt4EKIl14IH8/Sgacs620\nj8NgxGxDrFCCgy3uASDLnxTXeY9uUVYJXStNueTbGBpYG6dsRFaxXdBZdO1Ls4FK\n/dcLauyJwKqAJnxAEjHDyXJDDAoNY7TdIw4KAM0CgYBujhun73H8zAqNq0yWMN4B\nVtDkKEP+Ou9c1ED0W8f/kw3PXQdXti+wbz1fLU9WnwaBt6cH6emiY4l0/2syW9rf\nhwQG9m8khin9U+OD9bDNf6gYzFhN43br/HU6ku9ksURCqIRVpiDXyY68D6dsvKTw\nGGnogQ6VlDIr5iT7/PyXEg==\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-fbsvc@drinkoholic-app.iam.gserviceaccount.com',
  client_id: '107609181092146374796',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40drinkoholic-app.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  private firebaseApp: any;
  constructor() {
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount as any),
    });
  }

  use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.firebaseApp
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodeToken) => {
          const user = {
            email: decodeToken.email,
          };
          req.user = user;
          next();
        })
        .catch((err) => {
          console.log(err);
          this.acessDenied(req.url, res);
        });
    } else {
      next();
    }
  }

  private acessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }
}
