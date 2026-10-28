type TreeifiedErrorProps = {
  errors: string[];
  properties?: Record<string, TreeifiedErrorProps | undefined>;
  items?: (TreeifiedErrorProps | undefined)[];
};

export function getErrorMessages(errorObject: TreeifiedErrorProps): string[] {
  const messages: string[] = [...errorObject.errors];

  if (errorObject.properties) {
    for (const property of Object.values(errorObject.properties)) {
      if (property) {
        messages.push(...getErrorMessages(property));
      }
    }
  }

  if (errorObject.items) {
    for (const item of errorObject.items) {
      if (item) {
        messages.push(...getErrorMessages(item));
      }
    }
  }

  return messages;
}
