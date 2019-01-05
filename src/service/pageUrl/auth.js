export default function(apiRoot) {
  return {
    REGISTER: apiRoot + "register", // 注册
    LOGIN: apiRoot + "login", // 登陆
    SEND_CAPTCHA: apiRoot + "captcha/create", // 发送验证码
    FIND_PWD: apiRoot + "findPassword", // 找回密码
    REMILE: apiRoot + "reSendEmail", // 重新发送激活邮件
    LOGOUT: apiRoot + "logout", // 退出登录
    CHANGE_PWD: apiRoot + "changePassword" // 修改密码
  };
}
