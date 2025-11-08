export async function POST(request) {
  try {
    const { email, amount, reference, studentId } = await request.json()

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack uses kobo (amount in lowest currency unit)
        reference,
        metadata: {
          studentId,
          custom_fields: [],
        },
      }),
    })

    const data = await response.json()

    if (data.status) {
      return Response.json({
        status: "success",
        authorizationUrl: data.data.authorization_url,
        accessCode: data.data.access_code,
        reference: data.data.reference,
      })
    } else {
      return Response.json({ status: "error", message: "Failed to initialize payment" }, { status: 400 })
    }
  } catch (error) {
    console.error("Payment initialization error:", error)
    return Response.json({ status: "error", message: "Internal server error" }, { status: 500 })
  }
}
