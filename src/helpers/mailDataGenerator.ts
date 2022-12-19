import { Credilink } from "~/models/credilink-model";

export const prepareMailData = (
  credilink: Credilink,
  store: any,
  qr: string
) => {
  const info = {
    credilink: credilink.bg,
    store,
    qr
    // template_name: regalink.template,
    // template_content: [{}],
    // message: {
    //   subject: regalink.subject,
    //   from_name: regalink.senderName,
    //   from_email: regalink.sender,
    //   to: [
    //     {
    //       email: store.customer.email,
    //       type: "to",
    //     },
    //   ],
    //   track_opens: true,
    //   track_clicks: true,
    //   merge_language: "handlebars",
    //   global_merge_vars: [
    //     {
    //       name: "name",
    //       content: name,
    //     },
    //     {
    //       name: "body",
    //       content: regalink.bodyMail,
    //     },
    //     {
    //       name: "cupon",
    //       content: encodeURIComponent(qr),
    //     },
    //     {
    //       name: "logoCommerce",
    //       content: regalink.logo,
    //     },
    //     {
    //       name: "terms",
    //       content: regalink.terms,
    //     },
    //     {
    //       name: "amount",
    //       content: regalink.amount / 100,
    //     },
    //     {
    //       name: "expiration",
    //       content: regalink.expiration,
    //     },
    //   ],
    // },
  };
  return info;
};

export const mailChimpMock = (templateData: any) => {
  console.log(templateData?.name);
  return true;
};
