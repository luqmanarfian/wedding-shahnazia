import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useCountdown from "./useCountdown";

describe("useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calculates time left correctly for a future date", () => {
    const now = new Date("2026-09-01T00:00:00Z").getTime();
    vi.setSystemTime(now);

    const targetDate = "2026-09-03T02:03:04Z"; // 2 days, 2 hours, 3 minutes, 4 seconds
    const { result } = renderHook(() => useCountdown(targetDate));

    expect(result.current.days).toBe("02");
    expect(result.current.hours).toBe("02");
    expect(result.current.minutes).toBe("03");
    expect(result.current.seconds).toBe("04");
  });

  it("returns 00 for all fields if target date has passed", () => {
    const now = new Date("2026-10-01T00:00:00Z").getTime();
    vi.setSystemTime(now);

    const targetDate = "2026-09-01T00:00:00Z";
    const { result } = renderHook(() => useCountdown(targetDate));

    expect(result.current).toEqual({
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    });
  });

  it("updates countdown every second", () => {
    const now = new Date("2026-09-01T00:00:10Z").getTime();
    vi.setSystemTime(now);

    const targetDate = "2026-09-01T00:00:15Z";
    const { result } = renderHook(() => useCountdown(targetDate));

    expect(result.current.seconds).toBe("05");

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.seconds).toBe("03");
  });
});
