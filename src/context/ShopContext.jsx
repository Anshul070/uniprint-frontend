import { useQuery } from '@tanstack/react-query';
import axios from '../models/axios';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';

export const shopData = createContext("shopData");

function ShopContext(props) {
    const [fetchData, setFetchData] = useState(null); // Holds the fetched data
    const [manualRefetch, setManualRefetch] = useState(false); // Trigger for manual refetch

    // Query function for fetching data
    const fetchShopData = async () => {
        const result = await axios.get("api/printshops/67c007a83e649ffa6cb72063");
        return result.data;
    };

    // UseQuery hook with manual refetch capability
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["ShopData"],
        queryFn: fetchShopData,
        enabled: !manualRefetch, // Disable automatic refetch when manualRefetch is true
    });

    // Update fetchData state when data is fetched
    useEffect(() => {
        if (!isLoading && data) {
            setFetchData(data);
        }
    }, [data]);

    // Function to trigger manual refetch
    const handleManualRefetch = async () => {
        try {
            setManualRefetch(true); // Disable automatic refetch
            const newData = await refetch(); // Manually refetch data
            setFetchData(newData.data); // Update the state with the new data
        } catch (err) {
            console.error("Error during manual refetch:", err);
        } finally {
            setManualRefetch(false); // Re-enable automatic refetch
            console.log("Manual refetch");
        }
    };

    return (
        <shopData.Provider value={{ fetchData, handleManualRefetch }}>
            {props.children}
        </shopData.Provider>
    );
}

export default ShopContext;