import Countdown from "@/app/components/Countdown";
import WaitlistForm from "@/app/components/WaitlistForm";

function LogoMark() {
  return (
    <div className="flex h-6 items-end gap-1 sm:h-[24px] sm:gap-1">
      <div className="h-[40%] w-[4.5px] rounded-[1.5px] bg-accent-dark sm:w-[5px] sm:rounded-[2px]" />
      <div className="h-[60%] w-[4.5px] rounded-[1.5px] bg-accent-dark sm:w-[5px] sm:rounded-[2px]" />
      <div className="h-[80%] w-[4.5px] rounded-[1.5px] bg-accent sm:w-[5px] sm:rounded-[2px]" />
      <div className="h-full w-[4.5px] rounded-[1.5px] bg-accent sm:w-[5px] sm:rounded-[2px]" />
    </div>
  );
}

function Wordmark() {
  return (
    <div className="font-display text-[19px] font-extrabold tracking-[-0.025em] sm:text-[21px]">
      <span className="text-white">Band</span>
      <span className="text-accent">Forge</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute top-[-160px] left-1/2 h-[380px] w-[480px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,188,212,0.18),rgba(0,188,212,0)_70%)] sm:top-[-220px] sm:h-[560px] sm:w-[900px] sm:bg-[radial-gradient(ellipse_at_center,rgba(0,188,212,0.16),rgba(0,188,212,0)_70%)]" />
      <div className="pointer-events-none absolute right-[-120px] bottom-[-160px] hidden h-[420px] w-[520px] bg-[radial-gradient(ellipse_at_center,rgba(0,151,167,0.12),rgba(0,151,167,0)_70%)] sm:block" />

      <header className="relative z-10 flex items-center justify-center gap-3 px-6 pt-7 sm:justify-between sm:px-[46px] sm:pt-[30px]">
        <div className="flex items-center gap-2.5 sm:gap-[11px]">
          <LogoMark />
          <Wordmark />
        </div>
        <div className="hidden rounded-[7px] border border-accent/35 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-accent-light uppercase sm:block">
          Launching Aug 15, 2026
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:px-12 sm:py-12 lg:px-20">
        <p className="font-mono text-[10px] tracking-[0.18em] text-accent-light uppercase sm:text-xs sm:tracking-[0.22em]">
          Forge your band. Forge your future.
        </p>

        <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,8vw,2.375rem)] leading-[1.06] font-bold tracking-[-0.03em] text-white sm:mt-[22px] sm:text-5xl sm:leading-[1.04] lg:text-[62px]">
          <span className="text-accent">BandForge</span> — IELTS prep built
          for{" "}
          <span className="text-accent">Telugu learners.</span>
        </h1>

        <p className="mt-4 max-w-[36ch] font-sans text-[15px] leading-relaxed font-light text-muted sm:mt-6 sm:max-w-[54ch] sm:text-lg sm:leading-[1.6] lg:text-[19px]">
          The official BandForge IELTS platform — AI-powered mock tests,
          band-scoring, and guidance in your language. We open the doors on{" "}
          <span className="font-medium text-[#e7ecf2]">August 15, 2026</span> —
          India&apos;s Independence Day.
        </p>

        <Countdown />
        <WaitlistForm />
      </main>

      <footer className="relative z-10 px-6 py-6 text-center font-mono text-[10px] tracking-[0.1em] text-footer sm:text-[11px]">
        © 2026 BandForge by MATA Labs · www.bandforge.study
      </footer>
    </div>
  );
}
