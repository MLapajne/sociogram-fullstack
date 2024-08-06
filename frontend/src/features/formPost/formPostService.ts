import axios from "axios";
import { getBaseUrl } from "../../helpers/helpers";
import { FormPostData } from "../../classes/formData";

const SOCIOMGRAMS_API_URL = `${getBaseUrl()}/questionsFrontend/`;

const postForm = async (userData: FormPostData) => {
  const response = await axios.post(SOCIOMGRAMS_API_URL, userData);
  return response.data;
};

const FormDataService = {
  postForm,
};

export default FormDataService;
