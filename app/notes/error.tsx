"use client";

interface ErrorProp {
  error: Error;
};

export default function Error({ error }: ErrorProp) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
};
