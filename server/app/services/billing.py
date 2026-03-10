from app.core.config import settings

PRICE_LOOKUP = {
    "pro": "price_pro_monthly",
    "scale": "price_scale_monthly",
}


def create_checkout_link(plan: str, customer_email: str) -> str:
    normalized = plan.lower()
    if normalized not in PRICE_LOOKUP:
        raise ValueError("Unsupported plan")

    secret = settings.stripe_secret_key
    success_url = settings.stripe_success_url
    cancel_url = settings.stripe_cancel_url

    if not secret:
        return f"{success_url}?plan={normalized}&mock_checkout=1"

    import stripe

    stripe.api_key = secret
    session = stripe.checkout.Session.create(
        mode="subscription",
        success_url=success_url,
        cancel_url=cancel_url,
        customer_email=customer_email,
        line_items=[{"price": PRICE_LOOKUP[normalized], "quantity": 1}],
    )
    return session.url
