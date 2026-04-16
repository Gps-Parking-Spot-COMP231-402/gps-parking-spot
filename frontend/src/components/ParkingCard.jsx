<<<<<<< HEAD
function ParkingCard({ spot, isSelected, onSelect, onSavePreference }) {
  const spotCode = spot.spotCode || "N/A";
  const lotName = spot.lotName || "Parking Lot";
  const parkingType = spot.type || "regular";
  const isPaid = spot.isPaid !== undefined ? spot.isPaid : true;
  const totalSpaces = Number(spot.totalSpaces) > 0 ? Number(spot.totalSpaces) : 1;
=======

function ParkingCard({ spot, rank, isSelected, onSelect, onSavePreference }) {
  const parkingType = spot.type || "Regular";
  const spotCode = spot.spotCode || spot.lotName || "Parking Spot";
  const totalSpaces = Number(spot.totalSpaces || 0);
  const reservedSpots = Number(spot.reservedSpots || 0);

>>>>>>> 5cb4643a5592311ee50eb522db2a5c4ff9038eb6
  const isAvailable =
    typeof spot.availableSpots === "number"
      ? spot.availableSpots > 0
      : spot.isAvailable !== undefined
        ? spot.isAvailable
<<<<<<< HEAD
        : spot.available;
  const reservedSpots =
    typeof spot.reservedSpots === "number"
      ? Math.min(spot.reservedSpots, totalSpaces)
      : 0;
=======
        : totalSpaces - reservedSpots > 0;

>>>>>>> 5cb4643a5592311ee50eb522db2a5c4ff9038eb6
  const availableSpots =
    typeof spot.availableSpots === "number"
      ? Math.max(spot.availableSpots, 0)
      : Math.max(totalSpaces - reservedSpots, 0);
<<<<<<< HEAD
  const availabilityState =
    availableSpots <= 0 ? "full" : availableSpots <= Math.max(1, Math.ceil(totalSpaces * 0.25)) ? "limited" : "available";
  const statusLabel = availabilityState === "full" ? "Full" : availabilityState === "limited" ? "Limited" : "Available";

  const getTypeIcon = (type) => {
    switch (type) {
      case "disability":
        return "♿";
      case "EV":
        return "⚡";
      case "visitor":
        return "V";
      case "regular":
        return "🅿️";
=======

  const distanceToEntranceKm = spot.distanceToEntranceKm;
  const distanceToEVChargerKm = spot.distanceToEVChargerKm;
  const isBestOption = spot.isBestOption;

  const getTypeIcon = (type) => {
    switch (String(type).toLowerCase()) {
      case "ev":
        return "⚡";
      case "disability":
        return "♿";
      case "family":
        return "👨‍👩‍👧";
>>>>>>> 5cb4643a5592311ee50eb522db2a5c4ff9038eb6
      default:
        return "🅿️";
    }
  };

  return (
<<<<<<< HEAD
    <div
      role="button"
      tabIndex={0}
      className={`dashboard-spot-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(spot)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(spot);
        }
      }}
=======
    <article
      className={`dashboard-spot-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect?.(spot)}
>>>>>>> 5cb4643a5592311ee50eb522db2a5c4ff9038eb6
    >
      <div className="dashboard-spot-card-head">
        <div className="spot-code-and-type">
          <span className="spot-code">{spotCode}</span>
          <span className="type-icon" title={parkingType}>
            {getTypeIcon(parkingType)}
          </span>
        </div>
<<<<<<< HEAD
        <span className={`status-pill ${availabilityState}`}>
          {statusLabel}
        </span>
      </div>

      <h3 className="spot-lot-name">{lotName}</h3>

      <div className="spot-type-and-payment">
        <span className="spot-type-badge">
          {parkingType.charAt(0).toUpperCase() + parkingType.slice(1)}
        </span>
        <span className={`payment-badge ${isPaid ? "paid" : "free"}`}>
          {isPaid ? "💳 Paid" : "🆓 Free"}
        </span>
      </div>

      <div className="spot-meta">
        <span>{isPaid ? `$${spot.pricePerHour ?? "-"}/hour` : "Free of charge"}</span>
        <span>{totalSpaces} total spots</span>
      </div>
=======

        <div>
          <span className={`status-pill ${isAvailable ? "open" : "closed"}`}>
            {isAvailable ? "Available" : "Full"}
          </span>
          {isBestOption ? (
            <div style={{ marginTop: "6px", fontWeight: "600", color: "green" }}>
              ⭐ Best Option
            </div>
          ) : null}
        </div>
      </div>

      <p className="spot-lot-name">{spot.lotName || "Parking Lot"}</p>
>>>>>>> 5cb4643a5592311ee50eb522db2a5c4ff9038eb6

      <div className="spot-meta">
        <span>{availableSpots} available</span>
        <span>{reservedSpots} reserved</span>
      </div>

<<<<<<< HEAD
      {typeof onSavePreference === "function" ? (
        <div className="spot-card-actions">
          <button
            type="button"
            className="spot-save-preference-btn"
            onClick={(event) => {
              event.stopPropagation();
              onSavePreference(spot);
            }}
          >
            Save Preference
          </button>
        </div>
      ) : null}
    </div>
=======
      <div className="spot-meta">
        <span>Rank: #{rank + 1}</span>
        <span>
          Distance to entrance:{" "}
          {distanceToEntranceKm != null ? `${distanceToEntranceKm} km` : "N/A"}
        </span>
      </div>

      {distanceToEVChargerKm != null ? (
        <div className="spot-meta">
          <span>Distance to EV charger: {distanceToEVChargerKm} km</span>
        </div>
      ) : null}

      <div className="spot-meta">
        <span>Price: ${spot.pricePerHour ?? 0}/hr</span>
        <span>Type: {parkingType}</span>
      </div>

      {onSavePreference ? (
        <button
          type="button"
          className="save-preference-btn"
          onClick={(event) => {
            event.stopPropagation();
            onSavePreference(spot);
          }}
        >
          Save Preference
        </button>
      ) : null}
    </article>
>>>>>>> 5cb4643a5592311ee50eb522db2a5c4ff9038eb6
  );
}

export default ParkingCard;