import { useGetPartners } from "@/services/Customer/services";

const useOrderPage = () => {
    const {data, isLoading} = useGetPartners();

    return {
        listPartner: data?.result,
        isLoading,
    }
}

export default useOrderPage;