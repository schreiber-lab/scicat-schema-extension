import { List } from "./List";
import { ActionBar } from "./ActionBar";
import { SamplesProvider } from "../../modules/samples/SamplesProvider";

export const Samples = () => {
  return (
    <SamplesProvider>
      <ActionBar />
      <List />
    </SamplesProvider>
  );
};
