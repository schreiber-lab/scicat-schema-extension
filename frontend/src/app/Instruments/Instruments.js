import { List } from './List'
import { InstrumentsProvider } from "../../modules/instruments/InstrumentsProvider";

export const Instruments = () => {
  return (
    <InstrumentsProvider>
      <List />
    </InstrumentsProvider>
  );
};
