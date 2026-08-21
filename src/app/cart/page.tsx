import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CartView from "@/components/cart/CartView";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Your Cart | ${siteConfig.brandName}`,
  description: `Review the plants you've selected and request a free quote from ${siteConfig.brandName}.`,
  path: "/cart/",
  noIndex: true,
});

export default function CartPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Cart", path: "/cart/" }]} />
      <section className="container-page pb-16 pt-2">
        <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
          Your Cart
        </h1>
        <div className="mt-6">
          <CartView />
        </div>
      </section>
    </div>
  );
}
