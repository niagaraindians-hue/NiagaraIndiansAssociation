import type { Metadata } from "next";
import { ArrowRight, MapPin, Phone, Store, Tags } from "lucide-react";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Business Registration | Niagara Indian Association",
  description:
    "Register your Niagara business in the NIA Business Directory. Help local residents discover your services and find your contact details in one place.",
};

const registrationUrl = "https://app.niagaraindians.com/business-register";
const directoryUrl = "https://directory.niagaraindians.com/";

const benefits = [
  {
    icon: MapPin,
    title: "Be discovered locally",
    description:
      "Connect with residents across the Niagara region who are looking for businesses and services close to home.",
  },
  {
    icon: Phone,
    title: "Make it easy to connect",
    description:
      "Bring your business information and contact details together in a directory residents can easily access.",
  },
  {
    icon: Tags,
    title: "Share special offers",
    description:
      "Participating businesses may offer discounts to their registered clients. Offers and eligibility vary by business.",
  },
];

export default function BusinessRegistrationPage() {
  return (
    <>
      <main className="bg-[#fffdf8] text-[#102a43]">
        <section className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-orange-200/60" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Business Registration</p>
              <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
                Your business.<br />
                Our <span className="text-green-700">community.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Run a business in the Niagara region? Register your business in
                the NIA Business Directory and help local residents discover
                what you have to offer.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={registrationUrl} className="inline-flex items-center justify-center gap-3 rounded-full bg-orange-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/15 transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600">
                  Register Your Business <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
                <a href={directoryUrl} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-6 py-4 text-sm font-bold transition hover:border-green-700 hover:text-green-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700">
                  Explore the Directory <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[32px] bg-[#102a43] p-8 text-white shadow-xl sm:p-12">
              <Store aria-hidden="true" className="h-12 w-12 text-orange-400" strokeWidth={1.5} />
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-green-300">NIA Business Directory</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Local businesses.<br />One connected Niagara.</h2>
              <p className="mt-5 leading-7 text-slate-300">
                Discover a variety of businesses and their contact details in
                one place. From finding a service to getting in touch, the
                directory helps residents connect with our local business community.
              </p>
              <div aria-hidden="true" className="mt-8 flex h-1 overflow-hidden rounded-full">
                <span className="flex-1 bg-orange-500" /><span className="flex-1 bg-white" /><span className="flex-1 bg-green-600" />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="benefits-heading" className="border-y border-slate-100 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Grow your local connections</p>
            <h2 id="benefits-heading" className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">Give your business a place in the directory.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {benefits.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-3xl border border-slate-200 bg-[#fffdf8] p-7">
                  <Icon aria-hidden="true" className="h-7 w-7 text-green-700" />
                  <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 text-center sm:px-8 sm:py-20">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Ready to introduce your business?</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">Head to the business registration form to provide your business information and contact details.</p>
          <a href={registrationUrl} className="mt-7 inline-flex items-center justify-center gap-3 rounded-full bg-orange-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600">
            Register Your Business <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
