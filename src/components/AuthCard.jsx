export function AuthCard({ children }) {
  return (
    <div className="flex h-full w-full flex-col justify-center self-center bg-white md:bg-slate-200">
      <div className="m-auto flex h-fit w-full max-w-lg flex-col bg-base-100 p-4 md:card md:p-6 md:shadow-xl">
        {children}
      </div>
    </div>
  );
}
