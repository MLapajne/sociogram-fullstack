import axios from "axios";

import { getBaseUrl } from "../../helpers/helpers";

const FORM_URLS_API_URL = `${getBaseUrl()}/api/display_url`;

const getFormUrls = async () => {
  const response = await axios.get(`${FORM_URLS_API_URL}`);
  return response.data;
};

const formUrlsService = {
  getFormUrls,
};

export default formUrlsService;
