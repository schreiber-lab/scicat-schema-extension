import { Navigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { DatasetsPage } from "./DatasetsPage";
import { Instruments } from "./Instruments";
import { Samples } from "./Samples";
import { Proposals } from "./Proposals";
import { CreationProposalPage } from "./CreationProposalPage";
import { CreationDatasetAndSamplePage } from "./CreationDatasetPage";
import { CreationDatasetPage } from "./CreationDatasetPage";
import { CreationSamplePage } from "./CreationSamplePage";
import { CreationInstrumentPage } from "./CreationInstrumentPage";
import { MDSchemasPage } from "./MDSchemasPage";
import { CreationMDSchemaPage } from "./CreationMDSchemaPage";
import { ManagedSchemasPage } from "./ManagedSchemasPage";
import { ForbiddenPage } from "../components/ForbiddenPage";

export const routes = ({ isAuthenticated }) => [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/datasets/*",
    element: isAuthenticated ? <DatasetsPage /> : <ForbiddenPage />,
  },
  {
    path: "/proposals",
    element: isAuthenticated ? <Proposals /> : <ForbiddenPage />,
  },
  {
    path: "/instruments",
    element: isAuthenticated ? <Instruments /> : <ForbiddenPage />,
  },
  {
    path: "/samples",
    element: isAuthenticated ? <Samples /> : <ForbiddenPage />,
  },
  {
    path: "/proposal-creation",
    element: isAuthenticated ? <CreationProposalPage /> : <ForbiddenPage />,
  },
  {
    path: "/dataset-creation",
    element: isAuthenticated ? <CreationDatasetPage /> : <ForbiddenPage />,
  },
  {
    path: "/dataset-and-sample-creation",
    element: isAuthenticated ? <CreationDatasetAndSamplePage /> : <ForbiddenPage />,
  },
  {
    path: "/sample-creation",
    element: isAuthenticated ? <CreationSamplePage /> : <ForbiddenPage />,
  },
  {
    path: "/instrument-creation",
    element: isAuthenticated ? <CreationInstrumentPage /> : <ForbiddenPage />,
  },
  {
    path: "/md-schemas",
    element: isAuthenticated ? <MDSchemasPage /> : <ForbiddenPage />,
  },
  {
    path: "/md-schema-creation",
    element: isAuthenticated ? <CreationMDSchemaPage /> : <ForbiddenPage />,
  },
  {
    path: "/autocomplete-schemas",
    element: isAuthenticated ? <ManagedSchemasPage /> : <ForbiddenPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
