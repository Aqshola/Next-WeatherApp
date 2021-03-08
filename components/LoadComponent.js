export default function LoadComponent({ loading }) {
  return (
    <div
      className={
        (loading
          ? "translate-y-0 opacity-100 "
          : "opacity-100 -translate-y-10 invisible ") +
        " w-full absolute top-0 flex justify-center mt-20 z-30 transition-all transform"
      }
    >
      <div className="bg-white w-max shadow rounded-full flex items-center justify-center p-2 border-2">
        <div
          className="rounded-full h-10 w-10 border-4 border-t-4 border-yellow-400 animate-spin"
          style={{ borderTopColor: "white" }}
        ></div>
      </div>
    </div>
  );
}
