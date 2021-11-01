import { Injectable } from '@nestjs/common';
import Mailgen = require('mailgen') ;
import dotenv = require('dotenv');
import Nodemailer = require('nodemailer');

dotenv.config();

const emailConfig = {
  dev: 'http://localhost:4200',
  stage: 'http://localhost:4200',
  prod: 'http://localhost:4200',
};

const {
  EMAIL_SERVICE_LOGIN,
  EMAIL_SERVICE_PASSWORD,
  EMAIL_SERVICE_PORT,
  EMAIL_SERVICE_HOST,
  NODE_ENV,
} = process.env;

// TODO: REFACTOR IT !!!!!!!!!!!!!!!!!!!!!!!!
const mailInstance = new Mailgen({
  theme: 'cerberus',
  product: {
    name: 'Contacts Book Eko',
    link: emailConfig.dev,
  },
});

@Injectable()
export class EmailService {
  private sender = Nodemailer;
  
  private link;

  constructor() {
    this.link = this.getLink(NODE_ENV)
  }

  private createTemplate(verifyToken, name = 'Guest') {
    this.link = this.getLink(NODE_ENV);
    const template = {
      body: {
        name,
        intro: 'Welcome to Contacts Book Eko',
        action: {
          instructions: 'For confirm your account click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm',
            link: `${this.link}/api/user/auth/verify/${verifyToken}`,
          },
          outro:
            "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
      },
    };
    return mailInstance.generate(template);
  }

  public async sendEmail(verifyToken, email, name) {
    const emailBody = this.createTemplate(verifyToken, name);

    const transporter = await this.sender.createTransport({
      host: EMAIL_SERVICE_HOST,
      port: EMAIL_SERVICE_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: EMAIL_SERVICE_LOGIN, // generated ethereal user
        pass: EMAIL_SERVICE_PASSWORD, // generated ethereal password
      },
    });

    await transporter.sendMail(
      {
        from: EMAIL_SERVICE_LOGIN,
        to: email,
        subject: 'Ferify your email ✔',
        html: emailBody,
      },
    );
  }

  private getLink(env) {
    switch (env) {
      case 'development':
        return emailConfig.dev;

      case 'production':
        return emailConfig.prod;

      case 'stage':
        return emailConfig.stage;

      default:
        return emailConfig.dev;
    }
  }
}
