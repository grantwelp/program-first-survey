import { useMemo, useState } from "react";

// ✅ Your live Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz4AM6nR42fn4-eJu5Uvh1yM-9CU5lUDZNabD5u14RGsuor3Pd1X_rN_FdHd6CUkF4P/exec";

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
  // One response slot per question
  const [responses, setResponses] = useState(() => QUESTIONS.map(() => null));

  // Optional identifiers (useful for consulting)
  const [school, setSchool] = useState("");
  const [team, setTeam] = useState("");

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
    if (responses.includes(null)) {
      alert(`Please answer all questions (${answeredCount}/${QUESTIONS.length}).`);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        // ✅ CORS-safe for Google Apps Script
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          school,
          team,
          responses,
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      alert("Submitted! Thank you for completing the Program First assessment.");

      // Optional reset
      setResponses(QUESTIONS.map(() => null));
      // setSchool("");
      // setTeam("");
    } catch (err) {
      console.error(err);
      alert(
        "Submission failed.\n\nMost common reasons:\n• Apps Script not deployed as Web App (Anyone access)\n• Script edited but not redeployed as a NEW version\n• Old browser cache\n\nOpen DevTools → Console for details."
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

      {/* Optional identifiers */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 12, color: "#555" }}>School (optional)</label>
          <input
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="e.g., Vincennes Lincoln"
            style={{ padding: 10, borderRadius: 10, border: "1px solid #ccc", minWidth: 260 }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 12, color: "#555" }}>Team (optional)</label>
          <input
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            placeholder="e.g., Varsity Boys Basketball"
            style={{ padding: 10, borderRadius: 10, border: "1px solid #ccc", minWidth: 260 }}
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
        disabled={isSubmitting}
        style={{
          width: "100%",
          marginTop: 10,
          padding: "14px 16px",
          borderRadius: 12,
          border: "none",
          background: isSubmitting ? "#6b7280" : "#111827",
          color: "white",
          fontWeight: 800,
          cursor: isSubmitting ? "not-allowed" : "pointer",
          fontSize: 16,
        }}
      >
        {isSubmitting ? "Submitting..." : "Submit Assessment"}
      </button>
    </div>
  );
}
