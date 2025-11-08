export async function POST(request) {
  try {
    const { reference } = await request.json()

    // Verify payment with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    })

    const data = await response.json()

    if (data.status && data.data.status === "success") {
      return Response.json({
        status: "success",
        message: "Payment verified successfully",
        data: data.data,
      })
    } else {
      return Response.json({ status: "error", message: "Payment verification failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    return Response.json({ status: "error", message: "Internal server error" }, { status: 500 })
  }
}
