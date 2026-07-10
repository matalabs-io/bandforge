"use client";

import { useState, useTransition } from "react";
import { joinWaitlist } from "@/app/actions";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setIsSuccess(false);

    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", email);
      const result = await joinWaitlist(formData);

      if (result.success) {
        setIsSuccess(true);
        setEmail("");
        setMessage("Thanks — we'll email you when we go live.");
        return;
      }

      setMessage(result.error);
    });
  };

  return (
    <div className="mt-8 w-full max-w-[560px] sm:mt-[46px]">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-2.5 sm:flex-row sm:gap-3"
      >
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          disabled={isPending || isSuccess}
          className="h-[54px] w-full min-w-0 rounded-xl border border-white/14 bg-white/6 px-[18px] font-sans text-[15px] text-white outline-none placeholder:text-white/40 focus:border-accent/60 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[58px] sm:flex-1 sm:rounded-[12px] sm:px-5 sm:text-base"
        />
        <button
          type="submit"
          disabled={isPending || isSuccess}
          className="h-[54px] shrink-0 cursor-pointer rounded-xl border-none bg-accent px-6 font-sans text-base font-semibold tracking-[0.01em] text-[#06222a] transition-colors hover:bg-[#22cde0] disabled:cursor-not-allowed disabled:opacity-60 sm:h-[58px] sm:rounded-[12px] sm:px-[30px]"
        >
          {isPending ? "Joining..." : isSuccess ? "Joined" : "Join the waitlist"}
        </button>
      </form>
      {message ? (
        <p
          className={`mt-3.5 font-sans text-[13px] sm:mt-3.5 ${
            isSuccess ? "text-accent-light" : "text-red-300"
          }`}
        >
          {message}
        </p>
      ) : (
        <p className="mt-3.5 font-sans text-[13px] text-[#5a6b82]">
          No spam — just one email when we go live.
        </p>
      )}
    </div>
  );
}
