import axios from "axios";
import { getBaseUrl } from "../../helpers/helpers";

const SOCIOMGRAMS_API_URL = `${getBaseUrl()}/sociograms`;

const getSociograms = async () => {
  const response = await axios.get(SOCIOMGRAMS_API_URL);
  return response.data;
};

const sociogramsService = {
  getSociograms,
};

export default sociogramsService;
