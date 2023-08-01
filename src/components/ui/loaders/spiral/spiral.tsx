import "./spiral.css";

export function SpiralLoader() {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="spinner">
          <div className="spinner">
            <div className="spinner">
              <div className="spinner">
                <div className="spinner"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
