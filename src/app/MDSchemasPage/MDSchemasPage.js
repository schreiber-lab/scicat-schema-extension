import { List } from "./List";
import { KeysProvider } from "../../modules/keys/KeysProvider";

export const MDSchemasPage = () => {
  return (
    <KeysProvider>
      <List />
    </KeysProvider>
  );
};
