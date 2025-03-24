export function AppBar() {
  return (
    <div className="flex justify-between h-14 shadow ">
      <div className="flex flex-col justify-center h-full ml-4">
        Paytm Wallet
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full flex mr-2 mt-1 bg-slate-200 h-12 w-12 justify-center">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
      </div>
    </div>
  );
}
