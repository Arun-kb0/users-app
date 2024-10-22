import axios from "axios";
import { toast } from "react-toastify";

const errorHandler = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      toast.error(`Error: ${error.response.data.message || 'Something went wrong'}`);
    } else if (error.request) {
      toast.error('No response from server');
    } else {
      toast.error(`Error: ${error.message}`);
    }
  } else {
    toast.error('An unexpected error occurred');
  }
  
  return error.message
}

export default errorHandler