export default function Die(props) {
  return (
    <button
      style={{ backgroundColor: props.isHeld ? "#59E390" : "white" }}
      onClick={() => props.hold(props.id)}
      aria-
      aria-pressed={props.isHeld}
      aria-label={`Die with value of ${props.value} , ${
        props.isHeld ? "Held" : "not Held"
      }`}
    >
      {props.value}
    </button>
  );
}
