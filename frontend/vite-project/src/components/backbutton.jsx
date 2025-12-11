import { useNavigate } from "react-router-dom";

export default function BackButton({ to }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // Go to previous page
    }
  };

  return (
    <button
      onClick={handleBack}
      style={{
        padding: "8px 16px",
        margin: "10px 0",
        backgroundColor: "#6c7ae0",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Back
    </button>
  );
}
