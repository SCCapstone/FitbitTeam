import { EmailTemplatesType } from '../types/email-templates-type';
export declare const emailTemplates: EmailTemplatesType;
export declare type SendMailType = (mail: object) => Promise<void>;
export declare const sendMail: (mail: object) => Promise<void>;
