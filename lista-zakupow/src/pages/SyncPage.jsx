function SyncPage({ syncStatus, onManualSync }) {
  return (
    <div>
      <h2>Synchronizacja</h2>
      <p>Status: {syncStatus}</p>
      <button onClick={onManualSync}>Synchronizuj teraz</button>
    </div>
  );
}

export default SyncPage;