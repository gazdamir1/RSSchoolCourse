import { vi } from "vitest"

export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  asPath: "/",
  route: "/",
  pathname: "/",
  query: {},
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
}

vi.mock("next/router", () => ({
  useRouter: () => mockRouter,
}))
