import { useEffect } from "react";
import * as datasetsApi from '../../../../../api/datasets'



export const DatasetViewModal = ({ datasetID }) => {
    const [ dataset, setDataset] = useState(null);

    useEffect(() => {
        datasetsApi.getDataset(datasetID).then((dataset) => {
            setDataset(dataset)
        })
    }, [])

    return (
        <div></div>
    )
};
