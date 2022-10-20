import { Route, Routes } from "react-router-dom";
import { Datasets } from "./Datasets";
import { DatasetPage } from "./DatasetPage";

export const DatasetsPage = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Datasets />}/>
      <Route path=":id" element={<DatasetPage />}/>
    </Routes>
  );
};
