/**
 * React testing utilities for GLOST components
 */
import React from "react";
import { render, type RenderOptions } from "@testing-library/react";

/**
 * Custom render function that includes providers
 */
export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, {
    ...options,
  });
}

/**
 * Re-export render for convenience
 */
export { render } from "@testing-library/react";

/**
 * Re-export screen for convenience
 */
export { screen } from "@testing-library/react";

/**
 * Re-export userEvent for convenience
 */
export { default as userEvent } from "@testing-library/user-event";
