/// helper functions
export const compareStrings = (A: string, B: string): number => {
  if (A < B) {
    return -1;
  }
  if (A > B) {
    return 1;
  }
  return 1;
};
