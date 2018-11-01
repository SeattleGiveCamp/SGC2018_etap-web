const CHECKED = 'CHECKED';


export const itemListObj = [{ type: "Bags", id: 0, group: 'Paper' },
{ type: "Cups", id: 1, group: 'Paper' },
{ type: "Beverages & Food Cartons", id: 2, group: 'Paper' },
{ type: "Other Disposable Food Serviceware Items (plates, to go)", id: 3, group: 'Paper' },
{ type: "Food and Other Product Packaging", id: 4, group: 'Paper' },
{ type: "Cardboard (corrugated)", id: 5, group: 'Paper' },
{ type: "Paper and paper pieces (any size)", id: 6, group: 'Paper' },
{ type: "Beverages Bottles and Containers", id: 7, group: 'Glass' },
{ type: "Food and Other Product Packaging", id: 8, group: 'Glass' },
{ type: "Glass fragments (≥ 2.5 cm) - packaging/containers/unidentifiable", id: 9, group: 'Glass' },
{ type: "Glass fragments (< 2.5 cm)", id: 10, group: 'Glass' },
{ type: "Beverage Cans and Containers", id: 11, group: 'Metal' },
{ type: "Bottle Caps and Beverage Packaging", id: 12, group: 'Metal' },
{ type: "Food and Other Product Packaging", id: 13, group: 'Metal' },
{ type: "Metal pieces (≥ 2.5 cm) - packaging/containers/unidentifiable", id: 14, group: 'Metal' },
{ type: "Metal pieces (< 2.5 cm)", id: 15, group: 'Metal' },
{ type: "Bags", id: 16, group: 'Plastic' },
{ type: "Beverage Bottles and Containers", id: 17, group: 'Plastic' },
{ type: "Straws and Stirrers", id: 18, group: 'Plastic' },
{ type: "Bottle Caps", id: 19, group: 'Plastic' },
{ type: "Other Beverage Packaging (Lids, seals..)", id: 20, group: 'Plastic' },
{ type: "Disposable Food Serviceware Items (cups, utensils, plates...)", id: 21, group: 'Plastic' },
{ type: "Food Wrappers/Pouches", id: 22, group: 'Plastic' },
{ type: "Food and Other Product Packaging", id: 23, group: 'Plastic' },
{ type: "Fragments/Pieces (≥ 2.5 cm) -", id: 24, group: 'Plastic' },
{ type: "Fragments/Pieces (< 2.5 cm)", id: 25, group: 'Plastic' },
{ type: "Cigarettes/Cannabis butts, ends, filters", id: 26, group: 'Special Categories/Misc' },
{ type: "Smoking/drug paraphernalia", id: 27, group: 'Special Categories/Misc' },
{ type: "Sharps - medical/drug/personal (Please put in sharps container)", id: 28, group: 'Special Categories/Misc' },
{ type: "Sharps - fishing/recreational/other", id: 29, group: 'Special Categories/Misc' },
{ type: "Medical Waste/Supplies (non-sharps)", id: 30, group: 'Special Categories/Misc' },
{ type: "Toiletries/Personal Products", id: 31, group: 'Special Categories/Misc' },
{ type: "Textiles and Shoes", id: 32, group: 'Special Categories/Misc' },
{ type: "Electronics", id: 33, group: 'Special Categories/Misc' },
{ type: "Entertainment/Recreation Items", id: 34, group: 'Special Categories/Misc' },
{ type: "Household/camping items", id: 35, group: 'Special Categories/Misc' },
{ type: "Commercial/industrial/office/agricultural items", id: 36, group: 'Special Categories/Misc' },
{ type: "Construction and Demolition Debris - wood", id: 37, group: 'Special Categories/Misc' },
{ type: "Paint, Chemical Containers and Other Hazardous", id: 38, group: 'Special Categories/Misc' },
{ type: "Fishing/Maritime Gear", id: 39, group: 'Special Categories/Misc' },
{ type: "Vehicle/Vessel Parts", id: 40, group: 'Special Categories/Misc' },
{ type: "Furniture/carpet and other bulky Items (Please write in under notes)", id: 41, group: 'Special Categories/Misc' },
{ type: "Foamed pieces/fragments of docks, floats", id: 42, group: 'Special Categories/Misc' },
{ type: "Illegal Dumping - Whole Bags of Trash", id: 43, group: 'Special Categories/Misc' },
{ type: "Organic Matter/Items", id: 44, group: 'Special Categories/Misc' },
{ type: "Write In", id: 45, group: 'Write In' }]


//action creators
export const checked = (listItem, boolean) => ({
  type: CHECKED,
  payload: { [listItem]: !boolean },
});


//reducer

const initialState = { foo: false, bar: false, baz: false }

export default (state = initialState, action) => {

  let { type, payload } = action;

  switch (type) {
    case CHECKED: return { ...state, ...payload }
    default: return state;
  }

};