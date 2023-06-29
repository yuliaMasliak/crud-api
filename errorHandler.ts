export function handleError(errorMessage: string, statusCode: number) {
  return {
    error: {
      message: errorMessage,
      status: statusCode
    }
  };
}
