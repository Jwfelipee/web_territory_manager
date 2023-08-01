import "./science.css";

export function ScienceLoader({ message = "teste" }) {
  return (
    <div id="container">
      <div id="ring"></div>
      <div id="ring"></div>
      <div id="ring"></div>
      <div id="ring"></div>
      <div id="h3" className="!text-white font-semibold flex">
        {message}
      </div>
    </div>
  );
}
