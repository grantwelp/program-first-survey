import { useState } from "react";

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
  "Team traditions build unity and pride."
];

export default function App() {
  // One response slot per question
  const [responses, setResponses] = useState(
    () => QUESTIONS.map(() => null)
  );

  const selectAnswer = (questionIndex, value) => {
    setResponses(prev => {
      const copy = [...prev];
      copy[questionIndex] = value;
      return copy;
    });
  };

  // ✅ THIS IS WHERE THE GOOGLE SHEETS SUBMIT LOGIC GOES
  const handleSubmit = async () => {
    if (responses.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    await fetch("PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        school: "Demo High School",
        team: "Varsity",
        responses: responses
      })
    });

    alert("Thank you for completing the Program First Team Culture Assessment.");
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Program First</h1>
      <p><em>Measure what drives winning</em></p>
      <p>Anonymous survey. Please answer honestly.</p>

      {QUESTIONS.map((question, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 16,
            marginBottom: 14
          }}
        >
          <strong>{i + 1}. {question}</strong>

          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            {[1, 2, 3].map(value => {
              const label =
                value === 1 ? "Disagree" :
                value === 2 ? "Neutral" :
                "Agree";

              const selected = responses[i] === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => selectAnswer(i, value)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: selected ? "2px solid #000" : "1px solid #ccc",
                    background: selected ? "#000" : "#fff",
                    color: selected ? "#fff" : "#000",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* ✅ SUBMIT BUTTON CONNECTED TO handleSubmit */}
      <button
        type="button"
        onClick={handleSubmit}
        style={{
          width: "100%",
          marginTop: 20,
          padding: "14px 16px",
          borderRadius: 10,
          border: "none",
          background: "#000",
          color: "#fff",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer"
        }}
      >
        Submit Assessment
      </button>
    </div>
  );
}
