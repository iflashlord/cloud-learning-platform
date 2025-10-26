// Quick test script to create a coupon for testing
console.log("Creating test coupon...")

const testCoupon = {
  code: "TEST30",
  description: "Test coupon for 30 days",
  maxUsages: 100,
  durationDays: 30,
  expiresAt: null,
}

fetch("http://localhost:3001/api/admin/coupons", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(testCoupon),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Coupon creation result:", data)
  })
  .catch((error) => {
    console.error("Error creating coupon:", error)
  })
