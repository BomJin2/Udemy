function UserInput({ onChange, userInput }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Inversment</label>
          <input type="number" required value={userInput.initialInverstment} onChange={(e) => onChange("initialInverstment", e.target.value)} />
        </p>
        <p>
          <label>Annual Inverstment</label>
          <input type="number" required value={userInput.annualInverstment} onChange={(e) => onChange("annualInverstment", e.target.value)} />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input type="number" required value={userInput.expectedReturn} onChange={(e) => onChange("expectedReturn", e.target.value)} />
        </p>
        <p>
          <label>Duration</label>
          <input type="number" required value={userInput.duration} onChange={(e) => onChange("duration", e.target.value)} />
        </p>
      </div>
    </section>
  );
}
export default UserInput;
