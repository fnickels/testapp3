export interface SearchState {
  lastSubmittedQuery: string;
}

export const initialSearchState: SearchState = {
  lastSubmittedQuery: "",
};

export function withLastSubmittedQuery(query: string): SearchState {
  return {
    lastSubmittedQuery: query,
  };
}
