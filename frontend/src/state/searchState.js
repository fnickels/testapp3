export const initialSearchState = {
    lastSubmittedQuery: "",
};
export function withLastSubmittedQuery(query) {
    return {
        lastSubmittedQuery: query,
    };
}
