interface ModelStyles {
  textSize: {
    normal: string;
    subtitle: string;
    title: string;
    input: string;
  };
  textWeight: {
    normal: string;
    subTitle: string;
    title: string;
  };
  input: {
    height: string;
    width: string;
    border: string;
    textColor: string;
    bgColor: string;
  };
  imgSize: {
    commerce: string;
    issuer: string;
    qr: string;
  };
  bgColor: {
    fluxIndigo: string;
    fluxIndigo2: string;
  };
  labelSize: {
    height: string;
    width: string;
    top: string;
    bottom: string;
  };
  form: {
    width: string;
    gap: string;
    padding: string;
    labelSize: string;
  };
  issuerBtn: {
    boxSize: string;
    borderRadius: string;
    boxShadow: string;
  };
}

export const modelStylesData: ModelStyles = {
  textSize: {
    normal:
      "text-[6px] sc200:text-[8px] sc250:text-[10px] sc300:text-[12px] sc350:text-[13px] sc400:text-[14px] cs500:text-[16px]",
    subtitle:
      "text-[8px] sc200:text-[10px] sc250:text-[12px] sc300:text-[14px] sc350:text-[15px] sc400:text-[16px] cs500:text-[18px]",
    title:
      "text-[10px] sc200:text-[12px] sc250:text-[14px] sc300:text-[16px] sc350:text-[17px] sc400:text-[18px] cs500:text-[20px]",
    input:
      "text-[9px] sc200:text-[11px] sc250:text-[13px] sc300:text-[15px] sc350:text-[16px] sc400:text-[17px] cs500:text-[19px]",
  },
  textWeight: {
    normal: "font-semibold",
    subTitle: "font-bold",
    title: "font-extrabold",
  },
  input: {
    height: "h-[30px] sc200:h-[36px] sc300:h-[38px] sc400:h-[40px]",
    width: "",
    border: "rounded-[15px] border-[#A8A8A8]",
    textColor: "text-[#A8A8A8]",
    bgColor: "bg-[#F2F2F2]",
  },
  imgSize: {
    commerce:
      "w-auto py-[5px] sc300:py-[14px] sc400:py-[16px] h-[50px] sc200:h-[60px] sc300:h-[65px] sc350:h-[70px] sc400:h-[80px] sc500:h-[100px]",
    issuer:
      "w-[60px] sc200:w-[80px] sc300:w-[100px] sc350:w-[120px] sc400:w-[140px] sc500:w-[200px]",
    qr: "w-[80px] sc200:w-[100px] sc300:w-[120px] sc350:w-[150px] sc400:w-[200px] sc500:w-[240px]",
  },
  bgColor: {
    fluxIndigo: "bg-[#182c4c]",
    fluxIndigo2: "bg-[#1B284A]",
  },
  labelSize: {
    height:
      "h-[50px] sc200:h-[60px] sc300:h-[65px] sc350:h-[70px] sc400:h-[80px] sc500:h-[100px]",
    width: "w-screen sc600:w-[600px]",
    top: "top-[50px] sc200:top-[60px] sc300:top-[65px] sc350:top-[70px] sc400:top-[80px] sc500:top-[100px]",
    bottom:
      "bottom-[50px] sc200:bottom-[60px] sc300:bottom-[65px] sc350:bottom-[70px] sc400:bottom-[80px] sc500:bottom[100px]",
  },
  form: {
    width: "w-[40px] sc300:w-[60px] sc400:w-[80px] sc500:w-[100px]",
    gap: "gap-[6px] sc200:gap-[8px] sc250:gap-[9px] sc300:gap-[10px] sc400:gap-[15px] sc500:gap-[20px]",
    padding:
      "pt-[6px] sc200:pt-[8px] sc250:pt-[10px] sc300:pt-[12px] sc400:pt-[13px] sc500:pt-[14px]",
    labelSize:
      "bottom-[50px] sc200:bottom-[60px] sc300:bottom-[65px] sc350:bottom-[70px] sc400:bottom-[80px] sc500:bottom[100px]",
  },
  issuerBtn: {
    boxSize:
      "w-[90px] sc200:w-[100px] sc300:w-[110px] sc350:w-[120px] sc400:w-[130px] sc500:w-[140px] h-[90px] sc200:h-[100px] sc300:h-[110px] sc350:h-[120px] sc400:h-[130px] sc500:h-[140px]",
    borderRadius: "rounded-[20px]",
    boxShadow: "shadow-[5px_5px_#0e0d0d]",
  },
};
