type ToastProps = {
  status: "Listing saved!" | "Listing removed!";
  listingsSaved?: number;
};

const Toast: React.FC<ToastProps> = ({ status, listingsSaved }) => {
  return (
    <div className="flex items-center justify-between">
      <h5 className="heading_h5 text-grays-1000">{status}</h5>
      {listingsSaved !== undefined && (
        <p className="body_s text-grays-1000 underline">
          {listingsSaved === 0
            ? `No saved listings`
            : `See saved listings (${listingsSaved})`}
        </p>
      )}
    </div>
  );
};

export default Toast;
