export function CentredContainer(props) {
  return (
    <div className="flex h-full max-h-dvh w-full flex-col justify-center bg-white md:bg-slate-200 md:py-3">
      <div className="m-auto flex h-fit w-svw max-w-lg flex-col overflow-auto bg-base-100 p-4 md:card md:p-6 md:shadow-xl ">
        {props.children}
      </div>
    </div>
  );
}
