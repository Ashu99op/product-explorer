interface SmartFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SmartFilter({ value, onChange }: SmartFilterProps) {
  return (
    <div className="flex-1 w-full mt-4 sm:mt-0">
      <label htmlFor="smart-filter" className="sr-only">Smart Filter</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <input
          type="text"
          name="smart-filter"
          id="smart-filter"
          className="block w-full pl-10 pr-3 py-3 border border-indigo-200 rounded-xl leading-5 bg-indigo-50/50 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
          placeholder="Smart filter (e.g. 'cheap electronics')"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
