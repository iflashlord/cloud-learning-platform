"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit2, Trash2, Plus, Eye, Calendar, Users, Settings } from "lucide-react"
import { toast } from "sonner"

type Coupon = any
type Redemption = any

export function CouponManagementClient() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [redemptions, setRedemptions] = useState<Redemption[]>([])

  // Group redemptions by userId+couponCode
  function groupRedemptions(redemptions: Redemption[]) {
    const groups: Record<string, Redemption[]> = {}
    for (const r of redemptions) {
      const userId = r.userId || r.user?.userId
      const code = r.coupon?.code
      if (!userId || !code) continue
      const key = `${userId}__${code}`
      if (!groups[key]) groups[key] = []
      groups[key].push(r)
    }
    // Sort each group by redeemedAt descending (latest first)
    Object.values(groups).forEach((arr) =>
      arr.sort((a, b) => new Date(b.redeemedAt).getTime() - new Date(a.redeemedAt).getTime()),
    )
    return groups
  }
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    code: "",
    description: "",
    maxUsages: 1,
    durationDays: 30,
    expiresAt: "",
  })
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [editForm, setEditForm] = useState({
    code: "",
    description: "",
    maxUsages: 1,
    durationDays: 30,
    expiresAt: "",
    isActive: true,
  })
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const [cRes, rRes] = await Promise.all([
        fetch("/api/admin/coupons"),
        fetch("/api/admin/coupons/redemptions"),
      ])
      if (cRes.ok) setCoupons(await cRes.json())
      if (rRes.ok) setRedemptions(await rRes.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function createCoupon(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setForm({ code: "", description: "", maxUsages: 1, durationDays: 30, expiresAt: "" })
        setShowCreateDialog(false)
        toast.success("Coupon created successfully!")
        fetchData()
      } else {
        const err = await res.json()
        toast.error(err?.error || "Failed to create coupon")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to create coupon")
    }
  }

  async function updateCoupon(e: React.FormEvent) {
    e.preventDefault()
    if (!editingCoupon) return

    try {
      const res = await fetch(`/api/admin/coupons/${editingCoupon.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      })
      if (res.ok) {
        setShowEditDialog(false)
        setEditingCoupon(null)
        toast.success("Coupon updated successfully!")
        fetchData()
      } else {
        const err = await res.json()
        toast.error(err?.error || "Failed to update coupon")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to update coupon")
    }
  }

  async function deleteCoupon(couponId: number, couponCode: string) {
    if (!confirm(`Are you sure you want to delete the coupon "${couponCode}"?`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/coupons/${couponId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        const result = await res.json()
        toast.success(result.message)
        fetchData()
      } else {
        const err = await res.json()
        toast.error(err?.error || "Failed to delete coupon")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete coupon")
    }
  }

  function openEditDialog(coupon: Coupon) {
    setEditingCoupon(coupon)
    setEditForm({
      code: coupon.code,
      description: coupon.description || "",
      maxUsages: coupon.maxUsages,
      durationDays: coupon.durationDays,
      expiresAt: coupon.expiresAt ? new Date(coupon.expiresAt).toISOString().split("T")[0] : "",
      isActive: coupon.isActive,
    })
    setShowEditDialog(true)
  }

  async function toggleCouponActive(id: number, isActive: boolean) {
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      })
      if (res.ok) fetchData()
      else alert("Failed")
    } catch (err) {
      console.error(err)
    }
  }

  async function toggleRedemption(redemptionId: number, isActive: boolean) {
    try {
      const res = await fetch(`/api/admin/coupons/redemptions/${redemptionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: isActive ? "disable" : "enable" }),
      })
      if (res.ok) fetchData()
      else alert("Failed")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Coupon Management</h1>
          <p className='text-sm text-gray-600'>
            Create and manage trial coupons and user redemptions
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className='flex items-center gap-2'>
              <Plus className='w-4 h-4' />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-md'>
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <form onSubmit={createCoupon} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>Code</label>
                <Input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder='e.g., TRIAL30'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>Description</label>
                <Input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder='Optional description'
                />
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='block text-sm font-medium mb-1'>Max Usage</label>
                  <Input
                    type='number'
                    value={String(form.maxUsages)}
                    onChange={(e) => setForm({ ...form, maxUsages: Number(e.target.value) })}
                    min='1'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Duration (days)</label>
                  <Input
                    type='number'
                    value={String(form.durationDays)}
                    onChange={(e) => setForm({ ...form, durationDays: Number(e.target.value) })}
                    min='1'
                    required
                  />
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>Expires At (Optional)</label>
                <Input
                  type='date'
                  value={form.expiresAt}
                  onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                />
              </div>
              <div className='flex gap-2 pt-4'>
                <Button type='submit' className='flex-1'>
                  Create Coupon
                </Button>
                <Button type='button' variant='outline' onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Settings className='w-5 h-5' />
            Coupon Codes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className='text-center py-8'>Loading...</div>
          ) : (
            <div className='space-y-3'>
              {coupons.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                  No coupons created yet. Click &quot;Create Coupon&quot; to get started.
                </div>
              ) : (
                coupons.map((c: Coupon) => (
                  <div
                    key={c.id}
                    className='flex items-center justify-between p-4 border rounded-lg'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='font-mono font-medium text-lg'>{c.code}</span>
                        <Badge variant={c.isActive ? "success" : "neutral"}>
                          {c.isActive ? "Active" : "Inactive"}
                        </Badge>
                        {c.expiresAt && new Date(c.expiresAt) < new Date() && (
                          <Badge variant='error'>Expired</Badge>
                        )}
                      </div>
                      {c.description && (
                        <div className='text-sm text-gray-600 mb-2'>{c.description}</div>
                      )}
                      <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <span className='flex items-center gap-1'>
                          <Users className='w-3 h-3' />
                          {c.currentUsages}/{c.maxUsages} used
                        </span>
                        <span>{c.durationDays} days</span>
                        {c.expiresAt && (
                          <span className='flex items-center gap-1'>
                            <Calendar className='w-3 h-3' />
                            Expires: {new Date(c.expiresAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => openEditDialog(c)}
                        className='flex items-center gap-1'
                      >
                        <Edit2 className='w-3 h-3' />
                        Edit
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => toggleCouponActive(c.id, c.isActive)}
                      >
                        {c.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        size='sm'
                        variant='danger'
                        onClick={() => deleteCoupon(c.id, c.code)}
                        className='flex items-center gap-1'
                      >
                        <Trash2 className='w-3 h-3' />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Coupon Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Edit Coupon: {editingCoupon?.code}</DialogTitle>
          </DialogHeader>
          <form onSubmit={updateCoupon} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Code</label>
              <Input
                value={editForm.code}
                onChange={(e) => setEditForm({ ...editForm, code: e.target.value.toUpperCase() })}
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Description</label>
              <Input
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder='Optional description'
              />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-sm font-medium mb-1'>Max Usage</label>
                <Input
                  type='number'
                  value={String(editForm.maxUsages)}
                  onChange={(e) => setEditForm({ ...editForm, maxUsages: Number(e.target.value) })}
                  min='1'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>Duration (days)</label>
                <Input
                  type='number'
                  value={String(editForm.durationDays)}
                  onChange={(e) =>
                    setEditForm({ ...editForm, durationDays: Number(e.target.value) })
                  }
                  min='1'
                  required
                />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Expires At</label>
              <Input
                type='date'
                value={editForm.expiresAt}
                onChange={(e) => setEditForm({ ...editForm, expiresAt: e.target.value })}
              />
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='isActive'
                checked={editForm.isActive}
                onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
              />
              <label htmlFor='isActive' className='text-sm font-medium'>
                Active
              </label>
            </div>
            <div className='flex gap-2 pt-4'>
              <Button type='submit' className='flex-1'>
                Update Coupon
              </Button>
              <Button type='button' variant='outline' onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>User Redemptions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className='space-y-6'>
              {Object.entries(groupRedemptions(redemptions)).map(([key, group]) => {
                const latest = group[0]
                return (
                  <div key={key} className='border rounded p-3'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <div className='font-medium'>{latest.user?.userName || latest.userId}</div>
                        <div className='text-sm text-gray-600'>
                          Code: {latest.coupon?.code} • Expires:{" "}
                          {new Date(latest.proEndsAt).toLocaleString()}
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <div className='text-sm'>{latest.isActive ? "Active" : "Disabled"}</div>
                        <Button
                          size='sm'
                          onClick={() => toggleRedemption(latest.id, latest.isActive)}
                        >
                          {latest.isActive ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </div>
                    {group.length > 1 && (
                      <details className='mt-2'>
                        <summary className='cursor-pointer text-xs text-gray-500'>History</summary>
                        <div className='mt-1 space-y-1'>
                          {group.slice(1).map((r, idx) => (
                            <div key={r.id} className='flex justify-between text-xs text-gray-600'>
                              <span>
                                {r.isActive ? "Active" : "Disabled"} • Expires:{" "}
                                {new Date(r.proEndsAt).toLocaleString()}
                              </span>
                              <span>Redeemed: {new Date(r.redeemedAt).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CouponManagementClient
