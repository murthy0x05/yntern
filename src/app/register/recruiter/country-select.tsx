"use client";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahrain","Bangladesh","Belarus","Belgium","Belize","Brazil","Bulgaria","Canada","Chile","China",
  "Colombia","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Egypt","Estonia","Finland","France",
  "Georgia","Germany","Greece","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq",
  "Ireland","Israel","Italy","Japan","Jordan","Kazakhstan","Kenya","Korea (South)","Kuwait","Latvia",
  "Lebanon","Lithuania","Luxembourg","Malaysia","Malta","Mexico","Monaco","Morocco","Netherlands","New Zealand",
  "Nigeria","Norway","Oman","Pakistan","Philippines","Poland","Portugal","Qatar","Romania","Russia",
  "Saudi Arabia","Singapore","Slovakia","Slovenia","South Africa","Spain","Sri Lanka","Sweden","Switzerland",
  "Taiwan","Thailand","Turkey","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vietnam"
];

export function CountrySelect() {
  return (
    <select
      className="bottom-line-select w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] focus:ring-0 focus:border-black transition-colors outline-none cursor-pointer"
      id="country"
      name="country"
      defaultValue=""
    >
      <option disabled value="">Select country</option>
      {COUNTRIES.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}
