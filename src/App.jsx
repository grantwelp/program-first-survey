import { useMemo, useState } from "react";

const BRAND = {
  name: "Program First",
  tagline: "Measure what drives winning",
};

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
  // ✅ One response slot per question
  const [responses, setResponses] = useState(() => Array(QUESTIONS.length).fill(null));

  const answeredCount = useMemo(
    () => responses.filter((r) => r !== null).length,
    [responses]
  );

  const setResponse = (index, value) => {
    setResponses((prev) => {
      const next = [...prev];
      next[index] = value; // ✅ only updates that question’s value
      return next;
    });
  };

  const handleSubmit = () => {
    // Optional: prevent submit until complete
    if (answeredCount !== QUESTIONS.length) {
      alert(`Please answer all questions (${answeredCount}/${QUESTIONS.length} answered).`);
      return;
    }

    // For now we just show success + log
    console.log("Responses:", responses);
    alert("Thank you for completing the Program First Team Culture Assessment.");
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20, fontFamily: "system-ui, Arial" }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0 }}>{BRAND.name}</h1>
        <div style={{ color: "#555", marginTop: 4 }}>{BRAND.tagline}</div>
        <div style={{ marginTop: 10, color: "#333" }}>
          Anonymous survey • {answeredCount}/{QUESTIONS.length} answered
        </div>
      </header>

      {QUESTIONS.map((q, i) => (
