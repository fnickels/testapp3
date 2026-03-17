import React from "react";

interface FormErrorNoticeProps {
  message: string;
}

export function FormErrorNotice({ message }: FormErrorNoticeProps): JSX.Element {
  if (!message) {
    return <></>;
  }

  return (
    <p role="alert" style={{ color: "var(--color-error)", marginTop: "var(--space-1)" }}>
      {message}
    </p>
  );
}
