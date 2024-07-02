import { useQuery } from "react-query";
import ApiService from "@/src/api/services/api-service";

const apiService = new ApiService();

export default function useApiPing() {
    return useQuery("api-ping", () => apiService.ping());
}
