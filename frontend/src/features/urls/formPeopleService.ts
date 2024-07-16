import axios from "axios";
import { getBaseUrl } from "../../helpers/helpers";

const SOCIOMGRAMS_API_URL = `${getBaseUrl()}/sociograms`;

const getSociograms = async () => {
  console.log(SOCIOMGRAMS_API_URL);
  const response = await axios.get(SOCIOMGRAMS_API_URL);
  console.log(response.data);
  console.log("response.data");
  return response.data;
};

const sociogramsService = {
  getSociograms,
};

export default sociogramsService;
