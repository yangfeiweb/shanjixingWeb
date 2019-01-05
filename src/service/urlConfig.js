import _ from "lodash";
import course from "./pageUrl/course";
import learn from "./pageUrl/learn";
import auth from "./pageUrl/auth";
import person from "./pageUrl/person";
import exam from "./pageUrl/exam";

// export let apiRoot = "http://app.shanjixing.com/api/";
export let apiRoot = "http://192.168.0.22:13001/api/";
export const ResourcePath = "http://res.shanjixing.com";
export const imgPath = "http://res.shanjixing.com/quick/img";
export const audioPath = "http://res.shanjixing.com/quick/v";
export const iconPath = "http://res.shanjixing.com/";
// if (process.env.NODE_ENV === "development") {
//   apiRoot = "/api";
// }
export default _.merge(
    course(apiRoot),
    learn(apiRoot),
    auth(apiRoot),
    person(apiRoot),
    exam(apiRoot)
);