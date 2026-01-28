import { useState } from "react";

const questions = [
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
  const [responses, setResponses] = useState(Array(questions.length).fill(null));

  const setResponse = (index, value) => {
    const updated = [...responses];
    updated[index] = value;
    setResponses(updated);
  };

  const handleSubmit = () => {
    alert("Thank you for completing the Program First Team Culture Assessment.");
    console.log(responses);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>Program First</h1>
      <p><em>Measure what drives winning</em></p>
      <p>This survey is anonymous. Please answer honestly.</p>

      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <strong>{i + 1}. {q}</strong>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setResponse(i, 1)}>Disagree</button>{" "}
            <button onClick={() => setResponse(i, 2)}>Neutral</button>{" "}
            <button onClick={() => setResponse(i, 3)}>Agree</button>
          </div>
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Assessment</button>
    </div>
  );
}
