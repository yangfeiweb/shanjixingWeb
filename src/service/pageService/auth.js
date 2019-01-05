import reqUrl from "../urlConfig";
import fetch from "@/utility/http";
// 短信验证
let sendCaptcha = (captchaType, mobile) =>
  fetch(
    reqUrl.SEND_CAPTCHA,
    {
      captchaType: captchaType,
      mobile: mobile
    },
    "POST"
  );

// 注册
let register = (
  registerType,
  userid,
  password,
  captcha,
  captchaKey,
  deviceId
) =>
  fetch(
    reqUrl.REGISTER,
    {
      registerType: registerType,
      userid: userid,
      password: password,
      captcha: captcha || "",
      captchaKey: captchaKey || "",
      deviceId: deviceId || ""
    },
    "POST"
  );
// 登陆
let login = (userid, password, deviceId) =>
  fetch(
    reqUrl.LOGIN,
    {
      userid: userid,
      password: password,
      deviceId: deviceId || ""
    },
    "POST"
  );

// 重新发送激活邮箱
let reSendEmail = userid =>
  fetch(
    reqUrl.REMILE,
    {
      userid: userid // 注册的邮箱
    },
    "POST"
  );

// 忘记密码
let findPwd = (userid, password, captcha, captchaKey) =>
  fetch(
    reqUrl.FIND_PWD,
    {
      userid: userid,
      password: password,
      captcha: captcha,
      captchaKey: captchaKey
    },
    "POST"
  );
let logout = () => fetch(reqUrl.LOGOUT, {}, "POST");
export default { sendCaptcha, register, login, reSendEmail, findPwd, logout };
