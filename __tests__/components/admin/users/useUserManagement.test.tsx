import { act, renderHook, waitFor } from "@testing-library/react";

import { useUserManagement } from "@/components/admin/users/useUserManagement";

const now = new Date();
const previousMonth = new Date(now);
previousMonth.setDate(1);
previousMonth.setMonth(previousMonth.getMonth() - 1);

const mockUsers = [
  {
    id: "1",
    userId: "user_alpha",
    userName: "Alice",
    userImageSrc: "/alice.png",
    activeCourseId: 1,
    hearts: 4,
    points: 120,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    isActive: true,
    lastActive: now.toISOString(),
  },
  {
    id: "2",
    userId: "user_bravo",
    userName: "Bob",
    userImageSrc: "/bob.png",
    activeCourseId: null,
    hearts: 2,
    points: 40,
    createdAt: previousMonth.toISOString(),
    updatedAt: previousMonth.toISOString(),
    isActive: false,
    lastActive: new Date("2024-02-20").toISOString(),
  },
] as const;

describe("useUserManagement", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    vi.restoreAllMocks();
    global.fetch = originalFetch;
  });

  it("loads users, computes stats, and filters by search and status", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    global.fetch = fetchMock as unknown as typeof fetch;

    const { result } = renderHook(() => useUserManagement());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetchMock).toHaveBeenCalledWith("/api/admin/users");
    expect(result.current.users).toHaveLength(2);
    expect(result.current.stats).toEqual({ total: 2, active: 1, inactive: 1, newThisMonth: 1 });

    act(() => {
      result.current.setSearchTerm("bob");
    });

    await waitFor(() => expect(result.current.filteredUsers).toHaveLength(1));
    expect(result.current.filteredUsers[0].userId).toBe("user_bravo");

    act(() => {
      result.current.setFilter("active");
    });

    await waitFor(() => expect(result.current.filteredUsers).toHaveLength(0));
  });

  it("toggles user status and refreshes the list", async () => {
    const updatedUsers = [
      { ...mockUsers[0], isActive: false },
      mockUsers[1],
    ];

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      })
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => updatedUsers,
      });

    global.fetch = fetchMock as unknown as typeof fetch;

    const { result } = renderHook(() => useUserManagement());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.toggleUserStatus("1", true);
    });

    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/admin/users/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: false }),
    });
    expect(fetchMock).toHaveBeenNthCalledWith(3, "/api/admin/users");

    await waitFor(() => expect(result.current.users[0].isActive).toBe(false));
  });
});
