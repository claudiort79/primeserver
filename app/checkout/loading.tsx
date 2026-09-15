import { Brand } from "@/components/Brand";

export default function CheckoutLoading() {
  return (
    <main className="checkoutPage">
      <div className="checkoutLoading">
        <Brand />
        <div className="spinner" />
        <h1>Preparing your secure checkout…</h1>
        <p>You’ll be redirected to Stripe in a moment.</p>
        <span>Secure card payment · Powered by Stripe</span>
      </div>
    </main>
  );
}
