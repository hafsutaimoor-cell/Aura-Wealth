"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useFinanceStore } from "@/lib/store";
import { executeVoiceCommand, formatVoiceResponse } from "@/lib/voice";
import { formatCurrency } from "@/lib/utils";
import {
  Mic,
  MicOff,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EXAMPLES = [
  "Spent $45 on groceries",
  "Paid $120 for internet bill",
  "Earned $1200 freelance project",
  "Received $500 dividend",
  "Bought $34.99 at Trader Joe's",
];

export function VoiceWidget() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [responseType, setResponseType] = useState<"success" | "error" | null>(null);
  const [processing, setProcessing] = useState(false);

  const recognitionRef = useRef<any>(null);
  const store = useFinanceStore();

  const commands = store.voiceCommands;
  const setVoiceListening = store.setVoiceListening;
  const setVoiceTranscript = store.setVoiceTranscript;

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
        setVoiceListening(false);
      };

      recognition.onresult = (event: any) => {
        let final = "";
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) final += transcript;
          else interim += transcript;
        }
        setTranscript(final || interim);
        setVoiceTranscript(final || interim);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setVoiceListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [setVoiceListening, setVoiceTranscript]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setResponse("Voice recognition is not supported in this browser. Try typing your command below.");
      setResponseType("error");
      return;
    }
    setResponse("");
    setTranscript("");
    try {
      recognitionRef.current.start();
    } catch {
      setVoiceListening(false);
    }
  }, []);
  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const handleTranscriptSubmit = useCallback((text: string) => {
    if (!text.trim()) return;
    setProcessing(true);
    setTimeout(() => {
      const result = executeVoiceCommand(text);
      setResponse(formatVoiceResponse(result));
      setResponseType(result.success ? "success" : "error");
      setProcessing(false);
      setTranscript("");
    }, 600);
  }, []);

  const handleTypedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTranscriptSubmit(input);
    setInput("");
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Mic size={20} className="text-brand-green animate-pulse" />
          <CardTitle className="text-sm">Aura Voice Assistant</CardTitle>
        </div>
        <CardDescription>Say or type a transaction, e.g. "Spent $45 on groceries"</CardDescription>
      </CardHeader>

      <CardContent className="pt-3">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-3 w-3 rounded-full transition-colors",
                isListening
                  ? "bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                  : "bg-slate-600",
              )}
            />
            <span className="text-xs font-medium">
              {isListening ? "Listening..." : processing ? "Processing…" : "Ready"}
            </span>
          </div>
          <Button
            variant="brand"
            onClick={isListening ? stopListening : startListening}
            disabled={processing}
            className="flex items-center gap-2"
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            {isListening ? "Stop" : "Speak"}
          </Button>
        </div>

        {(transcript || processing) && (
          <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1 text-xs text-slate-400">
              {isListening ? <Mic size={12} className="text-brand-green" /> : <Loader2 size={12} className="animate-spin text-slate-400" />}
              <span>{isListening ? "Hearing" : "Understanding"}</span>
            </div>
            <div className="text-sm text-slate-200 italic">{transcript || "…"}</div>
          </div>
        )}

        {response && (
          <div className="mb-4 p-3 rounded-xl border bg-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 mb-1">
              {responseType === "success" ? (
                <CheckCircle2 size={16} className="text-emerald-400" />
              ) : (
                <XCircle size={16} className="text-rose-400" />
              )}
              <span className={`text-xs font-medium ${responseType === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                {responseType === "success" ? "Logged!" : "Couldn't log"}
              </span>
            </div>
            <div className="text-sm text-slate-200">{response}</div>
          </div>
        )}

        <form onSubmit={handleTypedSubmit} className="flex gap-2 mb-6">
          <Input
            placeholder="Type a command (e.g. 'Spent $20 on coffee')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={processing}
            className="flex-1"
          />
          <Button variant="brand" type="submit" disabled={processing} size="sm">
            <Send size={16} />
          </Button>
        </form>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between mb-3">
            <CardTitle className="text-xs">Recent voice commands</CardTitle>
            <span className="text-xs text-slate-500">{commands.length} total</span>
          </div>
          <div className="space-y-2">
            {commands.slice(0, 5).map((cmd) => (
              <div key={cmd.id} className="flex items-center justify-between gap-3 p-2 rounded-lg bg-white/5 cursor-default">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-200 truncate">“{cmd.text}”</div>
                  {cmd.parsed && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      {cmd.parsed.type === "income" ? "+" : "−"}
                      {formatCurrency(cmd.parsed.amount)} • {cmd.parsed.category}
                    </div>
                  )}
                </div>
                <Badge
                  variant={cmd.status === "success" ? "success" : "danger"}
                  className="text-[10px] px-2 py-1"
                >
                  {cmd.status}
                </Badge>
              </div>
            ))}
            {commands.length === 0 && (
              <div className="text-xs text-slate-500 text-center py-3">No voice commands yet</div>
            )}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="text-xs text-slate-500 mb-3 uppercase tracking-wider">Try saying</div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(ex);
                  handleTranscriptSubmit(ex);
                }}
                className="text-xs text-slate-400 hover:text-brand-green transition-colors underline underline-offset-4"
              >
                “{ex}”
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

