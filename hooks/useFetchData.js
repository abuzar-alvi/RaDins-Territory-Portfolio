const { default: axios } = require("axios");
const { useState, useEffect } = require("react");

function useFetchData(apiEndPoint) {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);


    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
            setLoading(false);
            return;
        }

        setLoading(true);
        
        const fetchAllData = async () => {
            try {
                const res = await axios.get(apiEndPoint);
                const allData = res.data;
                setAllData(allData);
                setLoading(false);
            } catch (error) {
                setLoading(false)
            }
        }

        // fetch blog data only if category exists
        if (apiEndPoint) {
            fetchAllData()
        }

    }, [initialLoad, apiEndPoint]); // depend on initialload and apiEndPoint to trigger api call
    
    return {allData, loading}
}

export default useFetchData;