import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer,{Transporter} from "nodemailer"
import handlebars from "handlebars"
import fs from "fs"


@injectable()
class EtherealIMailProvider implements IMailProvider{
    private client: Transporter
    constructor(){
        nodemailer.createTestAccount().then(account =>{
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            })

            this.client = transporter
        }).catch((err) => console.error(err))
    }
    async sendMail(to: string, subject: string,variables:any,path:string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8")

        const templateParce = handlebars.compile(templateFileContent)

        const templeteHtml = templateParce(variables)
        const message= await this.client.sendMail({
            to,
            from:"Autorent <noreplay@autorent.com.br>",
            subject,
            html:templeteHtml
        })
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}

export {EtherealIMailProvider}