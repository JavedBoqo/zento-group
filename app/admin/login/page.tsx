import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, ShieldCheck, Heart } from "lucide-react";
import { currentAdmin } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";
export default async function LoginPage() {
  if (await currentAdmin()) redirect("/admin/dashboard");
  return (
    <main className="admin-login mx-auto grid w-full max-w-[1600px] items-center lg:grid-cols-[1fr_1fr]">
      <section className="admin-login-panel hidden self-stretch lg:block">
        <Image
          src="/hero-image.webp"
          alt="Zento caregiver supporting an older person"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute left-9 top-9 z-10 flex items-center gap-3 rounded-2xl bg-white/95 px-5 py-3">
          <Image src="/logo.svg" alt="Zento Care" width={38} height={40} />
          <span className="text-2xl font-bold tracking-[-.05em] text-secondary">
            zento<span className="text-primary">.</span>
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-10 xl:p-14">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white">
            <Heart size={12} />
            Nurse-led. People-first.
          </span>
          <h2 className="max-w-md text-4xl font-bold leading-tight text-white xl:text-5xl">
            A little care.
            <br />A big difference.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
            One thoughtful workspace for your content, your community, and the
            people behind Zento.
          </p>
          <div className="mt-9 flex gap-5 border-t border-white/20 pt-6 text-[11px] text-white/65">
            <span>Edinburgh & Lothian</span>
            <span>·</span>
            <span>Perthshire</span>
          </div>
        </div>
      </section>
      <section className="admin-login-form mx-auto w-full max-w-[380px]">
        <Link
          href="/"
          className="admin-login-back inline-flex items-center gap-2 text-xs text-[#646e5d]"
        >
          <Image src="/logo.svg" alt="Zento" width={28} height={30} />
          Back to Zento <ArrowUpRight size={12} />
        </Link>
        <p className="admin-eyebrow">Zento administration</p>
        <h1 className="admin-login-heading mt-3 font-bold text-[#29432f]">
          Welcome back.
        </h1>
        <p className="admin-login-description mt-3 text-[13px] leading-6 text-[#626d5b]">
          Manage your website, share advice and grow your team.
        </p>
        <LoginForm />
        <div className="admin-login-notice flex items-start gap-2.5 rounded-xl border border-[#e4ebda] bg-[#f1f6e9] p-4">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#5f7740]" />
          <p className="text-[11px] leading-5 text-[#637055]">
            This is a private workspace for Zento administrators. Your session
            is securely encrypted.
          </p>
        </div>
        <p className="admin-login-footer text-[10px] text-[#666c5f]">
          © Zento Group. Compassionate care. Nurse-led excellence.
        </p>
      </section>
    </main>
  );
}
