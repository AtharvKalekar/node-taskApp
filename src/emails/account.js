const sgMail = require('@sendgrid/mail');
const sendgridApiKey = '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';

sgMail.setApiKey(sendgridApiKey);

const sendWelcomeEmail=(email, name )=>{
    sgMail.send({
        to:email,
        from:'atharvkalekar@gmail.com',
        subject:'Thanks for joining  in!',
        text: `Hello Jee, this is a test email.${name}`,
        html: '<p>Hello Jee, this is a test email.</p>'
    })
}

module.exp={
    sendWelcomeEmail
}
