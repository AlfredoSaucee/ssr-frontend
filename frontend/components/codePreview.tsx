"use client";
import { useEffect, useState } from "react";

export default function CodePreview({ code }: { code: string }) {
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const runCode = () => {
      try {
        const consoleLog: string[] = [];
        const originalConsoleLog = console.log;
        console.log = (...args) => {
          consoleLog.push(args.join(" "));
        };

        eval(code);

        console.log = originalConsoleLog;
        setOutput(consoleLog.join("\n") || "Koden kördes utan output");
      } catch (err: any) {
        setOutput(`Fel: ${err.message}`);
      }
    };

    runCode();
  }, [code]);

  return (
    <pre className="whitespace-pre-wrap text-sm">
      {output}
    </pre>
  );
}
