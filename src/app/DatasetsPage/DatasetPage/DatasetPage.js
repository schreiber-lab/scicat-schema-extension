import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, LinearProgress } from "@material-ui/core";
import { MetadataRendering } from "./MetadataRendering";
import { getDataset } from "../../../api/datasets";

export const DatasetPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ dataset, setDataset ] = useState();

  useEffect(() => {
    getDataset(id)
      .then((dataset) => {
        setDataset(dataset);
      })
      .catch(() => {
        navigate("/datasets");
      });
  }, [ id, navigate ]);

  return (
    <Container>
      {!dataset ? (
        <LinearProgress />
      ) : (
        <MetadataRendering metadata={dataset.scientificMetadata} />
      )}
    </Container>
  );
};
