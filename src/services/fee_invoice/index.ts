/**
 * @Description: Services User
 * @Created by ZiniTeam
 * @Date create: 21/03/2019
 */
/** API */
import Api from "../api";
import sailsApi from "../../config/sails.api";
import stripeApi from "../../config/stripe.api";
import { CONFIG } from "../../config";

export default {
  getListFeeInvoice: (params: any) => {
    try {
      let newUrl =
        sailsApi.fee_invoice.listByStudent +
        "/" +
        params.studentId +
        "?page=" +
        params.page +
        "&limit=" +
        params.limit +
        "&schoolId=" +
        params.school;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  getDetailFeeInvoice: (params: any) => {
    try {
      let newUrl =
        sailsApi.fee_invoice.get +
        "/" +
        params.id +
        "?schoolId=" +
        params.school;
      let results = Api.get(newUrl, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  getTokenStripe: async (params: any) => {
    return fetch(CONFIG.hostStripe + stripeApi.token.get, {
      headers: {
        // Use the correct MIME type for your server
        Accept: "application/json",
        // Use the correct Content Type to send data to Stripe
        "Content-Type": "application/x-www-form-urlencoded",
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${params.publishKey}`,
      },
      // Use a proper HTTP method
      method: "post",
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(params.card)
        .map((key) => key + "=" + params.card[key])
        .join("&"),
    })
      .then((response) => response.json())
      .catch((e) => null);
  },

  paymentWithPaypal: (params: any) => {
    try {
      let newUrl = sailsApi.fee_invoice.paymentWithPaypal;
      let results = Api.post(newUrl, params, CONFIG.versionAPI);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },

  updatePaymentStatus: (params: any) => {
    try {
      let newUrl = sailsApi.fee_invoice.updateStatus + "/" + params.id;
      let results = Api.put(newUrl, null, CONFIG.versionAPITest);
      return results;
    } catch (error) {
      console.log("ERROR ASYNC: ", error);
      return null;
    }
  },
};
