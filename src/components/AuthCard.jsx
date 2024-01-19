export function AuthCard(props) {
  return (
    <div className="flex h-full max-h-dvh w-full flex-col justify-center bg-white md:py-3 md:bg-slate-200">
      <div className="m-auto flex h-fit w-svw max-w-lg flex-col overflow-auto bg-base-100 p-4 md:card md:p-6 md:shadow-xl ">
        {props.children}
      </div>
    </div>
  );
}
