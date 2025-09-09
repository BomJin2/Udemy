function Input({ label, textarea, ref, ...props }) {
  const calsses = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 focus:outline-none text-stone-600 focus:border-stone-600";
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-sotne-500">{label}</label>
      {textarea ? <textarea ref={ref} className={calsses} {...props} /> : <input ref={ref} className={calsses} {...props} />}
    </p>
  );
}
export default Input;
