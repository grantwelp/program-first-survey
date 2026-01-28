import { useMemo, useState } from "react";

// ✅ Put your Google Apps Script Web App URL here (must end with /exec)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwvNvd1bLNW--TqNc0fr3zOTnVmBujur48kb2XBCn2hjGCS4Y0F2zUt7TplnXPfECJM/exec";

const QUESTIONS = [
  "Coaches clearly communicate the team’s vision and expectations.",
  "I understand how my effort helps the team succeed.",
  "Coaches hold athletes accountable on and off the field.",
  "Team members respect one another.",
  "Coaches and players create a positive environment.",
  "I enjoy being part of this team.",
  "I work to improve my skills year-round.",
  "My work ethic meets team expectations.",
  "Being on this team helps me make good decisions.",
  "Coaches are fair and consistent.",
  "Coaches listen to athletes.",
  "Leaders model expected behavior.",
  "My role on the team is important.",
  "I feel valued on this team.",
  "I am proud to be a member of this team.",
  "Coaches explain plays and strategies clearly.",
  "We adjust plans during games.",
  "Practices prepare us to compete.",
  "Coaches help me learn from mistakes.",
  "I feel confident in my abilities.",
  "Our team supports one another.",
  "Our team is respected by the community.",
  "I am proud to represent my school.",
  "Team traditions build unity and pride.",
];

const CHOICES = [
  { value: 1, label: "Disagree" },
  { value: 2, label: "Neutral" },
  { value: 3, label: "Agree" },
];

export default function App() {
  // ✅ one response slot per question
  const [responses, setResponses] = useState(() => QUESTIONS.map(() => null));

  // Optional: you can hardcode these for now, or later replace with a dropdown / text input
  const [school, setSchool] = useState("Demo High School");
  const [team, setTeam] = useState("Varsity");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const answeredCount = useMemo(
    () => responses.filter((r) => r !== null).length,
    [responses]
  );

  const selectAnswer = (questionIndex, value) => {
    setResponses((prev) => {
      const next = [...prev];
      next[questionIndex] = value;
      return next;
    });
  };

  const handleSubmit = async () => {
    // Safety checks
    if (responses.includes(null)) {
      alert(`Please answer all questions (${answeredCount}/${QUESTIONS.length}).`);
      return;
    }
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) {
      alert(
        "Missing Google Script URL.\n\nIn src/App.jsx, replace GOOGLE_SCRIPT_URL with your Apps Script Web App URL (ends with /exec)."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Note: Apps Script doPost reads e.postData.contents
        body: JSON.stringify({
          school,
          team,
          responses,
        }),
      });

      // Some Apps Script deployments return 200 with empty body, so we don't rely on JSON parsing
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Submit failed (${res.status}). ${text}`);
      }

      alert("Submitted! Thank you for completing the Program First assessment.");

      // Optional: clear after submit
      setResponses(QUESTIONS.map(() => null));
    } catch (err) {
      console.error(err);
      alert(
        "Submission failed.\n\nCommon causes:\n• Apps Script URL is wrong\n• Apps Script is not deployed as a Web App (Anyone access)\n• You didn't redeploy after changes\n\nCheck the browser console for details."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "system-ui, Arial" }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Program First</h1>
        <div style={{ color: "#555", marginTop: 4 }}>Measure what drives winning</div>
        <div style={{ marginTop: 10, color: "#333" }}>
          Anonymous survey • {answeredCount}/{QUESTIONS.length} answered
        </div>
      </header>

      {/* Optional: simple fields so your Google Sheet has labels */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 12, color: "#555" }}>School</label>
          <input
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #ccc", minWidth: 260 }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 12, color: "#555" }}>Team</label>
          <input
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #ccc", minWidth: 180 }}
          />
        </div>
      </div>

      {QUESTIONS.map((question, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 14,
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 10 }}>
            {i + 1}. {question}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {CHOICES.map((c) => {
              const selected = responses[i] === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => selectAnswer(i, c.value)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: selected ? "2px solid #111827" : "1px solid #d1d5db",
                    background: selected ? "#111827" : "white",
                    color: selected ? "white" : "#111827",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitt
