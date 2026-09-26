"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { useState } from "react";
import {
  boardAdvisoryTeam,
  executiveLeadership,
  type LeadershipMember,
  type LeadershipProfile,
} from "@/data/leadership";

function BoardAvatar({
  member,
  priority = false,
}: {
  member: LeadershipMember;
  priority?: boolean;
}) {
  const [imageUnavailable, setImageUnavailable] = useState(false);

  const initials = member.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!imageUnavailable) {
    return (
      <Image
        src={member.image}
        alt={member.name}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
        className="object-cover"
        onError={() => setImageUnavailable(true)}
      />
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#fff8e8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_16%,rgba(255,153,51,.64),transparent_25%),radial-gradient(circle_at_14%_84%,rgba(19,136,8,.48),transparent_32%)]" />
      <div className="absolute inset-8 rounded-full border border-[#0b1f3a]/15" />
      <div className="absolute inset-14 rounded-full border border-dashed border-[#0b1f3a]/20" />
      <span className="relative font-serif text-5xl font-medium tracking-[.12em] text-[#0b1f3a]">
        {initials}
      </span>
      <span className="absolute bottom-5 rounded-full border border-[#0b1f3a]/15 bg-white/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.17em] text-[#0b1f3a]/70 backdrop-blur">
        Photo coming soon
      </span>
    </div>
  );
}

function FeaturedLeader({
  member,
  label,
  priority = false,
}: {
  member: LeadershipProfile;
  label: string;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b213d]/88 shadow-[0_28px_80px_rgba(0,0,0,.24)]"
    >
      <div className="grid h-full items-stretch md:grid-cols-[minmax(250px,.78fr)_minmax(0,1.22fr)]">
        <div className="relative min-h-[420px] overflow-hidden bg-[#fff8e8] md:min-h-0">
          <BoardAvatar member={member} priority={priority} />

          <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-[#ff9933] via-[#fffdf8] to-[#138808]" />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06172d]/95 via-[#06172d]/30 to-transparent px-6 pb-7 pt-28">
            <p className="text-[9px] font-black uppercase tracking-[.3em] text-orange-300">
              {label}
            </p>
            <h3 className="mt-2 text-3xl font-black leading-none tracking-[-.035em] text-white">
              {member.name}
            </h3>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[.15em] text-slate-200">
              {member.role}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-9">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-300/25 bg-orange-300/10">
              <Quote size={16} className="text-orange-300" />
            </span>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[.27em] text-orange-300">
                {label}&apos;s message
              </p>
              <p className="mt-1 text-xs text-slate-400">
                A message to our Niagara community
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {member.profile.introduction
              .split(/\n\s*\n/)
              .map((paragraph, index) => (
                <p
                  key={`${member.name}-message-${index}`}
                  className="text-[13.5px] leading-[1.8] text-slate-200"
                  style={{
                    textAlign: "justify",
                    textAlignLast: "left",
                    hyphens: "auto",
                  }}
                >
                  {paragraph}
                </p>
              ))}
          </div>

          {member.profile.quote && (
            <blockquote className="mt-auto pt-7">
              <div className="rounded-2xl border border-white/10 bg-white/[.045] p-5">
                <p className="text-sm italic leading-7 text-slate-300">
                  “{member.profile.quote}”
                </p>
              </div>
            </blockquote>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function LeadershipCard({
  member,
  index,
}: {
  member: LeadershipProfile;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.48,
        delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.18),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className="group overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[.05] shadow-[0_16px_42px_rgba(0,0,0,.14)] transition-colors hover:border-orange-300/35 hover:bg-white/[.075]"
    >
      <div className="relative aspect-[4/4.65] overflow-hidden bg-[#fff8e8]">
        <BoardAvatar member={member} />
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#ff9933] via-[#fffdf8] to-[#138808]" />
      </div>

      <div className="p-5">
        <h4 className="text-lg font-black leading-tight tracking-[-.02em] text-white">
          {member.name}
        </h4>
        <p className="mt-2 text-[11px] font-semibold leading-5 text-slate-300">
          {member.role}
        </p>
      </div>
    </motion.article>
  );
}

export default function LeadershipSection() {
  const reduceMotion = useReducedMotion();

  const president = executiveLeadership.find(
    (member) => member.role.trim().toLowerCase() === "president"
  );

  const chairperson = executiveLeadership.find((member) =>
    member.role.toLowerCase().includes("chair")
  );

  const remainingLeaders = [...executiveLeadership, ...boardAdvisoryTeam].filter(
    (member) => member !== president && member !== chairperson
  );

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 26 },
    visible: { opacity: 1, y: 0 },
  };

  const transition = (delay = 0) => ({
    duration: reduceMotion ? 0 : 0.7,
    delay: reduceMotion ? 0 : delay,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  return (
    <section
      id="leadership"
      className="relative isolate overflow-hidden bg-[#06172d] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(22,59,101,.68),transparent_48%)]" />
      <div className="absolute inset-0 opacity-[.11] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-orange-500/15 blur-[110px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-green-500/12 blur-[110px]" />
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#ff9933] via-[#fffdf8] to-[#138808]" />

      <div className="relative mx-auto max-w-[1600px]">
        <motion.div
          initial={reveal.hidden}
          whileInView={reveal.visible}
          viewport={{ once: true, amount: 0.3 }}
          transition={transition()}
          className="grid gap-8 border-b border-white/10 pb-11 lg:grid-cols-[1.35fr_.65fr] lg:items-end"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-11 bg-orange-300" />
              <p className="text-[10px] font-bold uppercase tracking-[.34em] text-orange-300">
                Niagara Indian Association
              </p>
            </div>

            <h2 className="mt-6 max-w-5xl text-5xl font-black leading-[.94] tracking-[-.045em] text-white sm:text-6xl lg:text-7xl">
              Meet the people moving our community forward.
            </h2>
          </div>

        </motion.div>

        {(president || chairperson) && (
          <div className="mt-14">
            <motion.div
              initial={reveal.hidden}
              whileInView={reveal.visible}
              viewport={{ once: true, amount: 0.25 }}
              transition={transition(0.05)}
              className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.3em] text-green-300">
                  Executive leadership
                </p>
                <h3 className="mt-2 text-3xl font-black tracking-tight text-white">
                  Messages from our leadership.
                </h3>
              </div>

              <p className="max-w-md text-sm leading-7 text-slate-400">
                Two voices. One shared commitment to strengthening community,
                preserving culture and creating opportunity across Niagara.
              </p>
            </motion.div>

            <div className="grid gap-7 xl:grid-cols-2">
              {president && (
                <FeaturedLeader
                  member={president}
                  label="President"
                  priority
                />
              )}

              {chairperson && (
                <FeaturedLeader
                  member={chairperson}
                  label="Chairperson"
                  priority
                />
              )}
            </div>
          </div>
        )}

        <motion.div
          initial={reveal.hidden}
          whileInView={reveal.visible}
          viewport={{ once: true, amount: 0.12 }}
          transition={transition(0.1)}
          className="mt-24 border-t border-white/10 pt-12"
        >
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.3em] text-green-300">
                Board & leadership team
              </p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-white">
                Different strengths. One purpose.
              </h3>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-300">
              The people supporting NIA&apos;s programs, operations and community
              initiatives across Niagara.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {remainingLeaders.map((member, index) => (
              <LeadershipCard
                key={`${member.name}-${member.role}`}
                member={member}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
