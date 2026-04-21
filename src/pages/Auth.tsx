import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storage } from "@/lib/storage";
import { toast } from "sonner";

const Auth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">(params.get("mode") === "signup" ? "signup" : "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = `${mode === "signup" ? "Sign up" : "Log in"} — Stratifyr`;
  }, [mode]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === "signup" && !name)) {
      toast.error("Please fill in all fields");
      return;
    }
    storage.setUser({
      name: mode === "signup" ? name : email.split("@")[0],
      email,
    });
    toast.success(mode === "signup" ? "Welcome to Stratifyr!" : "Welcome back!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left brand panel */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-primary text-primary-foreground p-10 flex-col justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white,transparent_55%)] opacity-15" />
        <Logo className="relative text-primary-foreground" />
        <div className="relative max-w-md">
          <h2 className="font-display text-4xl font-bold leading-tight">
            Plan every dollar. Measure every result.
          </h2>
          <p className="mt-4 text-primary-foreground/85">
            Stratifyr is the simple marketing workspace built for small businesses who want clarity over chaos.
          </p>
        </div>
        <div className="relative text-sm text-primary-foreground/75">
          “Finally, a tool that doesn't try to do everything.”
        </div>
      </div>

      {/* Right form */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-5">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
          <ThemeToggle />
        </div>
        <div className="flex-1 grid place-items-center px-6 pb-10">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-6"><Logo /></div>
            <h1 className="font-display text-3xl font-bold">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              {mode === "signup"
                ? "Start planning smarter marketing in minutes."
                : "Log in to continue planning your campaigns."}
            </p>

            <div className="mt-6 inline-flex rounded-full border border-border bg-secondary p-1 text-sm">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-1.5 rounded-full transition-colors ${
                    mode === m ? "bg-background shadow-soft text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {m === "login" ? "Log in" : "Sign up"}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Founder" />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                {mode === "signup" ? "Create account" : "Log in"}
              </Button>
            </form>

            <p className="mt-6 text-xs text-muted-foreground text-center">
              By continuing you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
