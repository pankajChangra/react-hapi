import axios from "axios";
import * as config from "../config/config";
import getOptions from "./http.header";

function register(payload: any) {
    return axios
      .post(config.API_URL + "/auth/register", payload, getOptions())
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
}

function login(payload: any) {
  return axios
    .post(config.API_URL + "/auth/login", payload, getOptions())
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}

export const authService = {
    register,
    login
};