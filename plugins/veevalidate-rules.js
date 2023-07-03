import { defineRule, configure } from "vee-validate";
import {
  required,
  min,
  max,
  url,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  regex,
  confirmed,
} from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  defineRule("required", required);
  defineRule("url", url);
  defineRule("min", min);
  defineRule("passwordmin", min);
  defineRule("max", max);
  defineRule("passwordmax", max);
  defineRule("alpha_spaces", alphaSpaces);
  defineRule("email", email);
  defineRule("min_value", minVal);
  defineRule("regex", regex);
  defineRule("confirmed", confirmed);

  configure({
    generateMessage: (ctx) => {
      const messages = {
        required: `The field ${ctx.field} is required.`,
        min: `The field ${ctx.field} is must be 30 character long.`,
        passwordmin: `Password must be 8-12 character long.`,
        passwordmax: `Password must be 12 character Only.`,
        max: `The field ${ctx.field} must be 120 character only.`,
        alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
        email: `This field must be a valid email`,
        min_value: `The field ${ctx.field} is too low.`,
        max_value: `The field ${ctx.field} is too high.`,
        url: `The field ${ctx.field} is not a valid URL`,
        confirmed: `Password does not match.`,
        regex: `Password at least 1 upper case, numeric, and special character must be`,
      };

      const message = messages[ctx.rule.name]
        ? messages[ctx.rule.name]
        : `The field ${ctx.field} is invalid.`;

      return message;
    },
  });
});
